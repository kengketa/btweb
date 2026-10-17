// Build-time renderer used by scripts/build.mjs: turns one URL into the page's HTML
// and head tags, so visitors and crawlers that don't run JavaScript still get content.
import { renderToString } from 'vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { createApp } from './app'

export { courses } from './data/courses'
export { contact, team } from './data/site'
export { programs } from './data/programs'
export { studentsLabel } from './data/about'
export { pagePaths, SITE_URL } from './data/pages'

export async function render(url) {
  const { app, router, head } = createApp({ hydrate: true })
  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  const { headTags, htmlAttrs } = await renderHeadToString(head)
  return { html, headTags, htmlAttrs, path: router.currentRoute.value.fullPath }
}
