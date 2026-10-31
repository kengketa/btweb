<template>
  <!-- Every line is laid out from the start and the unplayed ones are only hidden, so the
       card has its full height before the chat plays: nothing below it moves while the
       visitor (or a nav jump) scrolls past. -->
  <div ref="box" class="flex flex-1 flex-col justify-end gap-1.5 text-[13.5px]">
    <div
      v-for="([who, line, name], i) in lines"
      :key="i"
      :class="who === 'teacher' ? 'self-start' : 'flex items-end gap-1.5 self-end'"
      class="relative max-w-[92%]"
    >
      <!-- a child's name beside their first line, so a class of several reads clearly -->
      <span
        v-if="name && name !== lastName(i)"
        :class="i < shown ? 'opacity-100' : 'invisible opacity-0'"
        class="pb-1 text-[11px] font-semibold text-body transition-opacity duration-300"
        >{{ name }}</span
      >
      <div
        :class="[
          who === 'teacher' ? 'rounded-bl-md bg-white' : childTone(name),
          i < shown ? 'translate-y-0 opacity-100' : 'invisible translate-y-2.5 opacity-0'
        ]"
        class="rounded-2xl px-3.5 py-1.5 leading-snug transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
      >
        {{ line }}
      </div>
      <!-- "typing…" dots in the slot of the line that is on its way -->
      <div
        v-if="typing && i === shown"
        :class="
          who === 'teacher'
            ? 'left-0 top-0 bg-white'
            : ['bottom-0 right-0', children.indexOf(name) === 1 ? 'bg-sun' : 'bg-brand/90']
        "
        aria-hidden="true"
        class="absolute flex gap-1 rounded-2xl px-3.5 py-2.5"
      >
        <span
          v-for="n in 3"
          :key="n"
          :class="
            who === 'teacher' ? 'bg-muted' : children.indexOf(name) === 1 ? 'bg-ink/60' : 'bg-white'
          "
          :style="{ animationDelay: `${n * 0.15}s` }"
          class="typing-dot h-1.5 w-1.5 rounded-full"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { onScreenAtBoot } from '@/composables/useOnScreen'
// A short classroom exchange that plays line by line the first time the card scrolls
// into view. Pre-rendered HTML (and "reduce motion") shows every line straight away.
export default {
  name: 'ChatDemo',
  props: {
    // [['teacher' | 'child', text, childName?], ...]: each child gets their own colour
    lines: { type: Array, required: true },
    pace: { type: Number, default: 900 }
  },
  data() {
    return { shown: this.lines.length, typing: false, timers: [], io: null }
  },
  mounted() {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    if (onScreenAtBoot(this.$refs.box)) return // already on screen: leave it
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
  computed: {
    children() {
      return [...new Set(this.lines.filter(([, , n]) => n).map(([, , n]) => n))]
    }
  },
  methods: {
    // the name of the child who last spoke before line i
    lastName(i) {
      for (let j = i - 1; j >= 0; j--) if (this.lines[j][2]) return this.lines[j][2]
      return null
    },
    childTone(name) {
      return this.children.indexOf(name) === 1
        ? 'rounded-br-md bg-sun text-ink'
        : 'rounded-br-md bg-brand text-white'
    },
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
