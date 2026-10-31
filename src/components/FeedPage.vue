<template>
  <!-- the wrapper is what the feed measures to tell which page is being read -->
  <div class="feed-page">
    <component :is="component" />
  </div>
</template>

<script>
import { provide, watch } from 'vue'
import { injectHead } from '@vueuse/head'

// One page fed in below another by the phone page feed (src/composables/usePageFeed.js).
// Its title and meta tags would otherwise take over the moment it loads, while the
// visitor is still reading the page above, so they only apply while it is `active`.
export default {
  name: 'FeedPage',
  props: {
    component: { type: Object, required: true },
    active: { type: Boolean, default: false }
  },
  setup(props) {
    const head = injectHead()
    const entries = new Set()
    const show = (e) => (e.shown = head.push(e.input, e.options))
    const hide = (e) => {
      e.shown?.dispose()
      e.shown = null
    }

    // stands in for the site's head manager inside this page
    provide('usehead', {
      ssr: false,
      push(input, options) {
        const e = { input, options, shown: null }
        entries.add(e)
        if (props.active) show(e)
        return {
          patch(next) {
            e.input = next
            e.shown?.patch(next)
          },
          dispose() {
            hide(e)
            entries.delete(e)
          }
        }
      }
    })

    watch(
      () => props.active,
      (active) => entries.forEach(active ? show : hide)
    )
  }
}
</script>

<style scoped>
/* A page's first section leaves room for the nav above it. Fed in below another page it
   follows that page's own bottom spacing instead, like any section after another. */
.feed-page :deep(main > :first-child) {
  padding-top: 0;
}
</style>
