import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { courses } from './src/data/courses.js'

const SITE = 'https://www.brightonedu.com'
const PAGES = ['/', '/about', '/courses', '/news', '/contact', '/privacy-policy']

// sitemap.xml built from the page list and the course data, so new courses show up on their own
function sitemap() {
  return {
    name: 'sitemap',
    generateBundle() {
      const paths = [...PAGES, ...courses.map((c) => `/courses/${c.slug}`)]
      const urls = paths.map((p) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc></url>`)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'silent',
  plugins: [vue(), sitemap()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
