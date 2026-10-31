<template>
  <!-- One lesson, playing itself through: a highlight slides from step to step, the line
       behind the numbers fills as the lesson moves on, and a time bar runs inside the
       current step (longer steps run longer). It loops while on screen. Hover or tap a
       step to look at it; the run carries on from there. Pre-rendered HTML and "reduce
       motion" show a still list with one step highlighted. -->
  <ol ref="list" class="relative flex flex-col gap-2" @mouseleave="resume">
    <!-- the line through the numbers, and its filled part up to the current step -->
    <span
      :style="{ top: `${line.top}px`, height: `${line.length}px` }"
      aria-hidden="true"
      class="absolute left-[29px] w-0.5 rounded-full bg-sun/30"
    ></span>
    <span
      :style="{ top: `${line.top}px`, height: `${line.fill}px` }"
      aria-hidden="true"
      class="fill-line absolute left-[29px] w-0.5 rounded-full bg-sun"
    ></span>
    <!-- the highlight that glides to the current step -->
    <span
      :style="{ transform: `translateY(${box.y}px)`, height: `${box.h}px` }"
      :class="box.h ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
      class="glide absolute inset-x-0 top-0 rounded-2xl bg-sunsoft"
    ></span>

    <li
      v-for="([name, text], i) in steps"
      :key="name"
      :ref="(el) => (rowEls[i] = el)"
      class="relative"
    >
      <button
        :aria-pressed="current === i"
        class="relative flex w-full items-start gap-3.5 rounded-2xl p-3 text-left"
        type="button"
        @click="pick(i)"
        @mouseenter="hover(i)"
      >
        <span
          :class="dot(i)"
          class="relative flex h-9 w-9 flex-none items-center justify-center rounded-full font-condensed text-sm font-bold ring-4 transition-colors duration-300"
        >
          <span v-if="current === i && playing" aria-hidden="true" class="pulse"></span>
          {{ i + 1 }}
        </span>
        <span class="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
          <span class="flex items-center justify-between gap-2">
            <b class="font-condensed text-[17px] font-semibold">{{ name }}</b>
            <Transition name="pop">
              <span
                v-if="current === i"
                class="rounded-full bg-sun px-2.5 py-0.5 text-[12px] font-semibold"
                >{{ minutes[i] }} นาที</span
              >
            </Transition>
          </span>
          <span class="text-sm leading-[1.6] text-muted">{{ text }}</span>
        </span>
        <!-- time passing in this step while the lesson plays; it sits in the row's
             bottom padding, so the rows never change height -->
        <span
          v-if="current === i && playing"
          :key="run"
          aria-hidden="true"
          class="absolute bottom-[5px] left-[62px] right-3 h-1 overflow-hidden rounded-full bg-sun/25"
        >
          <span
            :style="{ animationDuration: `${duration(i)}ms` }"
            class="timer block h-full"
          ></span>
        </span>
      </button>
    </li>
  </ol>
</template>

<script>
const START = 600 // pause before the lesson starts
const HOLD = 1400 // pause on the last step before starting over
// how long each step plays: a base plus a little per minute of the real lesson
const PER_MINUTE = 90
const BASE = 900

export default {
  name: 'LessonSteps',
  props: {
    steps: { type: Array, required: true }, // [[name, text], ...]
    minutes: { type: Array, required: true } // minutes per step
  },
  data() {
    return {
      current: 2, // the step shown before the browser takes over
      playing: false, // the run is going (not paused by hover, on screen)
      hovering: false,
      visible: false,
      run: 0, // bumps on every step change, to restart the time bar
      box: { y: 0, h: 0 },
      line: { top: 0, length: 0, fill: 0 },
      timer: 0,
      io: null,
      motion: false
    }
  },
  watch: {
    current: 'measure'
  },
  created() {
    // the step rows, by index (refs collected in a v-for don't promise an order)
    this.rowEls = []
  },
  mounted() {
    this.measure()
    window.addEventListener('resize', this.measure, { passive: true })
    document.fonts?.ready.then(this.measure)
    this.motion =
      'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!this.motion) return
    this.io = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.isIntersecting
        if (this.visible) this.goTo(0, START)
        else this.stop()
      },
      { threshold: 0.4 }
    )
    this.io.observe(this.$refs.list)
  },
  beforeUnmount() {
    this.io?.disconnect()
    clearTimeout(this.timer)
    window.removeEventListener('resize', this.measure)
  },
  methods: {
    dot(i) {
      if (i === this.current) return 'bg-ink text-sun ring-sunsoft'
      if (i < this.current) return 'bg-sun text-ink ring-white'
      return 'bg-[#FBE7BC] text-ink/60 ring-white'
    },
    duration(i) {
      return BASE + this.minutes[i] * PER_MINUTE
    },
    // where the highlight and the filled line should be for the current step
    measure() {
      this.$nextTick(() => {
        const rows = this.rowEls
        if (!rows?.length) return
        const centre = (row) => row.offsetTop + 12 + 18 // row padding + half the number
        const row = rows[this.current]
        this.box = { y: row.offsetTop, h: row.offsetHeight }
        const top = centre(rows[0])
        this.line = {
          top,
          length: centre(rows[rows.length - 1]) - top,
          fill: centre(row) - top
        }
      })
    },
    stop() {
      clearTimeout(this.timer)
      this.playing = false
    },
    // make step i current and play on from it (after `wait`, or straight away)
    goTo(i, wait = 0) {
      clearTimeout(this.timer)
      this.current = i
      this.playing = false
      this.timer = setTimeout(() => this.play(), wait)
    },
    play() {
      if (!this.visible || this.hovering) return
      this.playing = true
      this.run += 1
      const last = this.current === this.steps.length - 1
      this.timer = setTimeout(() => {
        if (last) {
          this.playing = false
          this.timer = setTimeout(() => this.goTo(0), HOLD)
        } else {
          this.current += 1
          this.play()
        }
      }, this.duration(this.current))
    },
    hover(i) {
      this.hovering = true
      this.stop()
      this.current = i
    },
    resume() {
      this.hovering = false
      if (this.motion && this.visible) this.goTo(this.current, 500)
    },
    pick(i) {
      this.hovering = false
      if (this.motion && this.visible) this.goTo(i, 0)
      else this.current = i
    }
  }
}
</script>

<style scoped>
.glide {
  transition:
    transform 0.55s cubic-bezier(0.34, 1.3, 0.64, 1),
    height 0.4s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.3s;
}
.fill-line {
  transition: height 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.timer {
  width: 100%;
  background: #f4b63f;
  transform-origin: left;
  animation: timer linear forwards;
}
@keyframes timer {
  from {
    transform: scaleX(0);
  }
}
.pulse {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  box-shadow: 0 0 0 0 rgb(34 28 25 / 0.35);
  animation: pulse 1.3s ease-out infinite;
}
@keyframes pulse {
  to {
    box-shadow: 0 0 0 9px rgb(34 28 25 / 0);
  }
}
.pop-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition: opacity 0.12s ease;
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.pop-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .glide,
  .fill-line {
    transition: none;
  }
  .pulse {
    animation: none;
  }
}
</style>
