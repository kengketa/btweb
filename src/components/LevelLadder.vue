<template>
  <!-- Brighton's class levels as a staircase of rising bars, with a small bear climbing
       it: hopping from the top of one bar to the next, Bunny to EAP, each step it reaches
       turning yellow, until it plants itself by the flag at the top, and stays there.
       Hover or tap a bar to read that level (the climb waits meanwhile). Pre-rendered HTML
       start the bear on Bunny; "reduce motion" shows it already at the top. -->
  <div class="flex flex-1 flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8">
    <div class="flex flex-col justify-end gap-2 sm:w-[190px] sm:flex-none">
      <span class="flex items-center gap-2 text-[13px] text-muted">
        <span class="h-2 w-2 rounded-full bg-sun"></span>
        {{ hovered === null ? 'ลูกอยู่ระดับ' : 'ระดับชั้นที่ Brighton' }}
      </span>
      <Transition mode="out-in" name="level">
        <span :key="shown" class="flex flex-col gap-2">
          <span class="flex items-baseline gap-2">
            <span class="font-condensed text-[48px] font-bold leading-none md:text-[56px]">{{
              levels[shown].name
            }}</span>
            <span v-if="levels[shown].age" class="font-condensed text-2xl font-bold text-muted">{{
              levels[shown].age
            }}</span>
          </span>
          <span class="min-h-[3.2em] text-sm leading-[1.6] text-body">{{
            levels[shown].desc || `ระดับที่ ${shown + 1} จาก ${levels.length}`
          }}</span>
        </span>
      </Transition>
      <!-- how far up the staircase -->
      <span class="flex flex-col gap-1.5">
        <span class="flex items-center justify-between text-[13px]">
          <span class="font-semibold">ขั้นที่ {{ step + 1 }} จาก {{ levels.length }}</span>
          <Transition name="pop">
            <span v-if="atTop" class="font-semibold text-brand">ถึงขั้นสูงสุด!</span>
          </Transition>
        </span>
        <span class="h-2 overflow-hidden rounded-full bg-cream">
          <span
            :style="{ width: `${((step + 1) / levels.length) * 100}%` }"
            class="block h-full rounded-full bg-sun transition-[width] duration-500 ease-out"
          ></span>
        </span>
      </span>
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-2">
      <div class="relative">
        <div
          ref="bars"
          aria-label="ระดับชั้นที่ Brighton"
          class="flex h-44 items-stretch gap-1 sm:gap-1.5"
          role="group"
          @mouseleave="hovered = null"
        >
          <button
            v-for="(level, i) in levels"
            :key="level.name"
            :aria-label="`${level.name}${level.age ? ' ' + level.age : ''}`"
            :aria-pressed="shown === i"
            :class="hovered === i && 'ring-2 ring-ink/70 ring-offset-2'"
            class="relative flex min-w-0 flex-1 flex-col justify-end overflow-hidden rounded-lg bg-cream outline-none transition focus-visible:ring-2 focus-visible:ring-brand sm:rounded-xl"
            type="button"
            @click="hovered = i"
            @mouseenter="hovered = i"
          >
            <span
              :class="barTone(i)"
              :style="{ height: grown ? `${height(i)}%` : '0%', '--d': `${i * 60}ms` }"
              class="bar relative w-full rounded-lg sm:rounded-xl"
            ></span>
          </button>
        </div>

        <!-- the flag waiting at the top step -->
        <span
          :class="atTop && 'wave'"
          :style="spot(levels.length - 1)"
          aria-hidden="true"
          class="flag pointer-events-none absolute"
        >
          <svg class="h-[58px] w-6" viewBox="0 0 24 58">
            <path d="M5 2v55" stroke="#221C19" stroke-linecap="round" stroke-width="2" />
            <path d="M6 3h13l-3.5 4.5L19 12H6z" fill="#BE1E2D" />
          </svg>
        </span>
        <!-- confetti when the bear reaches the top -->
        <span
          v-if="atTop"
          :style="spot(levels.length - 1)"
          aria-hidden="true"
          class="pointer-events-none absolute"
        >
          <span
            v-for="n in 10"
            :key="n"
            :style="{ '--a': `${n * 36}deg`, background: confetti[n % confetti.length] }"
            class="confetti"
          ></span>
        </span>

        <!-- the climber: stands on the top of its bar; hops on every step -->
        <span
          v-show="grown"
          :class="{ gone: hidden }"
          :style="spot(step)"
          aria-hidden="true"
          class="climber pointer-events-none absolute"
        >
          <span :key="hop" :class="hop && 'hop'" class="block">
            <!-- at the top: turns to face you and cheers -->
            <svg
              v-if="atTop"
              class="bear cheer h-[38px] w-[35px] drop-shadow-[0_3px_3px_rgba(74,42,23,.22)] sm:h-[48px] sm:w-[44px]"
              viewBox="0 0 48 52"
            >
              <g stroke="#4A2A17" stroke-linejoin="round" stroke-width="2">
                <circle cx="11" cy="9" fill="#D49A5E" r="6" />
                <circle cx="37" cy="9" fill="#D49A5E" r="6" />
                <ellipse cx="17" cy="48" fill="#D49A5E" rx="5.5" ry="3.2" />
                <ellipse cx="31" cy="48" fill="#D49A5E" rx="5.5" ry="3.2" />
                <ellipse cx="24" cy="39" fill="#D49A5E" rx="12.5" ry="10" />
              </g>
              <circle cx="11" cy="9.6" fill="#9C6136" r="2.8" />
              <circle cx="37" cy="9.6" fill="#9C6136" r="2.8" />
              <ellipse cx="24" cy="41.5" fill="#FBEBD3" rx="7.5" ry="6.3" />
              <ellipse
                cx="24"
                cy="21"
                fill="#D49A5E"
                rx="16.5"
                ry="14.5"
                stroke="#4A2A17"
                stroke-width="2"
              />
              <ellipse cx="24" cy="26.6" fill="#FBEBD3" rx="7.6" ry="5.8" />
              <ellipse cx="13.6" cy="25.4" fill="#F4A3A3" rx="3" ry="2" />
              <ellipse cx="34.4" cy="25.4" fill="#F4A3A3" rx="3" ry="2" />
              <path
                d="M14.6 20.6q2.5-3.3 5 0M28.4 20.6q2.5-3.3 5 0"
                fill="none"
                stroke="#4A2A17"
                stroke-linecap="round"
                stroke-width="1.9"
              />
              <ellipse cx="24" cy="23.7" fill="#4A2A17" rx="2.3" ry="1.6" />
              <path
                d="M20.8 26.5q3.2 5 6.4 0q-3.2 1.3-6.4 0z"
                fill="#E0474C"
                stroke="#4A2A17"
                stroke-linejoin="round"
                stroke-width="1.3"
              />
              <!-- arms: down by its sides, thrown up on every hop like the "Yay!" sticker -->
              <g fill="#D49A5E" stroke="#4A2A17" stroke-width="2">
                <ellipse class="arm arm-l" cx="10.6" cy="40.5" rx="3.7" ry="5.6" />
                <ellipse class="arm arm-r" cx="37.4" cy="40.5" rx="3.7" ry="5.6" />
              </g>
            </svg>
            <!-- side view, facing up the stairs: legs leap and the arm swings on every hop -->
            <svg
              v-else
              class="bear side h-[38px] w-[38px] drop-shadow-[0_3px_3px_rgba(74,42,23,.22)] sm:h-[48px] sm:w-[48px]"
              viewBox="0 0 52 52"
            >
              <g stroke="#4A2A17" stroke-linejoin="round" stroke-width="2">
                <!-- far side: ear, arm, leg (a shade darker) -->
                <circle cx="29" cy="7" fill="#BF8550" r="4.6" />
                <ellipse class="limb arm-far" cx="34" cy="36.5" fill="#BF8550" rx="3.4" ry="5.4" />
                <ellipse class="limb leg-far" cx="18" cy="46.5" fill="#BF8550" rx="5" ry="3.4" />
                <!-- tail, body -->
                <circle cx="9.5" cy="36" fill="#D49A5E" r="3.2" />
                <ellipse cx="21" cy="37" fill="#D49A5E" rx="12.5" ry="10.5" />
              </g>
              <ellipse cx="27" cy="39" fill="#FBEBD3" rx="5" ry="6.6" />
              <g stroke="#4A2A17" stroke-linejoin="round" stroke-width="2">
                <!-- near leg, head, near ear -->
                <ellipse class="limb leg-near" cx="24" cy="47" fill="#D49A5E" rx="5.6" ry="3.5" />
                <ellipse cx="27" cy="20" fill="#D49A5E" rx="14.5" ry="13.6" />
                <circle cx="20" cy="8.5" fill="#D49A5E" r="5.4" />
                <!-- snout poking forward -->
                <ellipse cx="39.5" cy="23" fill="#FBEBD3" rx="7.2" ry="5.6" />
              </g>
              <circle cx="20" cy="9" fill="#9C6136" r="2.5" />
              <ellipse cx="45.6" cy="20.6" fill="#4A2A17" rx="2.2" ry="1.7" />
              <path
                d="M40.6 25.3q2.6 3.6 5.4.4q-2.7.9-5.4-.4z"
                fill="#E0474C"
                stroke="#4A2A17"
                stroke-linejoin="round"
                stroke-width="1.2"
              />
              <path
                d="M31.8 18.2q2.1-2.8 4.3-.2"
                fill="none"
                stroke="#4A2A17"
                stroke-linecap="round"
                stroke-width="1.9"
              />
              <ellipse cx="32" cy="23.6" fill="#F4A3A3" rx="2.8" ry="1.8" />
              <!-- near arm -->
              <ellipse
                class="limb arm-near"
                cx="28.5"
                cy="37.5"
                fill="#D49A5E"
                rx="3.7"
                ry="5.8"
                stroke="#4A2A17"
                stroke-width="2"
              />
            </svg>
          </span>
        </span>
      </div>
      <!-- names read upward under each bar, so all eleven fit even on a phone -->
      <div class="flex h-[62px] gap-1 sm:gap-1.5">
        <span
          v-for="(level, i) in levels"
          :key="level.name"
          :class="i === step ? 'font-semibold text-ink' : i < step ? 'text-body' : 'text-muted'"
          class="level-name flex min-w-0 flex-1 items-center justify-end font-condensed text-[12px] leading-none transition-colors sm:text-[13px]"
          >{{ level.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { onScreenAtBoot } from '@/composables/useOnScreen'
import { brightonLevels } from '@/data/courses'

const STEP = 900 // ms on each step before hopping to the next

export default {
  name: 'LevelLadder',
  data() {
    return {
      levels: brightonLevels,
      step: 0, // the bar the bear is standing on: it always starts on Bunny
      hovered: null, // a bar the visitor is looking at
      grown: true,
      hidden: false, // the bear fading out to start again at the bottom
      hop: 0, // bumps on every step, to replay the hop
      layout: [], // each bar's centre and width, measured once mounted
      io: null,
      timer: 0,
      visible: false,
      started: false, // the climb runs once per visit, then the bear stays at the top
      confetti: ['#F4B63F', '#BE1E2D', '#3F6B4A', '#F6C3A6']
    }
  },
  computed: {
    shown() {
      return this.hovered ?? this.step
    },
    atTop() {
      return this.step === this.levels.length - 1 && !this.hidden
    }
  },
  mounted() {
    this.measure()
    window.addEventListener('resize', this.measure, { passive: true })
    document.fonts?.ready.then(this.measure)
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.step = this.levels.length - 1
      return
    }
    if (!onScreenAtBoot(this.$refs.bars)) this.grown = false
    this.io = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.isIntersecting
        if (!this.visible) return clearTimeout(this.timer)
        if (!this.started) {
          // first time on screen: grow the bars, then start climbing from Bunny
          this.started = true
          const growing = !this.grown
          this.grown = true
          this.climbFrom(0, growing ? 1300 : 500)
        } else if (!this.atTop) {
          // scrolled away mid-climb: carry on from the same step
          clearTimeout(this.timer)
          this.timer = setTimeout(this.next, 500)
        }
      },
      { threshold: 0.5 }
    )
    this.io.observe(this.$refs.bars)
  },
  beforeUnmount() {
    this.io?.disconnect()
    clearTimeout(this.timer)
    window.removeEventListener('resize', this.measure)
  },
  methods: {
    height(i) {
      return 8 + i * 6.4
    },
    barTone(i) {
      if (i === this.step) return 'bg-sun shadow-[0_0_0_3px_rgba(244,182,63,.35)]'
      if (i < this.step) return 'bg-sun/45'
      return 'bg-paper'
    },
    measure() {
      this.$nextTick(() => {
        const wrap = this.$refs.bars
        if (!wrap) return
        this.layout = [...wrap.children].map((b) => ({
          x: b.offsetLeft + b.offsetWidth / 2,
          h: b.offsetHeight
        }))
      })
    },
    // where a figure standing on top of bar i goes
    spot(i) {
      const b = this.layout[i]
      if (!b) return { display: 'none' }
      return { left: `${b.x}px`, bottom: `${(b.h * this.height(i)) / 100}px` }
    },
    // start at bar `from` (fading in at the bottom when starting over) and climb
    climbFrom(from, wait) {
      clearTimeout(this.timer)
      // already standing there (first climb): just wait, then go
      if (this.step === from) {
        this.timer = setTimeout(this.next, wait)
        return
      }
      this.hidden = true
      this.timer = setTimeout(() => {
        this.step = from
        this.hidden = false
        this.timer = setTimeout(this.next, STEP)
      }, wait)
    },
    next() {
      if (!this.visible) return
      // the visitor is reading a level: wait for them
      if (this.hovered !== null) {
        this.timer = setTimeout(this.next, 600)
        return
      }
      // one step up; at the top the bear stays and cheers (no loop)
      if (this.step < this.levels.length - 1) {
        this.step += 1
        this.hop += 1
        this.timer = setTimeout(this.next, STEP)
      }
    }
  }
}
</script>

<style scoped>
.bar {
  transition:
    background-color 0.35s,
    box-shadow 0.35s,
    height 0.9s cubic-bezier(0.34, 1.3, 0.64, 1) var(--d);
}
/* the climber glides to the next step while its body hops up and down */
.climber {
  z-index: 2;
  translate: -50% 2px;
  transition:
    left 0.55s cubic-bezier(0.45, 0, 0.25, 1),
    bottom 0.55s cubic-bezier(0.45, 0, 0.25, 1),
    opacity 0.35s ease;
}
.climber.gone {
  opacity: 0;
  transition: opacity 0.35s ease;
}
.hop {
  animation: hop 0.55s cubic-bezier(0.3, 0, 0.3, 1);
}
@keyframes hop {
  0% {
    translate: 0 0;
    scale: 1 1;
  }
  15% {
    translate: 0 0;
    scale: 1.1 0.88;
  }
  50% {
    translate: 0 -22px;
    scale: 0.95 1.06;
    rotate: 6deg;
  }
  85% {
    translate: 0 0;
    scale: 1.08 0.9;
  }
  100% {
    translate: 0 0;
    scale: 1 1;
  }
}
/* side view: on every hop the arms swing forward and the legs leap apart */
.limb {
  transform-box: view-box;
}
.arm-near {
  transform-origin: 28px 32.5px;
}
.arm-far {
  transform-origin: 33.5px 31.5px;
}
.leg-near {
  transform-origin: 24px 43px;
}
.leg-far {
  transform-origin: 18px 43px;
}
.hop .arm-near {
  animation: swing-near 0.55s ease-out;
}
.hop .arm-far {
  animation: swing-far 0.55s ease-out;
}
.hop .leg-near {
  animation: kick-back 0.55s ease-out;
}
.hop .leg-far {
  animation: kick-forward 0.55s ease-out;
}
@keyframes swing-near {
  25%,
  65% {
    rotate: -130deg;
  }
}
@keyframes swing-far {
  30%,
  70% {
    rotate: -100deg;
  }
}
@keyframes kick-back {
  25%,
  60% {
    rotate: 40deg;
  }
}
@keyframes kick-forward {
  25%,
  60% {
    rotate: -35deg;
  }
}
/* the bear throws its arms up on every hop, and keeps cheering at the top */
.arm {
  transform-box: view-box;
  transition: rotate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.arm-l {
  transform-origin: 12px 36px;
}
.arm-r {
  transform-origin: 36px 36px;
}
.hop .arm-l {
  animation: arm-l 0.55s ease-out;
}
.hop .arm-r {
  animation: arm-r 0.55s ease-out;
}
@keyframes arm-l {
  20%,
  70% {
    rotate: 140deg;
  }
}
@keyframes arm-r {
  20%,
  70% {
    rotate: -140deg;
  }
}
.cheer .arm-l {
  rotate: 140deg;
  animation: cheer-l 0.5s ease-in-out 0.3s 4 alternate;
}
.cheer .arm-r {
  rotate: -140deg;
  animation: cheer-r 0.5s ease-in-out 0.3s 4 alternate;
}
@keyframes cheer-l {
  to {
    rotate: 160deg;
  }
}
@keyframes cheer-r {
  to {
    rotate: -160deg;
  }
}
/* a tall pole beside the top step, so the flag still shows above the bear's head */
.flag {
  z-index: 1;
  translate: 8px 0;
  transform-origin: bottom left;
}
.wave {
  animation: wave 0.6s ease-in-out 3;
}
@keyframes wave {
  50% {
    rotate: -10deg;
  }
}
.confetti {
  position: absolute;
  left: 0;
  bottom: 18px;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  animation: burst 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}
@keyframes burst {
  from {
    opacity: 1;
    transform: rotate(var(--a)) translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: rotate(var(--a)) translateY(-38px) scale(0.6);
  }
}
.level-enter-active,
.level-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}
.level-enter-from {
  opacity: 0;
  translate: 0 8px;
}
.level-leave-to {
  opacity: 0;
  translate: 0 -6px;
}
.pop-enter-active {
  transition:
    opacity 0.2s ease,
    scale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
  opacity: 0;
  scale: 0.6;
}
/* each name runs bottom-to-top under its bar */
.level-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
