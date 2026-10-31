import { computed, markRaw, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { feedPages } from '@/data/pages'
import { replaceKeepingScroll } from '@/router'

// On phones the feed pages read like a social feed: nearing the end of one page loads
// the next feed page below it, and the address bar follows whichever page is being read.
// `base` is the page the visitor actually navigated to; `items` are the pages fed in below.
export function usePageFeed() {
  const router = useRouter()
  const route = router.currentRoute
  const base = shallowRef(route.value)
  const items = shallowRef([])
  // off until mounted, so the browser's first render matches the pre-rendered page
  const enabled = shallowRef(false)

  const nextPage = computed(() => {
    if (!enabled.value) return null
    const last = items.value.length ? items.value[items.value.length - 1].path : base.value.path
    const i = feedPages.indexOf(last)
    return i === -1 ? null : feedPages[i + 1] || null
  })
  // the footer waits until the last page has been fed in
  const hidesFooter = computed(() => nextPage.value !== null)

  let expected = null // the address the feed last asked for
  let loading = false
  let generation = 0 // bumped on every restart, so a page still loading for the old feed is dropped
  let frame = 0

  function restart() {
    generation++
    loading = false
    expected = null
    base.value = route.value
    items.value = []
  }

  watch(route, (to) => {
    if (to.path === expected) return
    restart()
  })

  async function feedNext() {
    const page = nextPage.value
    if (!page || loading) return
    loading = true
    const started = generation
    try {
      const record = router.resolve(page).matched[0]
      let component = record.components.default
      // a page the visitor hasn't opened yet is still its lazy loader
      if (typeof component === 'function') component = (await component()).default
      if (started !== generation) return
      items.value = [...items.value, { path: page, component: markRaw(component), el: null }]
    } catch {
      // offline or a deploy replaced the chunks: the next scroll tries again
    } finally {
      if (started === generation) loading = false
    }
  }

  function update() {
    frame = 0
    // the page being read is the last one whose top has passed a third of the way up the screen
    let reading = base.value.path
    for (const item of items.value) {
      if (item.el && item.el.getBoundingClientRect().top < window.innerHeight / 3)
        reading = item.path
    }
    if (reading !== route.value.path && reading !== expected) {
      expected = reading
      replaceKeepingScroll(router, reading)
    }
    // start loading the next page while the visitor is still two screens from the end
    const left = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
    if (left < window.innerHeight * 2) feedNext()
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  // A tap on a link to the address already shown is no navigation for the router. When
  // that page came in through the feed, start over from it, as a fresh visit would.
  function onClick(event) {
    const a = event.target.closest?.('a[href]')
    if (!a || a.hash || a.target || a.origin !== window.location.origin) return
    if (a.pathname === route.value.path && base.value.path !== route.value.path) {
      restart()
      window.scrollTo(0, 0)
    }
  }

  let phone = null
  function onBreakpoint() {
    enabled.value = phone.matches
    if (!enabled.value && items.value.length) restart()
  }

  onMounted(() => {
    phone = window.matchMedia('(max-width: 767px)')
    phone.addEventListener('change', onBreakpoint)
    onBreakpoint()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick)
  })

  onBeforeUnmount(() => {
    phone?.removeEventListener('change', onBreakpoint)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClick)
    cancelAnimationFrame(frame)
  })

  return { base, items, hidesFooter }
}
