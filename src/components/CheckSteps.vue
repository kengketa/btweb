<template>
  <!-- A checklist that ticks itself off one item at a time, like BeBetter's study plan:
       pending (outlined number) → current (lit number, pulsing ring) → done (yellow
       tick). When every item is done it holds, then starts again. Tap an item to jump to
       it. Pre-rendered HTML and "reduce motion" show the finished list. -->
  <div ref="root" class="flex flex-1 flex-col gap-4">
    <ul class="flex flex-col gap-2.5">
      <li v-for="(item, i) in items" :key="item">
        <button
          :aria-label="`${item}${state(i) === 'done' ? ' · ผ่าน' : ''}`"
          :class="pill[state(i)]"
          class="flex w-full items-center justify-between gap-3 rounded-full border py-2.5 pl-4 pr-2.5 text-left text-[15px] transition-colors duration-300"
          type="button"
          @click="pick(i)"
        >
          <span
            :class="state(i) === 'pending' ? 'text-muted' : 'text-ink'"
            class="transition-colors duration-300"
            >{{ item }}</span
          >
          <span class="flex flex-none items-center gap-2">
            <Transition mode="out-in" name="tag">
              <span
                v-if="state(i) === 'done'"
                key="done"
                class="text-[12px] font-medium text-brand"
                >{{ doneLabel }}</span
              >
            </Transition>
            <span
              :class="dot[state(i)]"
              class="relative flex h-7 w-7 items-center justify-center rounded-full font-condensed text-[13px] font-bold transition-colors duration-300"
            >
              <span v-if="state(i) === 'current'" aria-hidden="true" class="pulse"></span>
              <Transition mode="out-in" name="pop">
                <svg
                  v-if="state(i) === 'done'"
                  key="tick"
                  aria-hidden="true"
                  class="tick h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.6"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12.5 9.5 17 19 7.5" />
                </svg>
                <span v-else key="num">{{ i + 1 }}</span>
              </Transition>
            </span>
          </span>
        </button>
      </li>
    </ul>

    <!-- progress: how many are ticked, as words and as a bar -->
    <div class="mt-auto flex flex-col gap-2">
      <div class="h-1.5 overflow-hidden rounded-full bg-white/80">
        <div
          :style="{ width: `${(done / items.length) * 100}%` }"
          class="h-full rounded-full bg-sun transition-[width] duration-500 ease-out"
        ></div>
      </div>
      <span class="text-[13px] text-body">
        <template v-if="done === items.length">{{ completeLabel }}</template>
        <template v-else>ผ่านแล้ว {{ done }} จาก {{ items.length }} ข้อ · แตะข้อไหนก็ได้</template>
      </span>
    </div>
  </div>
</template>

<script>
const STEP = 1300 // ms each item stays "current"
const START = 700 // pause before the first item lights up
const HOLD = 2600 // how long the finished list stays before starting over

export default {
  name: 'CheckSteps',
  props: {
    items: { type: Array, required: true },
    doneLabel: { type: String, default: 'ผ่าน' },
    completeLabel: { type: String, default: 'ผ่านครบทุกข้อ' }
  },
  data() {
    // finished list until the browser takes over, so the pre-rendered page is complete
    return { done: this.items.length, timer: 0, io: null, visible: false }
  },
  computed: {
    current() {
      return this.done < this.items.length ? this.done : -1
    }
  },
  created() {
    this.pill = {
      pending: 'border-line2 bg-white/40',
      current: 'border-brand/45 bg-white shadow-[0_8px_20px_-14px_rgba(190,30,45,.35)]',
      done: 'border-brand/20 bg-white/70'
    }
    this.dot = {
      pending: 'border border-brand/30 text-brand/70',
      current: 'bg-sun text-ink',
      done: 'bg-sun text-ink'
    }
  },
  mounted() {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    // only play while the card is on screen; start over each time it comes back
    this.io = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.isIntersecting
        if (this.visible) this.restart(0, START)
        else clearTimeout(this.timer)
      },
      { threshold: 0.4 }
    )
    this.io.observe(this.$refs.root)
  },
  beforeUnmount() {
    this.io?.disconnect()
    clearTimeout(this.timer)
  },
  methods: {
    state(i) {
      if (i < this.done) return 'done'
      return i === this.current ? 'current' : 'pending'
    },
    restart(from, wait = STEP) {
      clearTimeout(this.timer)
      this.done = from
      this.timer = setTimeout(this.tick, wait)
    },
    tick() {
      if (!this.visible) return
      if (this.done < this.items.length) {
        this.done += 1
        this.timer = setTimeout(this.tick, this.done < this.items.length ? STEP : HOLD)
      } else {
        this.restart(0, START)
      }
    },
    // tapping an item makes it the current one; the run carries on from there
    pick(i) {
      if (!this.io) return
      this.restart(i)
    }
  }
}
</script>

<style scoped>
.pulse {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  box-shadow: 0 0 0 0 rgb(190 30 45 / 0.3);
  animation: pulse 1.3s ease-out infinite;
}
@keyframes pulse {
  to {
    box-shadow: 0 0 0 9px rgb(190 30 45 / 0);
  }
}
/* the tick draws itself in */
.tick path {
  stroke-dasharray: 24;
  animation: draw 0.4s 0.05s ease-out backwards;
}
@keyframes draw {
  from {
    stroke-dashoffset: 24;
  }
}
.pop-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition: opacity 0.12s ease;
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.4);
}
.pop-leave-to {
  opacity: 0;
}
.tag-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tag-leave-active {
  transition: opacity 0.15s ease;
}
.tag-enter-from {
  opacity: 0;
  transform: translateX(6px) scale(0.9);
}
.tag-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .pulse,
  .tick path {
    animation: none;
  }
}
</style>
