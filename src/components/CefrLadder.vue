<template>
  <div class="flex flex-1 flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8">
    <div class="flex flex-col justify-end gap-2 sm:w-[200px] sm:flex-none">
      <span class="flex items-center gap-2 text-[13px] text-muted">
        <span class="h-2 w-2 rounded-full bg-sun"></span>ระดับ CEFR
      </span>
      <span class="font-condensed text-[56px] font-bold leading-none md:text-[64px]">{{
        levels[shown][0]
      }}</span>
      <span class="min-h-[3.2em] text-sm leading-[1.6] text-body">{{ levels[shown][1] }}</span>
      <span
        :class="state(shown).pill"
        class="self-start rounded-full px-3 py-1 text-[13px] font-semibold leading-5"
        >{{ state(shown).label }}</span
      >
    </div>

    <div class="flex flex-1 flex-col gap-2.5">
      <div
        class="flex h-40 items-stretch gap-1.5 sm:h-44 sm:gap-2"
        role="group"
        aria-label="ระดับ CEFR"
      >
        <button
          v-for="([code], i) in levels"
          :key="code"
          :aria-label="`${code}: ${levels[i][1]}`"
          :aria-pressed="shown === i"
          :class="shown === i && 'ring-2 ring-ink/70 ring-offset-2'"
          class="relative flex flex-1 flex-col justify-end overflow-hidden rounded-xl bg-cream outline-none transition focus-visible:ring-2 focus-visible:ring-brand"
          type="button"
          @click="picked = i"
          @mouseenter="picked = i"
        >
          <span
            :class="state(i).bar"
            :style="{ height: `${22 + i * 15.5}%` }"
            class="relative w-full rounded-xl transition-colors"
          >
            <span
              v-if="i === current"
              class="absolute left-1/2 top-2.5 h-2 w-2 -translate-x-1/2 rounded-full bg-sun"
            ></span>
          </span>
        </button>
      </div>
      <div class="flex gap-1.5 sm:gap-2">
        <span
          v-for="([code], i) in levels"
          :key="code"
          :class="shown === i ? 'font-semibold text-ink' : 'text-muted'"
          class="flex-1 text-center font-condensed text-[13px]"
          >{{ code }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
// The CEFR scale as bars, with one sample learner's place on it (labelled as a sample by
// the card around it). Tap or hover a bar to read what that level means.
const LEVELS = [
  ['Pre-A1', 'รู้จักคำศัพท์ใกล้ตัว และตอบคำถามง่ายๆ ได้'],
  ['A1', 'แนะนำตัว ถาม–ตอบเรื่องใกล้ตัวด้วยประโยคสั้นๆ'],
  ['A2', 'เล่าเรื่องในชีวิตประจำวัน อ่านข้อความสั้นๆ เข้าใจ'],
  ['B1', 'สื่อสารเรื่องที่คุ้นเคยได้คล่อง เล่าประสบการณ์ของตัวเองได้'],
  ['B2', 'แสดงความคิดเห็นและอภิปราย อ่านบทความที่ยาวขึ้นได้'],
  ['C1', 'ใช้ภาษาได้คล่องทั้งในการเรียนต่อและการทำงาน']
]

export default {
  name: 'CefrLadder',
  props: {
    // the sample learner's current level (index into the scale)
    current: { type: Number, default: 1 }
  },
  data() {
    return { levels: LEVELS, picked: null }
  },
  computed: {
    shown() {
      return this.picked ?? this.current
    }
  },
  methods: {
    state(i) {
      if (i < this.current)
        return { bar: 'bg-sun/45', pill: 'bg-paper text-body', label: 'ผ่านแล้ว' }
      if (i === this.current)
        return { bar: 'bg-ink', pill: 'bg-ink text-cream', label: 'ระดับตอนนี้' }
      if (i === this.current + 1)
        return { bar: 'bg-sun', pill: 'bg-sun text-ink', label: 'เป้าหมายถัดไป' }
      return { bar: 'bg-paper', pill: 'bg-paper text-muted', label: 'ระดับถัดๆ ไป' }
    }
  }
}
</script>
