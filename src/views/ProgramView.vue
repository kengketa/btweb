<template>
  <main>
    <section class="wrap pb-12 pt-12 md:pb-16 md:pt-[88px]">
      <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div class="flex flex-col gap-4 md:gap-5">
          <span class="eyebrow">{{ program.eyebrow }}</span>
          <h1
            class="font-display text-[34px] font-bold leading-[1.4] md:text-5xl md:leading-[1.35] xl:text-[56px]"
            style="text-wrap: balance"
          >
            {{ program.title.lead }}<span class="text-brand">{{ program.title.highlight }}</span
            >{{ ' ' }}{{ program.title.tail }}
          </h1>
          <p class="max-w-[560px] text-base leading-[1.8] text-muted md:text-[17px]">
            {{ program.intro }}
          </p>
          <div class="flex flex-wrap items-center gap-3.5 pt-1">
            <router-link class="btn-primary h-14 px-[30px] text-[17px]" to="/contact">
              นัดวัดระดับฟรี <span>→</span>
            </router-link>
            <a :href="contact.tel" class="btn-outline h-14 px-7 text-[17px]"
              >โทร {{ contact.phone }}</a
            >
          </div>
        </div>
        <div class="relative">
          <PhotoBox
            :alt="program.label"
            :src="program.photo || photoFor(program.photoKeyword, photoIndex)"
            class="h-[260px] rounded-3xl md:h-[400px] md:rounded-[28px]"
          />
          <div
            class="absolute -right-2 -top-3 h-14 w-14 rounded-lg bg-sun md:-right-4 md:-top-4 md:h-[72px] md:w-[72px]"
          ></div>
        </div>
      </div>

      <div v-if="program.stats" class="mt-12 grid gap-8 sm:grid-cols-3 md:mt-16 lg:gap-10">
        <div
          v-for="[value, label] in program.stats"
          :key="label"
          class="flex items-baseline gap-3 border-t-2 border-ink pt-5"
        >
          <span
            class="font-condensed text-[44px] font-bold leading-none text-brand md:text-[56px]"
            >{{ value }}</span
          >
          <span class="text-[15px] leading-[1.5] text-muted">{{ label }}</span>
        </div>
      </div>
    </section>

    <section v-if="program.camp" class="bg-white py-16 md:py-[88px]">
      <div class="wrap flex flex-col gap-8">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div class="flex flex-col gap-2">
            <span class="eyebrow">Next camp</span>
            <h2 class="font-display text-2xl font-bold leading-[1.4] md:text-[36px]">
              {{ program.camp.term }}
            </h2>
          </div>
          <div class="flex flex-wrap gap-2.5 text-[15px]">
            <span class="rounded-full bg-cream px-4 py-2">{{ program.camp.schedule }}</span>
            <span class="rounded-full bg-sun px-4 py-2 font-semibold">{{
              program.camp.priceLabel
            }}</span>
            <span class="rounded-full bg-brand px-4 py-2 font-semibold text-white">{{
              program.camp.bundleLabel
            }}</span>
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-3 md:gap-4">
          <div
            v-for="week in program.camp.weeks"
            :key="week.name"
            class="flex flex-col gap-3 rounded-[20px] bg-cream p-6 md:p-7"
          >
            <span class="font-condensed text-sm font-semibold text-brand">{{
              dateRange(week.start, week.end)
            }}</span>
            <b class="font-condensed text-[22px] font-bold leading-tight">{{ week.name }}</b>
            <span class="text-[15px] leading-[1.7] text-muted">{{ week.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <section
      v-for="(section, s) in program.sections"
      :key="section.heading"
      :class="s === 0 ? 'pt-16 md:pt-[88px]' : ''"
      class="wrap pb-16 md:pb-[88px]"
    >
      <h2 class="mb-7 font-display text-[26px] font-bold leading-[1.4] md:mb-9 md:text-[36px]">
        {{ section.heading }}
      </h2>
      <div
        v-if="section.style === 'cards'"
        :class="section.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        class="grid gap-3 rounded-[10px] bg-brand p-3 md:gap-4 md:p-4"
      >
        <div
          v-for="([title, text], i) in section.items"
          :key="title"
          class="flex flex-col gap-3 rounded bg-cream p-6 md:p-8"
        >
          <span class="font-condensed text-[13px] font-medium text-brand">0{{ i + 1 }}</span>
          <b class="text-xl md:text-[22px]">{{ title }}</b>
          <span class="text-[15px] leading-[1.7] text-muted">{{ text }}</span>
        </div>
      </div>
      <div v-else class="grid gap-x-10 gap-y-5 md:grid-cols-2">
        <div v-for="[title, text] in section.items" :key="title" class="flex items-start gap-3.5">
          <span class="mt-2 h-3 w-3 flex-none rounded-sm bg-sun"></span>
          <span class="text-base leading-[1.75]"
            ><b>{{ title }}</b> — {{ text }}</span
          >
        </div>
      </div>
    </section>

    <section class="wrap pb-16 md:pb-[88px]">
      <div
        class="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6 md:rounded-[28px] md:p-10"
        :lang="summaryLang"
      >
        <span class="eyebrow">{{ summaryLang === 'en' ? 'In English' : 'สรุป' }}</span>
        <!-- Roboto Condensed has no Thai glyphs, so a Thai summary keeps the heading font -->
        <h2
          :class="
            summaryLang === 'en' ? 'font-condensed leading-tight' : 'font-display leading-[1.4]'
          "
          class="text-2xl font-bold md:text-[32px]"
        >
          {{ program.english.heading }}
        </h2>
        <p class="max-w-[820px] text-base leading-[1.75] text-body md:text-[17px]">
          {{ program.english.text }}
        </p>
      </div>
    </section>

    <section class="wrap grid gap-12 pb-16 md:pb-[88px] lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <FaqList :faqs="program.faqs" />
      <div class="flex flex-col gap-3 self-start">
        <b class="font-display text-lg font-bold">ดูเพิ่มเติม</b>
        <router-link
          v-for="p in others"
          :key="p.slug"
          :to="p.path"
          class="flex items-center justify-between gap-4 rounded-[20px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink"
        >
          <span class="flex flex-col gap-1">
            <b class="text-[17px]">{{ p.label }}</b>
            <span class="text-sm text-muted">{{ p.card }}</span>
          </span>
          <span class="text-brand">→</span>
        </router-link>
        <router-link
          class="flex items-center justify-between gap-4 rounded-[20px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink"
          to="/courses"
        >
          <span class="flex flex-col gap-1">
            <b class="text-[17px]">หลักสูตรทั้งหมด</b>
            <span class="text-sm text-muted">คอร์สเรียนภาษาอังกฤษตามช่วงวัย</span>
          </span>
          <span class="text-brand">→</span>
        </router-link>
      </div>
    </section>

    <section class="wrap pb-16 md:pb-[104px]">
      <div
        class="flex flex-col justify-between gap-4 rounded-[22px] bg-sun p-6 md:flex-row md:items-center md:gap-8 md:rounded-[28px] md:px-12 md:py-11"
      >
        <div class="flex flex-col gap-2">
          <b class="font-display text-xl font-bold md:text-[30px]">{{ program.cta.title }}</b>
          <span class="text-[15px] md:text-base">{{ program.cta.text }}</span>
        </div>
        <router-link
          class="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:h-14 md:text-base"
          to="/contact"
        >
          นัดวัดระดับฟรี →
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import FaqList from '@/components/FaqList.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import { useFeed } from '@/composables/useFeed'
import { contact } from '@/data/site'
import { programBySlug, programs } from '@/data/programs'
import { jsonLd, programSchema } from '@/data/schema'

const MONTHS = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.'
]

// "2026-10-12", "2026-10-15" → "12–15 ต.ค. 2569". Formatted by hand, not toLocaleDateString,
// so the pre-rendered page and the browser always produce the same text.
function dateRange(start, end) {
  const [y1, m1, d1] = start.split('-').map(Number)
  const [y2, m2, d2] = end.split('-').map(Number)
  const tail = (m, y) => `${MONTHS[m - 1]} ${y + 543}`
  if (y1 === y2 && m1 === m2) return `${d1}–${d2} ${tail(m2, y2)}`
  return `${d1} ${tail(m1, y1)} – ${d2} ${tail(m2, y2)}`
}

export default {
  name: 'ProgramView',
  components: { FaqList, PhotoBox },
  props: {
    slug: { type: String, required: true }
  },
  setup(props) {
    const program = computed(() => programBySlug[props.slug])
    useHead({
      title: computed(() => program.value.meta.title),
      meta: [{ name: 'description', content: computed(() => program.value.meta.description) }],
      script: computed(() => [jsonLd(programSchema(program.value))])
    })
    const { photoFor } = useFeed()
    const photoIndex = computed(() => programs.indexOf(program.value) * 4 + 1)
    const others = computed(() => programs.filter((p) => p !== program.value))
    const summaryLang = computed(() => program.value.english.lang || 'en')
    return { program, photoFor, photoIndex, others, summaryLang, contact, dateRange }
  }
}
</script>
