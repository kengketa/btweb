// Production build: `npm run build [-- --outDir dir]` (scripts/deploy.sh passes --outDir).
//
// 1. Vite builds the browser bundle into outDir.
// 2. Vite builds src/entry-server.js for Node.
// 3. Every page in src/data/pages.js is rendered to <outDir><path>/index.html, so
//    search engines and AI crawlers that don't run JavaScript get the full page,
//    and visitors see it before the script loads. The browser then takes it over.
// 4. sitemap.xml and llms.txt are written from the same page list and course data.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

import { pagePaths, SITE_URL } from '../src/data/pages.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const configFile = path.join(root, 'vite.config.prod.mjs')
const args = process.argv.slice(2)
const outDirArg = args.includes('--outDir') ? args[args.indexOf('--outDir') + 1] : 'dist'
const outDir = path.resolve(root, outDirArg)
// inside node_modules so the server bundle resolves vue & co. from the project
const ssrDir = path.join(root, 'node_modules/.cache/btweb-ssr')

await build({ configFile, build: { outDir, emptyOutDir: true } })
await build({
  configFile,
  build: { ssr: 'src/entry-server.js', outDir: ssrDir, emptyOutDir: true, copyPublicDir: false }
})

const { render, courses, contact } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

// --- pages -----------------------------------------------------------------
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
if (!template.includes('<div id="app"></div>')) throw new Error('index.html has no empty #app')

for (const url of pagePaths) {
  const { html, headTags, path: rendered } = await render(url)
  if (rendered !== url) throw new Error(`${url} redirected to ${rendered} while pre-rendering`)
  const page = template
    .replace('</head>', `${headTags}\n</head>`)
    .replace('<div id="app"></div>', () => `<div id="app">${html}</div>`)
  const file = path.join(outDir, url, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)
}

// --- sitemap.xml -----------------------------------------------------------
fs.writeFileSync(
  path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pagePaths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>
`
)

// --- llms.txt (https://llmstxt.org): a plain summary for AI assistants -----------
const { days, opens, closes } = contact.openingHours
const link = (p) => `${SITE_URL}${p}`
fs.writeFileSync(
  path.join(outDir, 'llms.txt'),
  `# Brighton Language Academy (โรงเรียนสอนภาษา ไบรท์ตัน)

> English language school for children in Phayao, Thailand. Classes are taught live by native English-speaking teachers using Oxford University Press and Jolly Phonics curricula, from kindergarten to secondary school, plus private lessons. Every child starts with a free placement test (CEFR) so they join a group at their level.
>
> โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก ใจกลางเมืองพะเยา สอนโดยครูเจ้าของภาษา หลักสูตร Oxford และ Jolly Phonics ตั้งแต่อนุบาลถึงมัธยม และคอร์สส่วนตัว วัดระดับภาษาฟรีก่อนเริ่มเรียน

- Address / ที่อยู่: ${contact.address.join(' ')}, Thailand
- Phone / โทร: ${contact.phone}
- Opening hours / เวลาทำการ: ${days.length === 7 ? 'Every day' : `${days[0]}–${days[days.length - 1]}`} ${opens}–${closes} (${contact.hours})
- Facebook: ${contact.facebook}
- Book a free placement test / นัดวัดระดับภาษาฟรี: ${link('/contact')}

## Courses / หลักสูตร

${courses
  .map((c) => `- [${c.name}](${link(`/courses/${c.slug}`)}): ${c.tag}, ${c.age} ${c.ageUnit}. ${c.desc}`)
  .join('\n')}

## Pages

- [Home / หน้าแรก](${link('/')}): overview, courses, parent reviews
- [About / เกี่ยวกับเรา](${link('/about')}): the school, its teachers and approach
- [Courses / หลักสูตร](${link('/courses')}): all courses by age group
- [News / ข่าวสารและกิจกรรม](${link('/news')}): announcements and class activities from the school's Facebook page
- [Contact & free placement test / ติดต่อและนัดวัดระดับ](${link('/contact')}): booking form, phone, map

## Optional

- [Privacy Policy](${link('/privacy-policy')})
`
)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`[build] ${pagePaths.length} pages pre-rendered into ${path.relative(root, outDir) || '.'}`)
