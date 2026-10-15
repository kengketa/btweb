import './assets/fonts.js'
import './assets/main.scss'

import { createApp } from './app'

// Production pages arrive pre-rendered (scripts/build.mjs), so take over that HTML;
// the dev server serves an empty #app and renders from scratch.
const el = document.getElementById('app')
const { app, router } = createApp({ hydrate: el.hasChildNodes() })

router.isReady().then(() => app.mount(el))
