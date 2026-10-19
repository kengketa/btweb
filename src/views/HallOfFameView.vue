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

    <!-- IELTS -->
    <section class="wrap pb-10">
      <div
        class="relative overflow-hidden rounded-[28px] bg-blush px-3.5 pb-4 pt-10 md:rounded-[32px] md:px-11 md:pb-11 md:pt-12"
      >
        <div class="absolute inset-x-0 top-0 h-2 bg-brand"></div>
        <div class="mb-11 grid items-center gap-14 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <figure class="relative flex justify-center">
            <div
              class="absolute inset-[8%_14%_4%_4%] -rotate-[5deg] rounded-[10px] bg-white shadow-[0_14px_30px_rgba(33,26,23,.1)]"
            ></div>
            <a
              :href="ieltsReport"
              class="relative block w-full max-w-[380px] rotate-[2.5deg] rounded-[10px] bg-white p-2.5 shadow-[0_26px_50px_rgba(33,26,23,.22)] transition-transform hover:rotate-0 hover:scale-[1.02]"
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
              class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_8px_20px_rgba(33,26,23,.25)]"
            >
              ใบรายงานผลจริงจาก IELTS
            </figcaption>
          </figure>
          <div>
            <span
              class="mb-[18px] inline-flex rounded-full border border-[#F2CFCF] bg-white px-3.5 py-[7px] font-condensed text-xs font-bold tracking-[.16em] md:text-sm"
              >BRITISH COUNCIL · IDP · CAMBRIDGE</span
            >
            <div
              class="mb-2.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
            >
              IELTS Academic
            </div>
            <h2 class="mb-3.5 font-display text-[28px] font-bold leading-[1.2] md:text-[40px]">
              พร้อมเรียนต่อระดับนานาชาติ
            </h2>
            <p class="mb-7 text-[17px] leading-[1.7] text-muted" style="text-wrap: pretty">
              ผลสอบ IELTS Academic ของนักเรียนไบรท์ตันอยู่ในระดับ CEFR C1 —
              ระดับที่มหาวิทยาลัยชั้นนำทั่วโลกใช้เป็นเกณฑ์รับเข้าศึกษา
            </p>
            <div class="rounded-[18px] border border-[#F2CFCF] bg-white px-[18px] pb-3.5 pt-[18px]">
              <div class="mb-2.5 text-[13px] text-muted">IELTS band score · เทียบระดับ CEFR</div>
              <div class="grid grid-cols-4 gap-1 text-center">
                <div v-for="(b, i) in ieltsScale" :key="b.cefr">
                  <div
                    :class="b.on ? 'font-bold text-brand' : 'font-medium text-[#7A706B]'"
                    class="mb-[5px] text-[11px] md:text-[12.5px]"
                  >
                    {{ b.band }}
                  </div>
                  <div
                    :class="[
                      b.on
                        ? 'bg-brand text-white shadow-[0_6px_14px_rgba(190,30,45,.35)]'
                        : 'bg-[#F4EDE6] text-[#7A706B]',
                      scaleCorners(i, ieltsScale.length)
                    ]"
                    class="px-1 py-2.5 font-condensed text-[17px] font-bold"
                  >
                    {{ b.cefr }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="s in ieltsStudents"
            :key="s.name"
            class="flex flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_18px_44px_rgba(33,26,23,.08)]"
          >
            <div
              class="relative grid grid-cols-[60px_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden bg-brand p-4 md:grid-cols-[112px_minmax(0,1fr)_auto] md:gap-[22px] md:px-[30px] md:py-7"
            >
              <div
                class="absolute -right-[60px] -top-20 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(244,182,63,.35),rgba(244,182,63,0)_70%)]"
              ></div>
              <div
                :aria-label="s.name"
                :style="s.photo ? { backgroundImage: `url('${s.photo}')` } : null"
                class="relative grid aspect-square place-items-center rounded-2xl border-[3px] border-sun bg-[#FBE9EA] bg-cover bg-center font-display text-2xl font-bold text-brand md:rounded-[22px] md:text-[38px]"
                role="img"
              >
                {{ s.photo ? '' : s.initials }}
              </div>
              <div class="relative min-w-0">
                <div
                  class="mb-1.5 text-[11px] font-semibold uppercase tracking-[.1em] text-[#F6CDD1] md:text-[13px]"
                >
                  {{ s.testDate }}
                </div>
                <h3
                  class="mb-1 font-display text-lg font-bold leading-[1.2] text-cream md:text-2xl"
                >
                  {{ s.first }}
                </h3>
                <div class="text-[13px] text-[#FBE9EA] [overflow-wrap:anywhere] md:text-[15px]">
                  {{ s.last }}
                </div>
              </div>
              <div
                class="relative min-w-[64px] rounded-2xl bg-sun px-2 pb-2 pt-2.5 md:min-w-[92px] md:rounded-[20px] text-center md:px-4 md:pb-2.5 md:pt-3"
              >
                <div class="font-condensed text-[32px] font-bold leading-none md:text-[50px]">
                  {{ s.overall }}
                </div>
                <div class="mt-1 text-[10px] font-bold tracking-[.06em] md:text-xs">OVERALL</div>
              </div>
            </div>

            <div class="flex flex-1 flex-col gap-[22px] p-4 md:px-[30px] md:pb-7 md:pt-[26px]">
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                  v-for="k in s.skills"
                  :key="k.label"
                  class="rounded-2xl border border-line bg-cream px-3.5 pb-3 pt-3.5"
                >
                  <div class="mb-1.5 text-[13px] text-[#7A706B]">{{ k.label }}</div>
                  <div class="mb-2.5 font-condensed text-[30px] font-bold leading-none text-brand">
                    {{ k.score }}
                  </div>
                  <div class="h-1.5 overflow-hidden rounded-md bg-line">
                    <div
                      :class="k.top ? 'bg-sun' : 'bg-brand'"
                      :style="{ width: k.pct }"
                      class="h-full rounded-md"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="mt-auto flex flex-wrap items-center gap-2 text-[13.5px] font-semibold">
                <span class="rounded-full bg-blush px-3 py-1.5 text-brand">CEFR {{ s.cefr }}</span>
                <span class="rounded-full bg-blush px-3 py-1.5 text-brand-deep">Academic</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- one student from Oxford to IELTS -->
    <section class="wrap pb-6 pt-10">
      <div
        class="relative grid items-center gap-7 overflow-hidden rounded-[28px] bg-ink p-7 md:p-10 lg:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)]"
      >
        <div
          class="absolute -bottom-[120px] -right-20 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(190,30,45,.45),rgba(190,30,45,0)_70%)]"
        ></div>
        <div
          :style="{ backgroundImage: `url('${journey.photo}')` }"
          class="relative h-24 w-24 rounded-[22px] border-[3px] border-sun bg-cover bg-center"
        ></div>
        <div class="relative">
          <div class="mb-2 font-condensed text-sm font-bold uppercase tracking-[.18em] text-sun">
            Brighton Journey
          </div>
          <h3 class="mb-1.5 font-display text-[26px] font-semibold leading-[1.25] text-cream">
            {{ journey.name }}
          </h3>
          <p class="text-base leading-[1.6] text-[#C9BFB8]">
            เติบโตไปกับไบรท์ตัน จากเด็กประถมสู่ผลสอบ IELTS ระดับ C1
          </p>
        </div>
        <div class="relative flex items-center gap-3.5">
          <div
            class="rounded-[18px] border border-cream/15 bg-cream/[.08] px-[18px] py-3.5 text-center"
          >
            <div class="mb-1 text-[13px] text-[#9C918A]">{{ journey.from.label }}</div>
            <div class="font-condensed text-4xl font-bold leading-none text-cream">
              {{ journey.from.score }}
            </div>
          </div>
          <span class="text-[26px] text-sun">→</span>
          <div class="rounded-[18px] bg-sun px-[18px] py-3.5 text-center">
            <div class="mb-1 text-[13px]">{{ journey.to.label }}</div>
            <div class="font-condensed text-4xl font-bold leading-none">{{ journey.to.score }}</div>
          </div>
        </div>
        <p class="relative text-[15px] leading-[1.65] text-[#C9BFB8]">
          ห้าปีจากผลสอบ Oxford Young Learners สู่ Overall Band 7.5 —
          ทักษะที่สร้างอย่างต่อเนื่องตั้งแต่วัยเด็ก
        </p>
      </div>
    </section>

    <!-- reading the IELTS scores -->
    <section class="wrap pt-6">
      <div class="grid overflow-hidden rounded-[26px] bg-blush md:grid-cols-2">
        <div class="border-b border-line p-8 md:border-b-0 md:border-r md:px-[38px] md:py-10">
          <div
            class="mb-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
          >
            อ่านผลคะแนน
          </div>
          <h3 class="mb-3 font-display text-[26px] font-bold leading-[1.3]">CEFR C1 คืออะไร?</h3>
          <p class="text-base leading-[1.75] text-muted">
            ระดับ C1 คือผู้ใช้ภาษาอังกฤษในระดับ “เชี่ยวชาญ” เข้าใจเนื้อหาซับซ้อน
            สื่อสารได้คล่องและเป็นธรรมชาติ — เพียงพอสำหรับการเรียนต่อมหาวิทยาลัยชั้นนำในต่างประเทศ
          </p>
        </div>
        <div class="p-8 md:px-[38px] md:py-10">
          <div
            class="mb-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
          >
            คะแนนเต็ม 9.0
          </div>
          <h3 class="mb-3 font-display text-[26px] font-bold leading-[1.3]">Band 7.0 ขึ้นไป</h3>
          <p class="text-base leading-[1.75] text-muted">
            เป็นเกณฑ์ที่มหาวิทยาลัยส่วนใหญ่ในสหราชอาณาจักร ออสเตรเลีย
            และหลักสูตรนานาชาติในไทยใช้รับเข้าศึกษา
          </p>
        </div>
      </div>
    </section>

    <!-- Oxford Placement Test -->
    <section class="wrap pb-16 pt-12 md:pb-[88px] md:pt-16">
      <div
        class="relative overflow-hidden rounded-[28px] bg-[#E3F3FA] px-3.5 pb-4 pt-10 md:rounded-[32px] md:px-11 md:pb-11 md:pt-12"
      >
        <div class="absolute inset-x-0 top-0 h-2 bg-[#0096C8]"></div>
        <div
          :class="oxfordReport ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]' : ''"
          class="mb-10 grid items-center gap-12"
        >
          <div :class="oxfordReport ? '' : 'max-w-[720px]'">
            <span
              class="mb-[18px] inline-flex rounded-full border border-[#B8E0F0] bg-white px-3.5 py-[7px] font-condensed text-xs font-bold tracking-[.16em] text-[#1B2357] md:text-sm"
              >OXFORD UNIVERSITY PRESS</span
            >
            <div
              class="mb-2.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-[#0083B0]"
            >
              Oxford Placement Test for Young Learners
            </div>
            <h2
              class="mb-3.5 font-display text-[28px] font-bold leading-[1.2] text-[#1B2357] md:text-[40px]"
            >
              วัดระดับมาตรฐาน CEFR กับ Oxford
            </h2>
            <p class="mb-7 text-[17px] leading-[1.7] text-[#3D4A6B]" style="text-wrap: pretty">
              นักเรียนระดับประถมศึกษาของไบรท์ตันทุกคนในรายชื่อนี้ สอบได้ระดับ B1 ขึ้นไป —
              เทียบเท่าเป้าหมายของนักเรียนจบ ม.6 ตามกรอบ CEFR ของกระทรวงศึกษาธิการ
            </p>
            <div class="rounded-[18px] border border-[#B8E0F0] bg-white px-[18px] pb-3.5 pt-[18px]">
              <div class="mb-2.5 text-[13px] text-[#3D4A6B]">
                Score guide · Oxford Placement Test
              </div>
              <div class="grid grid-cols-4 gap-1 text-center">
                <div v-for="(b, i) in oxfordScale" :key="b.cefr">
                  <div
                    :class="b.on ? 'font-bold text-[#0083B0]' : 'font-medium text-[#7A8099]'"
                    class="mb-[5px] text-[11px] md:text-[12.5px]"
                  >
                    {{ b.band }}
                  </div>
                  <div
                    :class="[
                      b.on
                        ? 'bg-[#0096C8] text-white shadow-[0_6px_14px_rgba(0,150,200,.35)]'
                        : `${b.bg} text-[#7A8099]`,
                      scaleCorners(i, oxfordScale.length)
                    ]"
                    class="px-1 py-2.5 font-condensed text-[15px] font-bold md:text-[17px]"
                  >
                    {{ b.cefr }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figure v-if="oxfordReport" class="relative flex justify-center">
            <div
              class="absolute inset-[8%_4%_4%_14%] rotate-[5deg] rounded-[10px] bg-white shadow-[0_14px_30px_rgba(27,35,87,.1)]"
            ></div>
            <a
              :href="oxfordReport"
              class="relative block w-full max-w-[380px] -rotate-[2.5deg] rounded-[10px] bg-white p-2.5 shadow-[0_26px_50px_rgba(27,35,87,.22)] transition-transform hover:rotate-0 hover:scale-[1.02]"
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
              class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1B2357] px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_8px_20px_rgba(27,35,87,.25)]"
            >
              ใบรายงานผลจริงจาก Oxford
            </figcaption>
          </figure>
        </div>

        <div class="grid gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          <div
            v-for="o in oxfordStudents"
            :key="o.first + o.last"
            :class="o.top ? 'border-sun bg-[#FDF1D8]' : 'border-[#C9E6F2] bg-white'"
            class="flex items-center gap-3.5 rounded-[18px] border px-[18px] py-4"
          >
            <div
              :class="o.top ? 'bg-sun text-ink' : 'bg-[#0083B0] text-white'"
              class="grid h-[58px] w-[58px] flex-none place-items-center rounded-[14px] font-condensed text-2xl font-bold"
            >
              {{ o.cefr }}
            </div>
            <div class="min-w-0">
              <div class="text-[16.5px] font-medium leading-[1.3] text-[#1B2357]">
                {{ o.first }}
              </div>
              <div class="text-[13.5px] leading-[1.4] text-[#7A706B] [overflow-wrap:anywhere]">
                {{ o.last }}
              </div>
              <div v-if="o.testDate" class="mt-[3px] text-[12.5px] text-[#9C918A]">
                {{ o.testDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-ink px-5 py-16 text-cream md:py-20">
      <div class="mx-auto max-w-[900px] text-center">
        <h2
          class="mb-4 font-display text-[30px] font-bold leading-[1.25] tracking-[-.02em] md:text-[46px]"
        >
          คนต่อไปใน Hall of Fame<br />อาจเป็นลูกของคุณ
        </h2>
        <p class="mx-auto mb-8 max-w-[560px] text-[17px] leading-[1.7] text-[#C9BFB8] md:text-lg">
          ปรึกษาเส้นทางการเรียนภาษาอังกฤษตั้งแต่พื้นฐานจนถึงเป้าหมาย IELTS กับทีมไบรท์ตัน
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <router-link
            class="inline-flex h-14 items-center whitespace-nowrap rounded-full bg-sun px-7 text-[17px] font-bold text-ink transition-colors hover:bg-[#F6C55E]"
            to="/contact"
          >
            นัดวัดระดับฟรี →
          </router-link>
          <a
            :href="contact.tel"
            class="inline-flex h-14 items-center whitespace-nowrap rounded-full border border-cream/20 bg-cream/[.08] px-7 text-[17px] font-semibold transition-colors hover:bg-cream/[.16]"
            >โทร {{ contact.phone }}</a
          >
        </div>
        <div class="mt-14 border-t border-cream/15 pt-6 text-sm text-[#9C918A]">
          คะแนน IELTS ตรวจสอบได้ที่ ielts.org/verify
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
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
      oxfordScale: [
        { band: 'Countdown', cefr: 'Pre-A1', bg: 'bg-[#FBE5DD]' },
        { band: 'Lift off', cefr: 'A1', bg: 'bg-[#FBF1D3]' },
        { band: 'Zoom', cefr: 'A2', bg: 'bg-[#E6F1DA]' },
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
