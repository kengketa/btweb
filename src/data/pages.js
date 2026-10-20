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

// The main menu, in order. On phones, scrolling past the end of one of these pages
// brings the next one in below it (src/composables/usePageFeed.js).
export const menu = [
  { label: 'หน้าแรก', to: '/' },
  { label: 'เกี่ยวกับเรา', to: '/about' },
  { label: 'หลักสูตร', to: '/courses' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'ดูผลการเรียน', to: '/results' },
  { label: 'ติดต่อเรา', to: '/contact' }
]
