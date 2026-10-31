<template>
  <main>
    <section class="relative overflow-hidden px-5 pb-12 pt-14 md:pb-16 md:pt-20">
      <div
        class="pointer-events-none absolute -top-[300px] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,182,63,.26)_0%,rgba(244,182,63,.05)_55%,rgba(244,182,63,0)_72%)]"
      ></div>
      <div class="relative mx-auto max-w-[820px] text-center">
        <span
          class="mb-6 inline-flex rounded-full border border-[#F2CFCF] bg-blush px-4 py-[7px] text-sm font-semibold text-brand-deep"
          >IELTS · Oxford CEFR · ผลสอบจริงของนักเรียนไบรท์ตัน</span
        >
        <h1
          class="mb-5 font-display text-[48px] font-extrabold leading-[1.05] tracking-[-.02em] md:text-[84px]"
        >
          Hall of <span class="text-brand">Fame</span>
        </h1>
        <p
          class="mx-auto max-w-[600px] text-[17px] leading-[1.7] text-muted md:text-[19px]"
          style="text-wrap: pretty"
        >
          ภูมิใจกับทุกความสำเร็จของนักเรียน — ผลจากความตั้งใจ การฝึกฝนอย่างต่อเนื่อง
          และความมั่นใจที่เติบโตขึ้นทุกวัน
        </p>
      </div>
    </section>

    <!-- IELTS: the report and the band scale, then one card per student -->
    <section class="wrap pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${ieltsStudents.length} คน`"
        class="mb-5 md:mb-10"
        eyebrow="IELTS Academic"
        icon="trophy"
        sub="ผลสอบ IELTS Academic ของนักเรียนไบรท์ตันอยู่ในระดับ CEFR C1 — ระดับที่มหาวิทยาลัยชั้นนำทั่วโลกใช้เป็นเกณฑ์รับเข้าศึกษา"
        title="พร้อมเรียนต่อระดับนานาชาติ"
        tone="brand"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard class="lg:col-span-5" tone="blush">
          <figure
            class="relative mx-auto flex w-full max-w-[340px] flex-1 items-center justify-center px-3 pb-8 pt-2"
          >
            <div
              class="absolute inset-[6%_14%_12%_4%] -rotate-[5deg] rounded-[10px] bg-white/70 shadow-[0_14px_30px_rgba(33,26,23,.1)]"
            ></div>
            <a
              :href="ieltsReport"
              class="relative block w-full rotate-[2.5deg] rounded-[10px] bg-white p-2.5 shadow-[0_26px_50px_rgba(33,26,23,.22)] transition-transform hover:rotate-0 hover:scale-[1.02]"
              rel="noopener"
              target="_blank"
            >
              <img
                :src="ieltsReport"
                alt="ใบรายงานผล IELTS Academic ของนักเรียนไบรท์ตัน"
                class="block h-auto w-full rounded"
                height="1140"
                loading="lazy"
                width="802"
              />
            </a>
            <figcaption
              class="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_8px_20px_rgba(33,26,23,.25)]"
            >
              ใบรายงานผลจริงจาก IELTS
            </figcaption>
          </figure>
        </BentoCard>

        <BentoCard
          :level="3"
          class="lg:col-span-7"
          icon="chart"
          sub="BRITISH COUNCIL · IDP · CAMBRIDGE"
          title="IELTS band score · เทียบระดับ CEFR"
        >
          <div class="grid grid-cols-4 gap-1 text-center">
            <div v-for="(b, i) in ieltsScale" :key="b.cefr">
              <div
                :class="b.on ? 'font-bold text-brand' : 'font-medium text-muted'"
                class="mb-[5px] text-[11px] md:text-[12.5px]"
              >
                {{ b.band }}
              </div>
              <div
                :class="[
                  b.on
                    ? 'bg-brand text-white shadow-[0_6px_14px_rgba(190,30,45,.35)]'
                    : 'bg-paper text-muted',
                  scaleCorners(i, ieltsScale.length)
                ]"
                class="px-1 py-2.5 font-condensed text-[17px] font-bold"
              >
                {{ b.cefr }}
              </div>
            </div>
          </div>
          <!-- reading the scores -->
          <div class="mt-7 grid gap-5 border-t border-line pt-6 sm:grid-cols-2 sm:gap-7">
            <div v-for="r in ieltsReading" :key="r.title" class="flex flex-col gap-1.5">
              <span
                class="font-condensed text-[13px] font-bold uppercase tracking-[.16em] text-brand"
                >{{ r.eyebrow }}</span
              >
              <h3 class="font-display text-xl font-bold leading-[1.35]">{{ r.title }}</h3>
              <p class="text-[15px] leading-[1.7] text-muted">{{ r.text }}</p>
            </div>
          </div>
        </BentoCard>

        <BentoCard
          v-for="(s, i) in ieltsStudents"
          :key="s.name"
          :class="studentSpans[i % studentSpans.length]"
          :tone="i === 0 ? 'brand' : 'white'"
        >
          <article class="flex flex-1 flex-col gap-5 md:gap-6">
            <div
              class="grid grid-cols-[60px_minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[84px_minmax(0,1fr)_auto] md:gap-5"
            >
              <div
                :aria-label="s.name"
                :style="s.photo ? { backgroundImage: `url('${s.photo}')` } : null"
                class="grid aspect-square place-items-center rounded-2xl border-[3px] border-sun bg-blush bg-cover bg-center font-display text-2xl font-bold text-brand md:rounded-[20px] md:text-[32px]"
                role="img"
              >
                {{ s.photo ? '' : s.initials }}
              </div>
              <div class="min-w-0">
                <div
                  :class="i === 0 ? 'text-white/75' : 'text-muted'"
                  class="mb-1 text-[11px] font-semibold uppercase tracking-[.1em] md:text-[12.5px]"
                >
                  {{ s.testDate }}
                </div>
                <h3 class="mb-0.5 font-display text-lg font-bold leading-[1.2] md:text-[22px]">
                  {{ s.first }}
                </h3>
                <div
                  :class="i === 0 ? 'text-white/80' : 'text-muted'"
                  class="text-[13px] [overflow-wrap:anywhere] md:text-[15px]"
                >
                  {{ s.last }}
                </div>
              </div>
              <div
                class="min-w-[62px] rounded-2xl bg-sun px-2 pb-2 pt-2.5 text-center text-ink md:min-w-[84px] md:rounded-[20px] md:px-3.5"
              >
                <div class="font-condensed text-[30px] font-bold leading-none md:text-[44px]">
                  {{ s.overall }}
                </div>
                <div class="mt-1 text-[10px] font-bold tracking-[.06em] md:text-xs">OVERALL</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div
                v-for="k in s.skills"
                :key="k.label"
                :class="i === 0 ? 'border-white/15 bg-white/10' : 'border-line bg-cream'"
                class="rounded-2xl border px-3 pb-3 pt-3"
              >
                <div :class="i === 0 ? 'text-white/75' : 'text-muted'" class="mb-1.5 text-[12.5px]">
                  {{ k.label }}
                </div>
                <div
                  :class="i === 0 ? 'text-sun' : 'text-brand'"
                  class="mb-2.5 font-condensed text-[28px] font-bold leading-none"
                >
                  {{ k.score }}
                </div>
                <div
                  :class="i === 0 ? 'bg-white/20' : 'bg-line'"
                  class="h-1.5 overflow-hidden rounded-md"
                >
                  <div
                    :class="k.top ? 'bg-sun' : i === 0 ? 'bg-white' : 'bg-brand'"
                    :style="{ width: k.pct }"
                    class="h-full rounded-md"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mt-auto flex flex-wrap items-center gap-2 text-[13.5px] font-semibold">
              <span
                v-for="pill in [`CEFR ${s.cefr}`, 'Academic']"
                :key="pill"
                :class="i === 0 ? 'bg-white/15 text-white' : 'bg-blush text-brand'"
                class="rounded-full px-3 py-1.5"
                >{{ pill }}</span
              >
            </div>
          </article>
        </BentoCard>

        <!-- one student from Oxford to IELTS -->
        <BentoCard
          sub="เติบโตไปกับไบรท์ตัน จากเด็กประถมสู่ผลสอบ IELTS ระดับ C1"
          :title="journey.name"
          class="md:col-span-2 lg:col-span-7"
          icon="route"
          tag="Brighton Journey"
          tone="ink"
        >
          <div class="mt-auto flex flex-wrap items-center gap-3 md:gap-5">
            <div
              :style="{ backgroundImage: `url('${journey.photo}')` }"
              aria-hidden="true"
              class="h-20 w-20 flex-none rounded-[20px] border-[3px] border-sun bg-cover bg-center md:h-24 md:w-24 md:rounded-[22px]"
            ></div>
            <div class="flex items-center gap-3">
              <div
                class="rounded-[18px] border border-cream/15 bg-cream/[.08] px-4 py-3 text-center"
              >
                <div class="mb-1 text-[13px] text-cream/60">{{ journey.from.label }}</div>
                <div class="font-condensed text-4xl font-bold leading-none text-cream">
                  {{ journey.from.score }}
                </div>
              </div>
              <span class="text-[26px] text-sun">→</span>
              <div class="rounded-[18px] bg-sun px-4 py-3 text-center text-ink">
                <div class="mb-1 text-[13px]">{{ journey.to.label }}</div>
                <div class="font-condensed text-4xl font-bold leading-none">
                  {{ journey.to.score }}
                </div>
              </div>
            </div>
          </div>
          <template #foot
            >ห้าปีจากผลสอบ Oxford Young Learners สู่ Overall Band 7.5 —
            ทักษะที่สร้างอย่างต่อเนื่องตั้งแต่วัยเด็ก</template
          >
        </BentoCard>
      </div>
    </section>

    <!-- Oxford Placement Test -->
    <section class="wrap pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${oxfordStudents.length} คน`"
        class="mb-5 md:mb-10"
        eyebrow="Oxford Placement Test for Young Learners"
        icon="book"
        sub="นักเรียนระดับประถมศึกษาของไบรท์ตันทุกคนในรายชื่อนี้ สอบได้ระดับ B1 ขึ้นไป — เทียบเท่าเป้าหมายของนักเรียนจบ ม.6 ตามกรอบ CEFR ของกระทรวงศึกษาธิการ"
        title="วัดระดับมาตรฐาน CEFR กับ Oxford"
        tone="sage"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          :class="oxfordReport ? 'lg:col-span-7' : 'md:col-span-2 lg:col-span-12'"
          icon="chart"
          sub="OXFORD UNIVERSITY PRESS"
          title="Score guide · Oxford Placement Test"
          tone="sage"
        >
          <div class="mt-auto rounded-[20px] bg-white p-4 md:p-5">
            <div class="grid grid-cols-4 gap-1 text-center">
              <div v-for="(b, i) in oxfordScale" :key="b.cefr">
                <div
                  :class="b.on ? 'font-bold text-sagedeep' : 'font-medium text-muted'"
                  class="mb-[5px] text-[11px] md:text-[12.5px]"
                >
                  {{ b.band }}
                </div>
                <div
                  :class="[
                    b.on
                      ? 'bg-sagedeep text-white shadow-[0_6px_14px_rgba(63,107,74,.35)]'
                      : `${b.bg} text-muted`,
                    scaleCorners(i, oxfordScale.length)
                  ]"
                  class="px-1 py-2.5 font-condensed text-[15px] font-bold md:text-[17px]"
                >
                  {{ b.cefr }}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard v-if="oxfordReport" class="lg:col-span-5">
          <figure
            class="relative mx-auto flex w-full max-w-[250px] flex-1 items-center justify-center px-3 pb-8 pt-2"
          >
            <div
              class="absolute inset-[6%_4%_12%_14%] rotate-[5deg] rounded-[10px] bg-sage shadow-[0_14px_30px_rgba(33,26,23,.08)]"
            ></div>
            <a
              :href="oxfordReport"
              class="relative block w-full -rotate-[2.5deg] rounded-[10px] bg-white p-2.5 shadow-[0_26px_50px_rgba(33,26,23,.2)] transition-transform hover:rotate-0 hover:scale-[1.02]"
              rel="noopener"
              target="_blank"
            >
              <img
                :src="oxfordReport"
                alt="ใบรายงานผล Oxford Placement Test for Young Learners ของนักเรียนไบรท์ตัน"
                class="block h-auto w-full rounded"
                height="1314"
                loading="lazy"
                width="918"
              />
            </a>
            <figcaption
              class="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sagedeep px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_8px_20px_rgba(33,26,23,.25)]"
            >
              ใบรายงานผลจริงจาก Oxford
            </figcaption>
          </figure>
        </BentoCard>

        <BentoCard class="md:col-span-2 lg:col-span-12">
          <div class="grid gap-3 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
            <div
              v-for="o in oxfordStudents"
              :key="o.first + o.last"
              :class="o.top ? 'border-[#F1DFAE] bg-sunsoft' : 'border-line bg-cream'"
              class="flex items-center gap-3.5 rounded-[20px] border px-4 py-3.5"
            >
              <div
                :class="o.top ? 'bg-sun text-ink' : 'bg-sagedeep text-white'"
                class="grid h-[54px] w-[54px] flex-none place-items-center rounded-[16px] font-condensed text-[22px] font-bold"
              >
                {{ o.cefr }}
              </div>
              <div class="min-w-0">
                <div class="text-[16px] font-medium leading-[1.3]">{{ o.first }}</div>
                <div class="text-[13.5px] leading-[1.4] text-muted [overflow-wrap:anywhere]">
                  {{ o.last }}
                </div>
                <div v-if="o.testDate" class="mt-[3px] text-[12.5px] text-muted/80">
                  {{ o.testDate }}
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>

    <section
      v-reveal="{ stagger: 90 }"
      class="wrap grid grid-cols-1 gap-3 pb-16 md:gap-5 md:pb-[104px] lg:grid-cols-12"
    >
      <BentoCard class="lg:col-span-7" tone="ink">
        <div class="flex flex-1 flex-col gap-4">
          <h2
            class="font-display text-[28px] font-bold leading-[1.3] text-cream md:text-[40px]"
            style="text-wrap: balance"
          >
            คนต่อไปใน Hall of Fame<br />อาจเป็นลูกของคุณ
          </h2>
          <p class="max-w-[520px] text-base leading-[1.7] text-cream/70 md:text-[17px]">
            ปรึกษาเส้นทางการเรียนภาษาอังกฤษตั้งแต่พื้นฐานจนถึงเป้าหมาย IELTS กับทีมไบรท์ตัน
          </p>
          <router-link
            class="mt-auto inline-flex h-14 items-center self-start whitespace-nowrap rounded-full bg-sun px-7 text-[17px] font-bold text-ink transition-colors hover:bg-[#F6C55E]"
            to="/contact"
          >
            นัดวัดระดับฟรี →
          </router-link>
        </div>
        <template #foot>คะแนน IELTS ตรวจสอบได้ที่ ielts.org/verify</template>
      </BentoCard>
      <BentoCard
        :sub="contact.hours"
        class="lg:col-span-5"
        icon="phone"
        title="โทรหาเรา"
        tone="sun"
      >
        <a
          :href="contact.tel"
          class="mt-auto whitespace-nowrap font-condensed text-[40px] font-bold leading-none hover:text-brand md:text-[48px]"
          >{{ contact.phone }}</a
        >
        <a
          :href="contact.facebook"
          class="mt-4 font-semibold hover:underline"
          rel="noopener"
          target="_blank"
          >{{ contact.facebookName }} บน Facebook →</a
        >
      </BentoCard>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import SectionHead from '@/components/SectionHead.vue'
import { contact } from '@/data/site'
import {
  ieltsReport,
  ieltsStudents,
  journey,
  oxfordReport,
  oxfordStudents
} from '@/data/hallOfFame'

export default {
  name: 'HallOfFameView',
  components: { BentoCard, SectionHead },
  setup() {
    useHead({
      title: 'Hall of Fame ผลสอบ IELTS และ Oxford - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'ผลสอบจริงของนักเรียนไบรท์ตัน พะเยา: IELTS Academic Overall 7.0–7.5 ระดับ CEFR C1 และ Oxford Placement Test for Young Learners ระดับ B1 ขึ้นไป'
        }
      ]
    })
  },
  data() {
    return {
      contact,
      ieltsReport,
      ieltsStudents,
      journey,
      oxfordReport,
      oxfordStudents,
      ieltsScale: [
        { band: 'Band 4.0–5.0', cefr: 'B1' },
        { band: 'Band 5.5–6.5', cefr: 'B2' },
        { band: 'Band 7.0–8.0 ★', cefr: 'C1', on: true },
        { band: 'Band 8.5–9.0', cefr: 'C2' }
      ],
      // the top student spans the wide brand card; the next two share a row with the journey
      studentSpans: [
        'md:col-span-2 lg:col-span-7',
        'lg:col-span-5',
        'lg:col-span-5',
        'lg:col-span-7'
      ],
      ieltsReading: [
        {
          eyebrow: 'อ่านผลคะแนน',
          title: 'CEFR C1 คืออะไร?',
          text: 'ระดับ C1 คือผู้ใช้ภาษาอังกฤษในระดับ “เชี่ยวชาญ” เข้าใจเนื้อหาซับซ้อน สื่อสารได้คล่องและเป็นธรรมชาติ — เพียงพอสำหรับการเรียนต่อมหาวิทยาลัยชั้นนำในต่างประเทศ'
        },
        {
          eyebrow: 'คะแนนเต็ม 9.0',
          title: 'Band 7.0 ขึ้นไป',
          text: 'เป็นเกณฑ์ที่มหาวิทยาลัยส่วนใหญ่ในสหราชอาณาจักร ออสเตรเลีย และหลักสูตรนานาชาติในไทยใช้รับเข้าศึกษา'
        }
      ],
      oxfordScale: [
        { band: 'Countdown', cefr: 'Pre-A1', bg: 'bg-peach' },
        { band: 'Lift off', cefr: 'A1', bg: 'bg-sunsoft' },
        { band: 'Zoom', cefr: 'A2', bg: 'bg-sage' },
        { band: 'Orbit ★', cefr: 'B1', on: true }
      ]
    }
  },
  methods: {
    // the scale reads as one bar: round only its outer ends
    scaleCorners(i, count) {
      if (i === 0) return 'rounded-[10px_4px_4px_10px]'
      if (i === count - 1) return 'rounded-[4px_10px_10px_4px]'
      return 'rounded'
    }
  }
}
</script>
