// Makes the smaller WebP copies of our own photos that PhotoBox offers the browser
// through srcset: photo.jpg -> photo-480.webp, photo-960.webp, photo-1600.webp.
// A phone showing a 300px tile then downloads ~30 KB instead of the ~200 KB original.
//
// Run after adding or replacing a photo in one of the folders below, and commit the
// results (the droplet builds without cwebp):
//
//   node scripts/responsive-images.mjs
//
// Needs cwebp (brew install webp). Existing copies newer than their photo are skipped.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// keep in step with OWN_PHOTO in src/components/PhotoBox.vue
const SOURCES = ['1_home', '2_about_us', '3_courses', '4_camp', 'cover-brighton.jpg']
const WIDTHS = [480, 960, 1600]
const QUALITY = '72'

const root = new URL('../public/images/', import.meta.url).pathname

const photos = SOURCES.flatMap((s) =>
  s.endsWith('.jpg')
    ? [join(root, s)]
    : readdirSync(join(root, s))
        .filter((f) => f.endsWith('.jpg'))
        .map((f) => join(root, s, f))
)

function widthOf(file) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' })
  return Number(out.match(/pixelWidth: (\d+)/)[1])
}

let made = 0
for (const photo of photos) {
  const width = widthOf(photo)
  for (const w of WIDTHS) {
    const out = photo.replace(/\.jpg$/, `-${w}.webp`)
    if (existsSync(out) && statSync(out).mtimeMs > statSync(photo).mtimeMs) continue
    // never enlarge: a photo narrower than the copy's width keeps its own width
    const resize = w < width ? ['-resize', String(w), '0'] : []
    execFileSync('cwebp', [
      '-quiet',
      '-q',
      QUALITY,
      '-metadata',
      'none',
      ...resize,
      photo,
      '-o',
      out
    ])
    made++
  }
}
console.log(`[responsive-images] ${made} copies written for ${photos.length} photos`)
