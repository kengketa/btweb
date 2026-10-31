import { onBeforeUnmount, onMounted } from 'vue'
import { scrollToSection } from '@/router'

// The router ignores a tap on a link to the address already shown, so tapping หลักสูตร
// again after scrolling away from #courses would do nothing. Scroll back to that section
// (or to the top, for the home page itself) instead. Runs after router-link's own click
// handler, which has already turned every other link into a navigation.
export function useSectionLinks() {
  function onClick(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
    const a = event.target.closest?.('a[href]')
    if (!a || a.target || a.origin !== window.location.origin) return
    if (a.pathname !== window.location.pathname || a.hash !== window.location.hash) return
    // other same-page links (e.g. a fed-in page on phones) are the page feed's to handle
    if (!a.hash && a.pathname !== '/') return
    event.preventDefault()
    scrollToSection(a.hash)
  }
  onMounted(() => document.addEventListener('click', onClick))
  onBeforeUnmount(() => document.removeEventListener('click', onClick))
}
