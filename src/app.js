import { createApp as createClientApp, createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import { createAppRouter } from './router'

// Shared by the browser (src/main.js) and the build's pre-renderer (src/entry-server.js).
// `hydrate` takes over server-rendered HTML instead of rendering into an empty #app.
export function createApp({ hydrate = false } = {}) {
  const app = (hydrate ? createSSRApp : createClientApp)(App)
  const router = createAppRouter()
  const head = createHead()

  app.use(createPinia())
  app.use(router)
  app.use(head)

  return { app, router, head }
}
