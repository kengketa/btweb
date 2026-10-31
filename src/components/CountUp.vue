<template>
  <!-- Every number in `value` counts up from 0 the first time it scrolls into view:
       "3–12" runs 0–0 → 3–12, "ม.1–6" and "1:1" keep their letters and signs. -->
  <span ref="el" class="tabular-nums">{{ text }}</span>
</template>

<script>
// numbers inside the text, with thousands commas and decimals: "1,000+", "8.0", "~50"
const NUMBER = /\d[\d,]*(?:\.\d+)?/g
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export default {
  name: 'CountUp',
  props: {
    value: { type: [String, Number], required: true },
    duration: { type: Number, default: 1100 },
    delay: { type: Number, default: 0 }
  },
  data() {
    // the finished text until the browser takes over, so the pre-rendered page reads right
    return { progress: 1, io: null, frame: 0, timer: 0 }
  },
  computed: {
    text() {
      const value = String(this.value)
      if (this.progress >= 1) return value
      return value.replace(NUMBER, (match) => {
        const decimals = (match.split('.')[1] || '').length
        const target = parseFloat(match.replace(/,/g, ''))
        const n = target * this.progress
        const shown = decimals ? n.toFixed(decimals) : String(Math.round(n))
        return match.includes(',') ? Number(shown).toLocaleString('en-US') : shown
      })
    }
  },
  mounted() {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const r = this.$refs.el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return // already in view: leave it
    this.progress = 0
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        this.io.disconnect()
        this.timer = setTimeout(this.play, this.delay)
      },
      { threshold: 0.6 }
    )
    this.io.observe(this.$refs.el)
  },
  beforeUnmount() {
    this.io?.disconnect()
    cancelAnimationFrame(this.frame)
    clearTimeout(this.timer)
  },
  methods: {
    play() {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / this.duration)
        this.progress = easeOutExpo(t)
        if (t < 1) this.frame = requestAnimationFrame(tick)
      }
      this.frame = requestAnimationFrame(tick)
    }
  }
}
</script>
