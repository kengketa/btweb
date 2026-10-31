// Calls onEnter each time `el` scrolls into view and onLeave when it scrolls away, unless
// the visitor asked for less motion (then neither ever runs and the element stays still).
// Returns a stop function. `wasOnScreen` tells onEnter whether the element was already
// in view as the page loaded, so an intro can be skipped rather than blink.
export function watchOnScreen(el, { onEnter, onLeave, threshold = 0.4 }) {
  if (
    typeof window === 'undefined' ||
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return () => {}
  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? onEnter() : onLeave?.()),
    { threshold }
  )
  io.observe(el)
  return () => io.disconnect()
}

export function motionAllowed() {
  return (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
