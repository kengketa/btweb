<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="translate-y-3 opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="translate-y-3 opacity-0"
  >
    <button
      v-if="shown"
      :style="{ bottom: `calc(${aboveBar ? 90 : 12}px + env(safe-area-inset-bottom, 0px))` }"
      aria-label="กลับขึ้นด้านบน"
      class="fixed right-3 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_12px_30px_-10px_rgba(0,0,0,.3)] md:hidden"
      @click="toTop"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="20"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.25"
        viewBox="0 0 24 24"
        width="20"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script>
// Phones only: appears once the visitor is a screen down the page. Sits above the
// MobileActionBar (12px + its 66px + a 12px gap) wherever that bar is shown.
export default {
  name: 'BackToTop',
  props: {
    aboveBar: { type: Boolean, default: true }
  },
  data() {
    // hidden until mounted, so the browser's first render matches the pre-rendered page
    return { shown: false, frame: 0 }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.update()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    cancelAnimationFrame(this.frame)
  },
  methods: {
    onScroll() {
      if (!this.frame) this.frame = requestAnimationFrame(this.update)
    },
    update() {
      this.frame = 0
      this.shown = window.scrollY > window.innerHeight
    },
    toTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
