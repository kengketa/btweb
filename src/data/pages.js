import { courses } from './courses.js'
import { programs } from './programs.js'

export const SITE_URL = 'https://www.brightonedu.com'

// Every page the build pre-renders and lists in sitemap.xml
export const pagePaths = [
  '/',
  '/about',
  '/courses',
  ...courses.map((c) => `/courses/${c.slug}`),
  ...programs.map((p) => p.path),
  '/hall-of-fame',
  '/results',
  '/news',
  '/contact',
  '/privacy-policy'
]

// The main menu. The home page works as a one-page tour of the site: every item scrolls
// to one of its sections (`hash`). The full pages stay for search (issue #11) and are
// linked from those sections and the footer; `pages` are the paths an item stands for, so
// it is highlighted while one of them is open. `phone` items only show in the phone menu.
export const menu = [
  { label: 'หน้าแรก', hash: '', pages: [], phone: true },
  { label: 'เกี่ยวกับเรา', hash: '#why', pages: ['/about'] },
  { label: 'หลักสูตร', hash: '#courses', pages: ['/courses'] },
  { label: 'บริการอื่นๆ', hash: '#programs', pages: programs.map((p) => p.path) },
  { label: 'Hall of Fame', hash: '#hall-of-fame', pages: ['/hall-of-fame'] },
  { label: 'ดูผลการเรียน', hash: '#parent-app', pages: ['/results'] },
  { label: 'รีวิว', hash: '#reviews', pages: ['/news'] },
  { label: 'ติดต่อเรา', hash: '#booking', pages: ['/contact'], phone: true }
]

// where every "นัดวัดระดับฟรี" in the nav and the phone action bar goes
export const bookingLink = { path: '/', hash: '#booking' }

// On phones, scrolling past the end of one of these pages brings the next one in below
// it (src/composables/usePageFeed.js).
export const feedPages = ['/', '/about', '/courses', '/hall-of-fame', '/results', '/contact']
