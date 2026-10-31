<template>
  <div>
    <svg
      :aria-label="`กราฟทักษะ ${axes.length} ด้านของ${name} เทียบค่าเฉลี่ยระดับชั้น`"
      class="block h-auto w-full"
      role="img"
      viewBox="-4 50 328 202"
    >
      <polygon
        v-for="r in chart.rings"
        :key="r.v"
        :fill="r.v === 100 ? '#F3F8FD' : 'none'"
        :points="r.points"
        stroke="#DCE7F2"
      />
      <line
        v-for="(a, i) in chart.spokes"
        :key="i"
        :x1="CX"
        :x2="a[0]"
        :y1="CY"
        :y2="a[1]"
        stroke="#DCE7F2"
      />
      <polygon
        :points="chart.average"
        fill="none"
        stroke="#8A93B2"
        stroke-dasharray="5 4"
        stroke-width="1.6"
      />
      <polygon
        :points="chart.child"
        fill="rgba(18,161,80,.16)"
        stroke="#12A150"
        stroke-linejoin="round"
        stroke-width="2.2"
      />
      <circle
        v-for="(d, i) in chart.dots"
        :key="'d' + i"
        :cx="d[0]"
        :cy="d[1]"
        fill="#12A150"
        r="3.4"
        stroke="#fff"
        stroke-width="1.5"
      />
      <text
        v-for="l in chart.labels"
        :key="l.text"
        :text-anchor="l.anchor"
        :x="l.x"
        :y="l.y"
        class="font-condensed"
        fill="#3D4770"
        font-size="11"
      >
        {{ l.text }}
      </text>
    </svg>
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
// The skills radar from the Student Progress parent app: one child's scores against the
// class average, in the app's own colours. Used by the /results phone demo and the home
// page's progress card, both with the sample data in src/data/parentReport.js.

// geometry in the SVG's own units: centre, and the radius of a score of 100
const CX = 160
const CY = 150
const R = 70

export default {
  name: 'SkillRadar',
  props: {
    axes: { type: Array, required: true },
    child: { type: Array, required: true },
    average: { type: Array, required: true },
    // the child's name, for the legend and the chart's accessible label
    name: { type: String, required: true }
  },
  data() {
    return { CX, CY }
  },
  computed: {
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
      return {
        rings: [100, 90, 80, 70, 60].map((v) => ({ v, points: polygon(this.axes.map(() => v)) })),
        spokes: this.axes.map((_, i) => point(i, 100)),
        average: polygon(this.average),
        child: polygon(this.child),
        dots: this.child.map((v, i) => point(i, v)),
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
  }
}
</script>
