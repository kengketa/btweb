import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Used by scripts/build.mjs (npm run build), which also pre-renders the pages.
// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'silent',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
