// Browser-side spam checks for the booking form. A bot can post to the endpoint
// directly and skip all of this, so the server must repeat the checks — that is
// why the honeypot value and fill time are sent along with the booking.

export const MIN_FILL_MS = 2000
const COOLDOWN_MS = 60 * 1000
const LAST_SENT_KEY = 'booking:lastSentAt'

export const LIMITS = { name: 60, note: 500 }

// links and markup are what spam carries; a plain email address in the note is fine
const LINK = /https?:\/\/|www\.|<[a-z/]|\[url/i

export function hasLink(text) {
  return LINK.test(text)
}

// Thai numbers: mobiles are 0 + 9 digits, landlines 0 + 8; +66 replaces the leading 0.
export function normalizePhone(raw) {
  const digits = raw.replace(/[^\d+]/g, '').replace(/^\+?66/, '0')
  return /^0\d{8,9}$/.test(digits) ? digits : ''
}

export function cooldownLeft() {
  try {
    const last = Number(localStorage.getItem(LAST_SENT_KEY))
    return Math.max(0, last + COOLDOWN_MS - Date.now())
  } catch {
    return 0
  }
}

export function markSent() {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(Date.now()))
  } catch {
    // storage blocked (private mode) — the server-side rate limit still applies
  }
}

let turnstileScript = null

// Cloudflare Turnstile is loaded only when a site key is configured.
export function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!turnstileScript) {
    turnstileScript = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.onload = () => resolve(window.turnstile)
      s.onerror = () => {
        turnstileScript = null
        reject(new Error('Turnstile failed to load'))
      }
      document.head.appendChild(s)
    })
  }
  return turnstileScript
}
