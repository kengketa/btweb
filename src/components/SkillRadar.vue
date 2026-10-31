<template>
  <div ref="root" :data-phase="animated ? phase : null" class="radar">
    <svg
      :aria-label="`กราฟทักษะ ${axes.length} ด้านของ${name} เทียบค่าเฉลี่ยระดับชั้น`"
      class="block h-auto w-full overflow-visible"
      role="img"
      viewBox="-4 50 328 202"
    >
      <defs v-if="animated">
        <radialGradient id="radar-sweep" :cx="CX" :cy="CY" :r="R" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#12A150" stop-opacity="0" />
          <stop offset="1" stop-color="#12A150" stop-opacity=".22" />
        </radialGradient>
      </defs>

      <g class="rings">
        <polygon
          v-for="(r, i) in chart.rings"
          :key="r.v"
          :fill="r.v === 100 ? '#F3F8FD' : 'none'"
          :points="r.points"
          :style="{ '--d': `${(chart.rings.length - 1 - i) * 70}ms` }"
          stroke="#DCE7F2"
        />
      </g>
      <g class="spokes">
        <line
          v-for="(a, i) in chart.spokes"
          :key="i"
          :style="{ '--d': `${200 + i * 30}ms` }"
          :x1="CX"
          :x2="a[0]"
          :y1="CY"
          :y2="a[1]"
          pathLength="1"
          stroke="#DCE7F2"
        />
      </g>

      <!-- a soft scanner that circles the chart, lighting each skill as it passes -->
      <g
        v-if="animated && phase === 'live' && hovered === null"
        :transform="`rotate(${sweep} ${CX} ${CY})`"
      >
        <path :d="wedge" fill="url(#radar-sweep)" />
        <line
          :x1="CX"
          :x2="CX"
          :y1="CY"
          :y2="CY - R"
          stroke="#12A150"
          stroke-linecap="round"
          stroke-opacity=".45"
          stroke-width="1.4"
        />
      </g>

      <polygon
        :points="chart.average"
        class="average"
        fill="none"
        stroke="#8A93B2"
        stroke-dasharray="5 4"
        stroke-width="1.6"
      />
      <polygon
        :points="chart.child"
        class="child"
        fill="rgba(18,161,80,.16)"
        stroke="#12A150"
        stroke-linejoin="round"
        stroke-width="2.2"
      />
      <!-- the lit skill: a ring around its dot -->
      <circle
        v-if="animated && lit !== null && phase === 'live'"
        :key="`ring${lit}`"
        :cx="chart.dots[lit][0]"
        :cy="chart.dots[lit][1]"
        class="lit-ring"
        fill="none"
        r="7"
        stroke="#12A150"
        stroke-width="1.5"
      />
      <circle
        v-for="(d, i) in chart.dots"
        :key="'d' + i"
        :cx="d[0]"
        :cy="d[1]"
        :r="lit === i && phase === 'live' ? 4.6 : 3.4"
        :style="{ '--d': `${900 + i * 60}ms` }"
        class="dot"
        fill="#12A150"
        stroke="#fff"
        stroke-width="1.5"
      />
      <text
        v-for="(l, i) in chart.labels"
        :key="l.text"
        :fill="lit === i && phase === 'live' ? '#12A150' : '#3D4770'"
        :font-weight="lit === i && phase === 'live' ? 700 : 400"
        :style="{ '--d': `${700 + i * 50}ms` }"
        :text-anchor="l.anchor"
        :x="l.x"
        :y="l.y"
        class="label font-condensed"
        font-size="11"
      >
        {{ l.text }}
      </text>

      <!-- hover / tap targets, one per skill -->
      <g v-if="animated">
        <circle
          v-for="(d, i) in chart.spokes"
          :key="'h' + i"
          :cx="d[0]"
          :cy="d[1]"
          class="cursor-pointer"
          fill="transparent"
          r="16"
          @click="hovered = i"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        />
      </g>
    </svg>

    <!-- readout for the lit skill: the child's score against the class average -->
    <div v-if="animated" class="readout mt-1 flex h-7 items-center justify-center">
      <Transition mode="out-in" name="readout">
        <span
          v-if="lit !== null && phase === 'live'"
          :key="lit"
          class="flex items-center gap-2 rounded-full bg-[#12A150]/10 px-3 py-1 text-[12.5px] text-[#3D4770]"
        >
          <b class="font-condensed font-semibold text-[#12A150]">{{ axes[lit] }}</b>
          <span class="font-condensed text-[15px] font-bold leading-none text-[#12A150]">{{
            child[lit]
          }}</span>
          <span class="text-[11.5px]">{{ compare(lit) }}</span>
        </span>
      </Transition>
    </div>

    <div class="mt-1 flex justify-center gap-4 text-[11.5px] text-[#3D4770]">
      <span class="flex items-center gap-1.5"
        ><span class="h-2.5 w-[18px] rounded-sm border-2 border-[#12A150] bg-[#12A150]/[.16]"></span
        >{{ name }}</span
      >
      <span class="flex items-center gap-1.5"
        ><span class="h-2.5 w-[18px] rounded-sm border-2 border-dashed border-[#8A93B2]"></span
        >ค่าเฉลี่ยระดับชั้น</span
      >
    </div>
  </div>
</template>

<script>
import { onScreenAtBoot } from '@/composables/useOnScreen'
// The skills radar from the Student Progress parent app: one child's scores against the
// class average, in the app's own colours. Used by the /results phone demo and the home
// page's progress card, both with the sample data in src/data/parentReport.js.
//
// `animated` (home page): when the chart scrolls into view the rings open out, the
// spokes draw in, and the child's shape grows from the centre one skill after another.
// Then a soft scanner circles the chart, lighting each skill in turn with its score
// against the class average below. Hover or tap a skill to read it. Only runs while on
// screen; pre-rendered HTML and "reduce motion" show the still chart.

// geometry in the SVG's own units: centre, and the radius of a score of 100
const CX = 160
const CY = 150
const R = 70
const LAP = 9000 // ms for the scanner to go once round
const GROW = 700 // ms for each skill's point to grow out
const GROW_STAGGER = 70 // ms between one skill and the next

// a quick rise that settles back a little, for the growing shape
const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2)

export default {
  name: 'SkillRadar',
  props: {
    axes: { type: Array, required: true },
    child: { type: Array, required: true },
    average: { type: Array, required: true },
    // the child's name, for the legend and the chart's accessible label
    name: { type: String, required: true },
    animated: { type: Boolean, default: false }
  },
  data() {
    return {
      CX,
      CY,
      R,
      // 'still' until the browser takes over; then 'waiting' (below the fold),
      // 'intro' (drawing itself) and 'live' (scanner going round)
      phase: 'still',
      grow: null, // per-skill growth 0..1 while the shape grows; null = full size
      sweep: 0, // scanner angle, degrees clockwise from the top
      hovered: null,
      frame: 0,
      io: null
    }
  },
  computed: {
    step() {
      return 360 / this.axes.length
    },
    // the skill being shown: the hovered one, or the last one the scanner passed
    lit() {
      if (this.hovered !== null) return this.hovered
      return Math.floor(((this.sweep + 2) % 360) / this.step) % this.axes.length
    },
    // the scanner's trail: a 40° slice behind its leading edge
    wedge() {
      const r = R + 2
      const a = (-40 * Math.PI) / 180 - Math.PI / 2
      return `M${CX},${CY} L${CX + r * Math.cos(a)},${CY + r * Math.sin(a)} A${r},${r} 0 0 1 ${CX},${CY - r} Z`
    },
    chart() {
      const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / this.axes.length
      // scores run 50 (centre) to 100 (edge)
      const point = (i, v) => {
        const r = (Math.max(0, v - 50) / 50) * R
        return [CX + r * Math.cos(angle(i)), CY + r * Math.sin(angle(i))]
      }
      const polygon = (values) =>
        values
          .map((v, i) =>
            point(i, v)
              .map((n) => n.toFixed(1))
              .join(',')
          )
          .join(' ')
      // while growing, each score moves out from the centre (50) to its value
      const shown = this.grow ? this.child.map((v, i) => 50 + (v - 50) * this.grow[i]) : this.child
      return {
        rings: [100, 90, 80, 70, 60].map((v) => ({ v, points: polygon(this.axes.map(() => v)) })),
        spokes: this.axes.map((_, i) => point(i, 100)),
        average: polygon(this.average),
        child: polygon(shown),
        dots: shown.map((v, i) => point(i, v)),
        labels: this.axes.map((text, i) => {
          const c = Math.cos(angle(i))
          const s = Math.sin(angle(i))
          return {
            text,
            x: CX + (R + 8) * c,
            y: CY + (R + 8) * s + (s > 0.5 ? 11 : s < -0.5 ? -3 : 4),
            anchor: c > 0.15 ? 'start' : c < -0.15 ? 'end' : 'middle'
          }
        })
      }
    }
  },
  mounted() {
    if (
      !this.animated ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    // already on screen as the site first loads: skip the intro rather than blink it away.
    // After a click to another page the old scroll position is still in place at this
    // point, so there it always waits and plays the intro when it scrolls into view.
    const onScreen = onScreenAtBoot(this.$refs.root)
    this.phase = onScreen ? 'live' : 'waiting'
    if (!onScreen) this.grow = this.axes.map(() => 0)
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (this.phase === 'waiting') this.intro()
          else this.run()
        } else {
          cancelAnimationFrame(this.frame)
          this.frame = 0
        }
      },
      { threshold: 0.35 }
    )
    this.io.observe(this.$refs.root)
  },
  beforeUnmount() {
    this.io?.disconnect()
    cancelAnimationFrame(this.frame)
  },
  methods: {
    compare(i) {
      const diff = this.child[i] - this.average[i]
      if (diff > 0) return `สูงกว่าค่าเฉลี่ย ${diff}`
      if (diff < 0) return `ต่ำกว่าค่าเฉลี่ย ${-diff}`
      return 'เท่าค่าเฉลี่ย'
    },
    // rings and labels come in by CSS; the shape grows here, skill by skill
    intro() {
      this.phase = 'intro'
      const start = performance.now() + 450
      const tick = (now) => {
        const t = now - start
        this.grow = this.axes.map((_, i) => {
          const p = Math.min(1, Math.max(0, (t - i * GROW_STAGGER) / GROW))
          return p === 0 ? 0 : easeOutBack(p)
        })
        if (t < GROW + GROW_STAGGER * this.axes.length) {
          this.frame = requestAnimationFrame(tick)
        } else {
          this.grow = null
          this.phase = 'live'
          this.sweep = 0
          this.frame = 0
          this.run()
        }
      }
      this.frame = requestAnimationFrame(tick)
    },
    // the scanner: one full turn every LAP ms, from wherever it was
    run() {
      if (this.phase !== 'live' || this.frame) return
      let last = performance.now()
      const tick = (now) => {
        if (this.hovered === null) this.sweep = (this.sweep + ((now - last) / LAP) * 360) % 360
        last = now
        this.frame = requestAnimationFrame(tick)
      }
      this.frame = requestAnimationFrame(tick)
    }
  }
}
</script>

<style scoped>
.rings polygon,
.average {
  transform-box: view-box;
  transform-origin: 160px 150px;
}
/* waiting below the fold: everything folded into the centre */
[data-phase='waiting'] .rings polygon,
[data-phase='waiting'] .average {
  opacity: 0;
  transform: scale(0.2);
}
[data-phase='waiting'] .spokes line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
[data-phase='waiting'] .label,
[data-phase='waiting'] .dot {
  opacity: 0;
}
/* the intro: rings open out from the middle, spokes draw, labels and dots follow */
[data-phase='intro'] .rings polygon {
  transition:
    transform 0.8s cubic-bezier(0.34, 1.4, 0.64, 1) var(--d),
    opacity 0.4s ease var(--d);
}
[data-phase='intro'] .spokes line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.19, 1, 0.22, 1) var(--d);
}
[data-phase='intro'] .average {
  transition:
    transform 0.9s cubic-bezier(0.19, 1, 0.22, 1) 0.35s,
    opacity 0.5s ease 0.35s;
}
[data-phase='intro'] .label {
  transition: opacity 0.5s ease var(--d);
}
[data-phase='intro'] .dot {
  transition: opacity 0.3s ease var(--d);
}
.dot {
  transition: r 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.label {
  transition: fill 0.25s;
}
.lit-ring {
  transform-box: fill-box;
  transform-origin: center;
  animation: lit 1.4s ease-out infinite;
}
@keyframes lit {
  from {
    opacity: 0.9;
    transform: scale(0.6);
  }
  to {
    opacity: 0;
    transform: scale(1.6);
  }
}
.readout-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.readout-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.readout-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.95);
}
.readout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
