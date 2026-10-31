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
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div
            class="absolute -right-2 -top-3 h-14 w-14 rounded-lg bg-sun md:-right-4 md:-top-4 md:h-[72px] md:w-[72px]"
          ></div>
        </div>
      </div>

      <div
        v-if="program.stats"
        v-reveal="{ stagger: 70 }"
        class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-14 md:gap-5"
      >
        <BentoCard v-for="([value, label], i) in program.stats" :key="label" :tone="stat[i].tone">
          <span
            :class="stat[i].value"
            class="font-condensed text-[48px] font-bold leading-none md:text-[56px]"
            >{{ value }}</span
          >
          <span :class="stat[i].label" class="mt-auto pt-4 text-[15px] leading-[1.5]">{{
            label
          }}</span>
        </BentoCard>
      </div>
    </section>

    <section v-if="program.camp" class="wrap pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${program.camp.weeks.length} สัปดาห์`"
        :sub="program.camp.schedule"
        :title="program.camp.term"
        class="mb-6 md:mb-10"
        eyebrow="Next camp"
        icon="calendar"
        tone="sun"
      />
      <div v-reveal="{ stagger: 90 }" class="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
        <BentoCard class="lg:col-span-7" icon="route" title="ตารางค่าย">
          <ol class="relative flex flex-col gap-5">
            <span
              aria-hidden="true"
              class="absolute bottom-5 left-[17px] top-5 w-0.5 bg-sun/60"
            ></span>
            <li
              v-for="(week, i) in program.camp.weeks"
              :key="week.name"
              class="relative flex gap-4"
            >
              <span
                class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sun font-condensed text-sm font-bold text-ink ring-4 ring-white"
                >{{ i + 1 }}</span
              >
              <span class="flex min-w-0 flex-col gap-1">
                <span class="font-condensed text-sm font-semibold text-brand">{{
                  dateRange(week.start, week.end)
                }}</span>
                <b class="font-condensed text-xl font-bold leading-tight">{{ week.name }}</b>
                <span class="text-[15px] leading-[1.7] text-muted">{{ week.text }}</span>
              </span>
            </li>
          </ol>
        </BentoCard>
        <BentoCard class="lg:col-span-5" icon="wallet" title="ค่าค่าย" tone="sun">
          <p class="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span class="font-condensed text-[56px] font-bold leading-none md:text-[64px]">{{
              campPrice.value
            }}</span>
            <span class="text-base text-body">{{ campPrice.unit }}</span>
          </p>
          <span
            class="mt-auto self-start rounded-full bg-ink px-4 py-2 text-[14px] font-semibold text-sun md:mt-8"
            >{{ program.camp.bundleLabel }}</span
          >
        </BentoCard>
      </div>
    </section>

    <section
      v-for="(section, s) in program.sections"
      :key="section.heading"
      class="wrap pb-16 md:pb-[104px]"
    >
      <SectionHead
        v-reveal
        :icon="section.style === 'cards' ? 'sparkle' : 'checkCircle'"
        :title="section.heading"
        :tone="headTones[s % headTones.length]"
        class="mb-6 md:mb-10"
      />
      <div
        v-reveal="{ stagger: 80 }"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          v-for="([title, text], i) in section.items"
          :key="title"
          :class="spanFor(i, section.items.length)"
          :icon="section.style === 'cards' ? '' : 'checkCircle'"
          :sub="text"
          :title="title"
          :tone="toneFor(section.style, i)"
        >
          <span
            v-if="section.style === 'cards'"
            :class="numberTone[toneFor(section.style, i)]"
            class="mt-auto font-condensed text-[44px] font-bold leading-none md:text-[52px]"
            >0{{ i + 1 }}</span
          >
        </BentoCard>
      </div>
    </section>

    <section
      v-reveal="{ stagger: 90 }"
      class="wrap grid grid-cols-1 gap-4 pb-4 md:gap-5 md:pb-5 lg:grid-cols-12"
    >
      <BentoCard :level="2" class="lg:col-span-7" icon="help" title="คำถามที่พบบ่อย">
        <FaqList :key="program.slug" :faqs="program.faqs" heading="" />
      </BentoCard>
      <BentoCard class="lg:col-span-5" icon="sparkle" title="ดูเพิ่มเติม" tone="sage">
        <div class="flex flex-col gap-2.5">
          <router-link
            v-for="p in moreLinks"
            :key="p.path"
            :to="p.path"
            class="flex items-center justify-between gap-4 rounded-[20px] bg-white p-4 transition hover:-translate-y-0.5 md:px-5"
          >
            <span class="flex min-w-0 flex-col gap-0.5">
              <b class="text-[16px]">{{ p.label }}</b>
              <span class="text-sm text-muted">{{ p.card }}</span>
            </span>
            <span class="text-sagedeep">→</span>
          </router-link>
        </div>
      </BentoCard>
    </section>

    <section
      v-reveal="{ stagger: 90 }"
      class="wrap grid grid-cols-1 gap-4 pb-16 md:gap-5 md:pb-[104px] lg:grid-cols-12"
    >
      <BentoCard :lang="summaryLang" class="lg:col-span-7" tone="paper">
        <div class="flex flex-col gap-3">
          <span class="eyebrow">{{ summaryLang === 'en' ? 'In English' : 'สรุป' }}</span>
          <!-- Roboto Condensed has no Thai glyphs, so a Thai summary keeps the heading font -->
          <h2
            :class="
              summaryLang === 'en' ? 'font-condensed leading-tight' : 'font-display leading-[1.4]'
            "
            class="text-2xl font-bold md:text-[30px]"
          >
            {{ program.english.heading }}
          </h2>
          <p class="text-base leading-[1.75] text-body md:text-[17px]">
            {{ program.english.text }}
          </p>
        </div>
      </BentoCard>
      <BentoCard
        :level="2"
        :sub="program.cta.text"
        :title="program.cta.title"
        class="lg:col-span-5"
        icon="target"
        tone="sun"
      >
        <router-link
          class="mt-auto inline-flex h-14 items-center justify-center self-start whitespace-nowrap rounded-full bg-ink px-[30px] text-base font-semibold text-white transition-colors hover:bg-brand"
          to="/contact"
        >
          นัดวัดระดับฟรี →
        </router-link>
      </BentoCard>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import FaqList from '@/components/FaqList.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import SectionHead from '@/components/SectionHead.vue'
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

// Bento spans for a section's cards by how many there are, so every row fills: 7+5 pairs,
// 4+4+4 threes. An odd last card takes the full row on the two-column tablet grid.
const SPANS = {
  2: ['lg:col-span-7', 'lg:col-span-5'],
  3: ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'],
  4: ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'],
  5: ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']
}
function spanFor(i, count) {
  const span = SPANS[count]?.[i] ?? 'lg:col-span-6'
  return count % 2 && i === count - 1 ? `${span} md:col-span-2` : span
}

// numbered "cards" sections: one dark and one tinted card per pair; "points" sections lead
// with a sage card
const CARD_TONES = ['ink', 'white', 'white', 'sun']
const toneFor = (style, i) =>
  style === 'cards' ? CARD_TONES[i % CARD_TONES.length] : i === 0 ? 'sage' : 'white'

const STAT = [
  { tone: 'ink', value: 'text-sun', label: 'text-cream/70' },
  { tone: 'sun', value: 'text-ink', label: 'text-body' },
  { tone: 'white', value: 'text-brand', label: 'text-muted' }
]

export default {
  name: 'ProgramView',
  components: { BentoCard, FaqList, PhotoBox, SectionHead },
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
    const moreLinks = computed(() => [
      ...others.value,
      { path: '/courses', label: 'หลักสูตรทั้งหมด', card: 'คอร์สเรียนภาษาอังกฤษตามช่วงวัย' }
    ])
    // "1,900 บาท / สัปดาห์" → a big "1,900" and its unit; the digits are grouped by hand so
    // the pre-rendered page and the browser print the same text
    const campPrice = computed(() => {
      const camp = program.value.camp
      if (!camp) return null
      return {
        value: String(camp.price).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        unit: camp.priceLabel.replace(/^[\d,]+\s*/, '')
      }
    })
    return {
      program,
      photoFor,
      photoIndex,
      moreLinks,
      summaryLang,
      campPrice,
      contact,
      dateRange,
      spanFor,
      toneFor,
      stat: STAT,
      headTones: ['brand', 'sun', 'sage', 'peach'],
      numberTone: { ink: 'text-sun', sun: 'text-ink', white: 'text-brand' }
    }
  }
}
</script>
