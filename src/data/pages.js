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
