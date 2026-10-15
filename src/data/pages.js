import { courses } from './courses.js'

export const SITE_URL = 'https://www.brightonedu.com'

// Every page the build pre-renders and lists in sitemap.xml
export const pagePaths = [
  '/',
  '/about',
  '/courses',
  ...courses.map((c) => `/courses/${c.slug}`),
  '/news',
  '/contact',
  '/privacy-policy'
]
