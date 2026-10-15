#!/usr/bin/env bash
# Production deploy for btweb (www.brightonedu.com, v2.brightonedu.com) on the
# droplet ("Gray", 209.97.165.216). Runs as larasail, who owns the checkout.
#
# Invoked by GitHub Actions over SSH — as the forced command of the gha-btweb
# key, so it must be self-contained — by larasail's daily cron with
# --update-feed, and runnable by hand:
#
#   bash /var/www/html/btweb/scripts/deploy.sh [--update-feed]
#
# The site is static: nginx serves dist/ directly. We build into dist-next/
# and swap it in only once it looks complete, so a failed build leaves the
# live site untouched and visitors never see a half-written dist/.
set -euo pipefail

# Bash reads a script lazily, by byte offset, as it executes. Step 2 runs
# `git reset --hard`, which rewrites THIS file whenever a deploy ships a change
# to it — and bash would resume reading the new file at the old offset. Re-exec
# from a private copy so the file on disk can change freely underneath us.
if [ "${DEPLOY_REEXEC:-}" != "1" ]; then
  SELF_COPY=$(mktemp /tmp/btweb-deploy.XXXXXX)
  cat -- "$0" > "$SELF_COPY"
  DEPLOY_REEXEC=1 exec bash "$SELF_COPY" "$@"
fi
case "$0" in /tmp/btweb-deploy.*) rm -f -- "$0" ;; esac

APP_DIR="${APP_DIR:-/var/www/html/btweb}"
BRANCH="${BRANCH:-main}"
# Same node the cron has always used; ssh forced commands get a bare PATH.
NODE_BIN="${NODE_BIN:-/home/larasail/.nvm/versions/node/v20.19.6/bin}"
LOCK_FILE="${LOCK_FILE:-/tmp/btweb-deploy.lock}"

UPDATE_FEED=0
for arg in "$@"; do
  case "$arg" in
    --update-feed) UPDATE_FEED=1 ;;
    *) echo "[deploy] unknown argument: $arg" >&2; exit 2 ;;
  esac
done

export PATH="$NODE_BIN:$PATH"
cd "$APP_DIR"

# A push deploy and the nightly feed rebuild both write dist/. One at a time.
exec 9> "$LOCK_FILE"
if ! flock -n 9; then
  echo "[deploy] another deploy is running; waiting for it…"
  flock 9
fi

[ -f .env ] || { echo "[deploy] ABORT: .env is missing" >&2; exit 1; }
echo "[deploy] $(date -Iseconds) starting (was at $(git rev-parse --short HEAD 2>/dev/null || echo unknown))"

# === 1. Fetch latest. Refuse to proceed if secrets have been committed. ===
git fetch --quiet origin "$BRANCH"
if git ls-tree --name-only "origin/$BRANCH" -- .env | grep -q .; then
  echo "[deploy] ABORT: .env is tracked in origin/$BRANCH — git reset --hard would overwrite the live secrets." >&2
  exit 1
fi

# === 2. Reset to origin/$BRANCH. .env and public/api/facebook-feed.json are
# gitignored, so the live token and the cached feed are left alone. ===
git reset --hard "origin/$BRANCH"

# === 3. Install deps only when the lockfile changed. npm ci is minutes on
# this 1 vCPU / 1 GB droplet, and most deploys don't touch dependencies. ===
LOCK_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)
if [ "$(cat node_modules/.deploy-lock-hash 2>/dev/null)" != "$LOCK_HASH" ]; then
  echo "[deploy] package-lock.json changed — installing deps…"
  npm ci --no-audit --no-fund
  echo "$LOCK_HASH" > node_modules/.deploy-lock-hash
fi

# === 4. Refresh the Facebook feed (cron only). A failed fetch keeps the
# previous cached feed rather than blocking the rebuild. ===
if [ "$UPDATE_FEED" = 1 ]; then
  echo "[deploy] updating facebook feed…"
  npm run update-feed -- --force || echo "[deploy] WARNING: feed update failed; keeping the cached feed" >&2
fi

# === 5. Build into dist-next, check it, swap it in. ===
echo "[deploy] building…"
rm -rf dist-next
npm run build -- --outDir dist-next --emptyOutDir
for f in index.html api/facebook-feed.json; do
  [ -s "dist-next/$f" ] || { echo "[deploy] ABORT: build is missing $f — live site left as-is." >&2; exit 1; }
done

rm -rf dist-prev
[ -d dist ] && mv dist dist-prev
mv dist-next dist
rm -rf dist-prev

# === 6. Healthcheck through nginx, as a visitor would hit it. ===
for host in www.brightonedu.com v2.brightonedu.com; do
  if ! curl -fsS --max-time 10 --resolve "$host:443:127.0.0.1" "https://$host/" | grep -q '<div id="app"'; then
    echo "[deploy] FAILED: https://$host/ did not serve the app." >&2
    exit 1
  fi
done

echo "[deploy] $(date -Iseconds) done at $(git rev-parse --short HEAD)"
