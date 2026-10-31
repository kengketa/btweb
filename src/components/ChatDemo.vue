<template>
  <div ref="box" class="flex flex-1 flex-col justify-end gap-2.5 text-[15px]">
    <TransitionGroup name="bubble">
      <div
        v-for="([who, line], i) in lines.slice(0, shown)"
        :key="i"
        :class="
          who === 'teacher'
            ? 'self-start rounded-bl-md bg-white'
            : 'self-end rounded-br-md bg-brand text-white'
        "
        class="max-w-[85%] rounded-2xl px-4 py-2.5 leading-snug"
      >
        {{ line }}
      </div>
      <!-- "typing…" dots while the next line is on its way -->
      <div
        v-if="typing"
        key="typing"
        :class="nextIsTeacher ? 'self-start bg-white' : 'self-end bg-brand/90'"
        aria-hidden="true"
        class="flex gap-1 rounded-2xl px-4 py-3.5"
      >
        <span
          v-for="n in 3"
          :key="n"
          :class="nextIsTeacher ? 'bg-muted' : 'bg-white'"
          :style="{ animationDelay: `${n * 0.15}s` }"
          class="typing-dot h-1.5 w-1.5 rounded-full"
        ></span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
// A short classroom exchange that plays line by line the first time the card scrolls
// into view. Pre-rendered HTML (and "reduce motion") shows every line straight away.
export default {
  name: 'ChatDemo',
  props: {
    lines: { type: Array, required: true }, // [['teacher' | 'child', text], ...]
    pace: { type: Number, default: 900 }
  },
  data() {
    return { shown: this.lines.length, typing: false, timers: [], io: null }
  },
  computed: {
    nextIsTeacher() {
      return this.lines[this.shown]?.[0] === 'teacher'
    }
  },
  mounted() {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const r = this.$refs.box.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return // already on screen: leave it
    this.shown = 0
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        this.io.disconnect()
        this.play()
      },
      { threshold: 0.5 }
    )
    this.io.observe(this.$refs.box)
  },
  beforeUnmount() {
    this.io?.disconnect()
    this.timers.forEach(clearTimeout)
  },
  methods: {
    play() {
      if (this.shown >= this.lines.length) return
      this.typing = true
      this.timers.push(
        setTimeout(() => {
          this.typing = false
          this.shown += 1
          this.timers.push(setTimeout(this.play, 250))
        }, this.pace)
      )
    }
  }
}
</script>

<style scoped>
.bubble-enter-active {
  transition:
    opacity 0.35s ease,
    translate 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.bubble-enter-from {
  opacity: 0;
  translate: 0 10px;
}
.typing-dot {
  animation: typing 1s infinite ease-in-out;
}
@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.35;
    translate: 0 0;
  }
  30% {
    opacity: 1;
    translate: 0 -3px;
  }
}
</style>
