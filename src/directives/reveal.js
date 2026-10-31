// v-reveal: fade/slide an element in the first time it scrolls into view (issue #29).
//
//   <div v-reveal>                              the element itself, sliding up
//   <div v-reveal="{ variant: 'scale', delay: 120 }">
//   <div v-reveal="{ stagger: 80 }">            each child, as it scrolls in; children
//                                               entering together stagger by 80ms
//   <div v-reveal.together="{ stagger: 80 }">   all children at once when the element
//                                               scrolls in (e.g. a sideways scroller,
//                                               whose off-screen cards never "enter")
//
// Variants: 'up' (default), 'fade', 'scale', 'wipe' (the yellow .marker highlight wiping on
// from the left and landing with a small tilt), 'pop' (a sticker slapped on: grows in tilted,
// overshoots and settles), 'grow' (a line drawing itself downward; set --grow-duration). The motion itself is CSS (the
// [data-reveal] rules in assets/tailwind.scss); this file only decides when.
//
// Content is never hidden by the server: pre-rendered HTML carries no reveal state, so
// crawlers and visitors whose script fails see every section. When the browser takes
// the page over, anything already on screen is left alone (hiding it would make it
// blink); only what is still below the fold is hidden until it scrolls in. Elements
// the browser renders itself (dev server, page feed, client-side navigation) start
// hidden and reveal as they enter. With "reduce motion" on, nothing is touched.

const VARIANTS = ['up', 'fade', 'scale', 'wipe', 'pop', 'grow']
// a long list shouldn't keep its last item waiting: delays stop growing after this
const MAX_STAGGER_STEPS = 6

const records = new WeakMap() // observed element -> { group, el, reveal(index) }
let observer = null

function motionAllowed() {
  return (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -15% 0px' })
  }
  return observer
}

// Everything that enters in one callback and belongs to the same v-reveal is one
// batch: its items stagger in reading order.
function onIntersect(entries) {
  const batches = new Map()
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    const record = records.get(entry.target)
    if (!record) continue
    observer.unobserve(entry.target)
    records.delete(entry.target)
    if (!batches.has(record.group)) batches.set(record.group, [])
    batches.get(record.group).push(record)
  }
  for (const batch of batches.values()) {
    batch.sort((a, b) =>
      a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    )
    batch.forEach((record, i) => record.reveal(i))
  }
}

function inViewport(el) {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight && r.width > 0
}

function hide(el) {
  el.dataset.revealState = 'hidden'
}

function show(el, delay) {
  el.style.setProperty('--reveal-delay', `${delay}ms`)
  el.dataset.revealState = 'in'
  // Hand the element back to its own styles once it has arrived, and once whatever plays
  // inside it on arrival (a card's icon popping, ticks drawing: the .in-* classes) has
  // finished too. Looping animations inside it don't count.
  el.addEventListener('animationend', function done(e) {
    if (e.target !== el) return
    el.removeEventListener('animationend', done)
    const inner = (el.getAnimations?.({ subtree: true }) ?? []).filter(
      (a) => a.effect?.getTiming?.().iterations !== Infinity
    )
    Promise.all(inner.map((a) => a.finished.catch(() => {}))).then(() => {
      delete el.dataset.revealState
      el.style.removeProperty('--reveal-delay')
    })
  })
}

function options(binding) {
  const { delay = 0, stagger = 0, variant = 'up' } = binding.value ?? {}
  return {
    delay,
    stagger,
    variant: VARIANTS.includes(variant) ? variant : 'up',
    mode: binding.modifiers.together ? 'together' : stagger ? 'children' : 'self'
  }
}

const step = (i, stagger) => Math.min(i, MAX_STAGGER_STEPS) * stagger

export default {
  // nothing is rendered on the server, so pre-rendered pages stay fully visible
  getSSRProps: () => ({}),

  created(el, binding) {
    if (!motionAllowed()) return
    const { variant, mode } = options(binding)
    el.dataset.reveal = variant
    // Taking over pre-rendered HTML, the element is already on the page and may be on
    // screen: decide in mounted(), once its position is known. A fresh element is
    // hidden before it is ever painted.
    el._reveal = { hydrating: el.isConnected }
    if (!el._reveal.hydrating && mode === 'self') hide(el)
  },

  mounted(el, binding) {
    if (!el._reveal) return
    const { delay, stagger, mode } = options(binding)
    const { hydrating } = el._reveal
    const io = getObserver()
    const watched = []
    const watch = (target, reveal) => {
      records.set(target, { group: el, el: target, reveal })
      io.observe(target)
      watched.push(target)
    }
    // on screen while hydrating: already seen, leave it be
    const skip = (target) => hydrating && inViewport(target)

    if (mode === 'self') {
      if (skip(el)) return
      hide(el)
      watch(el, () => show(el, delay))
    } else if (mode === 'together') {
      if (skip(el)) return
      const children = [...el.children]
      children.forEach(hide)
      watch(el, () => children.forEach((child, i) => show(child, delay + step(i, stagger))))
    } else {
      for (const child of el.children) {
        if (skip(child)) continue
        hide(child)
        watch(child, (i) => show(child, delay + step(i, stagger)))
      }
    }
    el._reveal.watched = watched
  },

  unmounted(el) {
    for (const target of el._reveal?.watched ?? []) {
      observer?.unobserve(target)
      records.delete(target)
    }
    delete el._reveal
  }
}
