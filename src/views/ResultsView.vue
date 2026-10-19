<template>
  <main>
    <section class="relative overflow-hidden pb-16 pt-12 md:pb-[72px] md:pt-[72px]">
      <div
        class="pointer-events-none absolute -right-[180px] -top-[260px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(244,182,63,.24)_0%,rgba(244,182,63,.05)_55%,rgba(244,182,63,0)_72%)]"
      ></div>
      <div
        class="wrap relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]"
      >
        <div>
          <div
            class="mb-4 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
          >
            For Parents · Brighton Report
          </div>
          <h1
            class="mb-5 font-display text-[44px] font-extrabold leading-[1.15] tracking-[-.02em] md:text-[64px] xl:text-[76px]"
          >
            ดูผลการเรียน<br /><span class="text-brand">ของลูกผ่าน LINE</span>
          </h1>
          <p
            class="mb-8 max-w-[540px] text-[17px] leading-[1.7] text-muted md:text-[19px]"
            style="text-wrap: pretty"
          >
            ติดตามพัฒนาการทุกเดือน ทั้งกราฟทักษะเทียบค่าเฉลี่ยของระดับชั้น ประวัติการประเมิน
            และความคิดเห็นจากคุณครูผู้สอน — ได้ทุกที่ ทุกเวลา ไม่ต้องรอจบเทอม
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a
              :href="contact.line"
              class="inline-flex h-14 items-center whitespace-nowrap rounded-full bg-[#06C755] px-7 text-[17px] font-medium text-white shadow-[0_10px_26px_rgba(6,199,85,.28)] transition-colors hover:bg-[#05A948] md:text-lg"
              rel="noopener"
              target="_blank"
              >เพิ่มเพื่อน {{ contact.lineName }}</a
            >
            <router-link
              :to="{ hash: '#how' }"
              class="inline-flex h-14 items-center whitespace-nowrap rounded-full border-[1.5px] border-line2 px-6 text-[17px] font-normal transition-colors hover:border-brand hover:text-brand"
              >ดูวิธีใช้งาน ↓</router-link
            >
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="relative w-full max-w-[360px] rounded-[28px] border border-line bg-white px-7 pb-6 pt-7 text-center shadow-[0_24px_56px_rgba(33,26,23,.12)]"
          >
            <div
              class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-1.5 text-sm font-normal text-white"
            >
              สแกนด้วยกล้องมือถือ
            </div>
            <img
              :alt="`QR Code LINE ${contact.lineName}`"
              :src="lineQr"
              class="mx-auto mb-4 mt-1.5 block aspect-square h-auto w-full max-w-[260px]"
              height="260"
              width="260"
            />
            <div class="mb-1 text-lg font-medium">{{ contact.lineName }}</div>
            <a
              :href="contact.line"
              class="font-condensed text-[15px] font-semibold tracking-[.04em] text-[#7A706B] transition-colors hover:text-[#06C755]"
              rel="noopener"
              target="_blank"
              >{{ lineShort }}</a
            >
          </div>
        </div>
      </div>
    </section>

    <section id="how" class="border-y border-line bg-white pb-[110px] pt-14 lg:pb-[88px] lg:pt-20">
      <div class="wrap grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <div
            class="mb-3 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
          >
            How it works
          </div>
          <h2 class="mb-3 font-display text-[30px] font-bold leading-[1.2] md:text-[44px]">
            4 ขั้นตอนง่าย ๆ
          </h2>
          <p class="mb-8 text-[17px] leading-[1.7] text-muted">
            แตะแต่ละขั้นตอนเพื่อดูหน้าจอตัวอย่าง — ลองกรอกเลขได้จริงในขั้นตอนที่ 3
          </p>
          <div class="hidden flex-col gap-3 lg:flex">
            <button
              v-for="(s, i) in steps"
              :key="s.title"
              :class="i === step ? 'border-brand bg-cream' : 'border-line bg-white'"
              class="grid grid-cols-[52px_minmax(0,1fr)] items-start gap-[18px] rounded-[22px] border-[1.5px] px-6 py-[22px] text-left transition-colors hover:border-brand"
              type="button"
              @click="go(i)"
            >
              <span
                :class="i === step ? 'bg-brand text-white' : 'bg-blush text-brand'"
                class="grid h-[52px] w-[52px] place-items-center rounded-2xl font-condensed text-2xl font-bold"
                >{{ i + 1 }}</span
              >
              <span>
                <span class="mb-1 block font-display text-xl font-medium leading-[1.35]">{{
                  s.title
                }}</span>
                <span class="block text-[15.5px] leading-[1.6] text-muted">{{ s.desc }}</span>
              </span>
            </button>
          </div>
        </div>

        <!-- phone demo -->
        <div class="flex flex-col items-center gap-4 lg:sticky lg:top-[108px]">
          <!-- phones: number tabs and the current step stand in for the list -->
          <div class="flex w-full max-w-[420px] flex-col gap-2.5 lg:hidden">
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(s, i) in steps"
                :key="s.title"
                :aria-label="`ขั้นตอนที่ ${i + 1}: ${s.title}`"
                :class="i === step ? 'bg-brand text-white' : 'bg-blush text-brand'"
                class="grid h-12 place-items-center rounded-[14px] font-condensed text-xl font-bold"
                type="button"
                @click="go(i)"
              >
                {{ i + 1 }}
              </button>
            </div>
            <div class="min-h-[100px] rounded-2xl border-[1.5px] border-brand bg-cream px-4 py-3.5">
              <div class="mb-1 text-[17px] font-medium leading-[1.4]">
                {{ step + 1 }}. {{ steps[step].title }}
              </div>
              <div class="text-[14.5px] leading-[1.55] text-muted">{{ steps[step].desc }}</div>
            </div>
          </div>
          <div
            class="h-[580px] w-[320px] max-w-full rounded-[48px] lg:h-[660px] bg-ink p-[11px] shadow-[0_30px_70px_rgba(33,26,23,.28)]"
          >
            <div
              class="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-[#F7F8FA] font-normal"
            >
              <div
                :class="statusBar"
                class="flex h-[34px] flex-none items-center justify-between px-[26px] font-condensed text-[13px] font-bold"
              >
                <span>9:41</span><span class="h-5 w-[74px] rounded-xl bg-black"></span
                ><span>5G</span>
              </div>

              <!-- 1: the LINE account -->
              <div v-if="step === 0" class="flex flex-1 flex-col bg-white">
                <div class="relative h-[150px] bg-brand">
                  <div
                    class="absolute -bottom-[42px] left-1/2 grid h-[84px] w-[84px] -translate-x-1/2 place-items-center overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_6px_16px_rgba(0,0,0,.12)]"
                  >
                    <BrandLogo class="!h-auto !w-[74px]" />
                  </div>
                </div>
                <div class="px-[22px] pt-14 text-center">
                  <div class="mb-1 text-[19px] font-semibold">{{ contact.lineName }}</div>
                  <div class="mb-[22px] text-[13px] text-[#7A706B]">
                    โรงเรียนสอนภาษาไบรท์ตัน · พะเยา
                  </div>
                  <button
                    class="block w-full rounded-xl bg-[#06C755] p-3.5 text-base font-medium text-white"
                    type="button"
                    @click="go(1)"
                  >
                    เพิ่มเพื่อน
                  </button>
                  <div class="mt-3.5 text-[12.5px] leading-[1.6] text-[#9C918A]">
                    สแกน QR Code หรือกดลิงก์<br />{{ lineShort }}
                  </div>
                </div>
              </div>

              <!-- 2: the chat and its menu -->
              <div v-else-if="step === 1" class="flex flex-1 flex-col bg-[#1C1C1E]">
                <div class="border-b border-[#2C2C2E] px-4 pb-3 pt-2.5 text-white">
                  <div class="text-[15px] font-medium">{{ contact.lineName }}</div>
                  <div class="text-[11px] text-[#8E8E93]">Automated responses</div>
                </div>
                <div class="flex flex-1 flex-col gap-2.5 px-3.5 py-4">
                  <div
                    class="max-w-[84%] self-start rounded-2xl bg-[#2C2C2E] px-[13px] py-2.5 text-[13px] leading-[1.55] text-[#F2F2F7]"
                  >
                    สวัสดีค่ะ ยินดีต้อนรับสู่ Brighton 😊 คุณพ่อคุณแม่สามารถดูผลการเรียนของน้อง ๆ
                    ได้ที่เมนูด้านล่างนะคะ
                  </div>
                </div>
                <div class="relative flex-none">
                  <img
                    :src="lineMenu"
                    alt="เมนู LINE: ดูผลสอบ, โปรโมชั่นใหม่, เช็คเครดิต, ติดต่อเรา"
                    class="block h-auto w-full"
                  />
                  <button
                    aria-label="ดูผลสอบ"
                    class="absolute left-[16%] top-[2%] h-[46%] w-[69%] rounded-lg border-[3px] border-sun shadow-[0_0_0_5px_rgba(244,182,63,.35)]"
                    type="button"
                    @click="go(2)"
                  ></button>
                  <div
                    class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-3 py-1 text-xs font-semibold text-ink"
                  >
                    แตะ “ดูผลสอบ”
                  </div>
                </div>
                <div class="grid h-[34px] flex-none place-items-center text-[13px] text-white">
                  Menu ▾
                </div>
              </div>

              <!-- 3: add a child by ID -->
              <div v-else-if="step === 2" class="flex-1 overflow-y-auto px-[18px] py-[22px]">
                <BrandLogo class="mx-auto mb-[26px] mt-1.5" />
                <template v-if="added">
                  <div class="mb-2.5 text-sm font-medium text-muted">ลูกของคุณ</div>
                  <button
                    class="mb-[18px] flex w-full items-center gap-3 rounded-2xl border-2 border-sun bg-white p-3.5 text-left shadow-[0_4px_14px_rgba(0,0,0,.06)]"
                    type="button"
                    @click="go(3)"
                  >
                    <span
                      class="grid h-11 w-11 flex-none place-items-center rounded-full bg-brand text-base font-semibold text-white"
                      >{{ child.initials }}</span
                    >
                    <span class="min-w-0 flex-1">
                      <span class="block text-[15px] font-semibold">{{ child.nickname }}</span>
                      <span class="block text-xs text-[#7A706B]">{{ child.name }} (ตัวอย่าง)</span>
                    </span>
                    <span class="text-lg text-brand">›</span>
                  </button>
                </template>
                <div
                  class="rounded-2xl bg-white px-4 py-[18px] shadow-[0_4px_14px_rgba(0,0,0,.06)]"
                >
                  <div class="mb-2.5 text-[15px] font-semibold">เพิ่มลูก</div>
                  <label class="mb-1.5 block text-[12.5px] text-[#7A706B]" for="demo-id"
                    >รหัสบัตรประชาชน 13 หลัก</label
                  >
                  <!-- demo only: what is typed here never leaves the page -->
                  <input
                    id="demo-id"
                    :value="idDisplay"
                    autocomplete="off"
                    class="w-full rounded-xl border-[1.5px] border-[#E5E0DA] bg-white px-3.5 py-3 font-condensed text-[17px] font-semibold tracking-[.06em] outline-none focus:border-brand"
                    inputmode="numeric"
                    placeholder="x-xxxx-xxxxx-xx-x"
                    @input="onId"
                  />
                  <div class="mx-0.5 mb-3 mt-1.5 flex justify-between text-[11.5px] text-[#9C918A]">
                    <span>{{ digits.length }}/13 หลัก</span>
                    <button class="font-medium text-brand" type="button" @click="digits = sampleId">
                      ใส่เลขตัวอย่าง
                    </button>
                  </div>
                  <button
                    :class="digits.length === 13 ? 'bg-brand' : 'bg-[#E8A5AC]'"
                    class="block w-full rounded-xl p-[13px] text-center text-[15px] font-medium text-white"
                    type="button"
                    @click="addChild"
                  >
                    เพิ่มนักเรียน
                  </button>
                </div>
                <div v-if="added" class="mt-3.5 text-center text-[12.5px] font-medium text-brand">
                  ↑ แตะที่ชื่อนักเรียนเพื่อดูผล
                </div>
              </div>

              <!-- 4: the report -->
              <div v-else class="flex-1 overflow-y-auto bg-[#F7F8FA]">
                <div class="bg-brand px-[18px] pb-[46px] pt-3 text-white">
                  <button class="mb-3 text-sm text-[#FBE9EA]" type="button" @click="go(2)">
                    ‹ กลับ
                  </button>
                  <div class="flex items-center gap-3.5">
                    <div
                      class="grid h-14 w-14 flex-none place-items-center rounded-full bg-white/[.22] text-xl font-semibold"
                    >
                      {{ child.initials }}
                    </div>
                    <div>
                      <div class="text-xl font-semibold leading-[1.2]">{{ child.nickname }}</div>
                      <div class="text-[12.5px] text-[#FBE9EA]">
                        {{ child.name }} · {{ child.level }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mx-3 -mt-8 rounded-[18px] bg-white px-2.5 pb-3 pt-3.5 shadow-[0_6px_18px_rgba(0,0,0,.07)]"
                >
                  <div class="px-1.5 pb-0.5 text-sm font-semibold">ผลการประเมิน (เดือนล่าสุด)</div>
                  <svg
                    aria-label="กราฟทักษะ 8 ด้านของน้องมะลิ เทียบค่าเฉลี่ยระดับชั้น"
                    class="mb-1.5 mt-1 block h-auto w-full"
                    role="img"
                    viewBox="0 44 320 216"
                  >
                    <polygon
                      v-for="r in chart.rings"
                      :key="r.v"
                      :points="r.points"
                      fill="none"
                      stroke="#E5E0DA"
                    />
                    <line
                      v-for="(a, i) in chart.spokes"
                      :key="i"
                      :x1="CX"
                      :x2="a[0]"
                      :y1="CY"
                      :y2="a[1]"
                      stroke="#EDE8E2"
                    />
                    <polygon
                      :points="chart.average"
                      fill="none"
                      stroke="#9C918A"
                      stroke-dasharray="5 4"
                      stroke-width="1.6"
                    />
                    <polygon
                      :points="chart.child"
                      fill="rgba(6,199,85,.18)"
                      stroke="#06C755"
                      stroke-linejoin="round"
                      stroke-width="2.2"
                    />
                    <circle
                      v-for="(d, i) in chart.dots"
                      :key="'d' + i"
                      :cx="d[0]"
                      :cy="d[1]"
                      fill="#06C755"
                      r="3.6"
                      stroke="#fff"
                      stroke-width="1.5"
                    />
                    <text
                      v-for="t in chart.ticks"
                      :key="'t' + t.v"
                      :x="CX + 4"
                      :y="t.y"
                      class="font-condensed"
                      fill="#B5ABA4"
                      font-size="11"
                    >
                      {{ t.v }}
                    </text>
                    <text
                      v-for="l in chart.labels"
                      :key="l.text"
                      :text-anchor="l.anchor"
                      :x="l.x"
                      :y="l.y"
                      fill="#5C5552"
                      font-size="13"
                    >
                      {{ l.text }}
                    </text>
                  </svg>
                  <div class="flex justify-center gap-4 text-[11.5px] text-muted">
                    <span class="flex items-center gap-1.5"
                      ><span
                        class="h-2.5 w-[18px] rounded-sm border-2 border-[#06C755] bg-[#06C755]/[.18]"
                      ></span
                      >{{ child.nickname }}</span
                    >
                    <span class="flex items-center gap-1.5"
                      ><span
                        class="h-2.5 w-[18px] rounded-sm border-2 border-dashed border-[#9C918A]"
                      ></span
                      >ค่าเฉลี่ยระดับชั้น</span
                    >
                  </div>
                </div>
                <div class="px-3 pb-6 pt-5">
                  <div class="px-1.5 pb-2.5 text-[15px] font-semibold">ประวัติการประเมิน</div>
                  <div class="flex flex-col gap-3">
                    <div
                      v-for="h in history"
                      :key="h.unit"
                      class="rounded-2xl bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,.05)]"
                    >
                      <div class="flex items-baseline justify-between gap-2">
                        <div class="text-[14.5px] font-semibold">{{ h.unit }}</div>
                        <div class="whitespace-nowrap text-[11.5px] text-[#9C918A]">
                          {{ h.date }}
                        </div>
                      </div>
                      <div class="mb-2.5 mt-0.5 text-[11.5px] text-[#9C918A]">
                        ผู้ประเมิน: {{ h.teacher }}
                      </div>
                      <div class="mb-2.5 grid grid-cols-2 gap-[5px]">
                        <div
                          v-for="k in h.scores"
                          :key="k.label"
                          class="flex justify-between rounded-lg bg-[#F7F8FA] px-2 py-1.5 text-[11px]"
                        >
                          <span class="text-muted">{{ k.label }}</span
                          ><span class="font-condensed text-[12.5px] font-bold text-brand">{{
                            k.v
                          }}</span>
                        </div>
                      </div>
                      <div
                        class="rounded-[10px] bg-[#FDF1D8] px-[11px] py-2.5 text-xs leading-[1.6] text-[#3D3532]"
                      >
                        💬 {{ h.comment }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full max-w-[320px] gap-2.5">
            <button
              :class="step > 0 ? '' : 'opacity-35'"
              :disabled="step === 0"
              class="whitespace-nowrap rounded-full border-[1.5px] border-line2 px-[18px] py-3.5 text-[15px]"
              type="button"
              @click="go(step - 1)"
            >
              ‹ ย้อนกลับ
            </button>
            <button
              class="flex-1 rounded-full bg-brand p-3.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-brand-dark"
              type="button"
              @click="go(step < 3 ? step + 1 : 0)"
            >
              {{ step < 3 ? 'ขั้นตอนถัดไป ›' : 'เริ่มใหม่ ↺' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap py-16 md:py-[88px]">
      <div class="mb-11 max-w-[640px]">
        <div
          class="mb-3 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-brand"
        >
          What you'll see
        </div>
        <h2 class="mb-3 font-display text-[30px] font-bold leading-[1.2] md:text-[44px]">
          เห็นการเติบโตของลูกในทุก ๆ ก้าว
        </h2>
        <p class="text-[17px] leading-[1.7] text-muted">
          บางครั้งจุดเด่นเล็ก ๆ ของลูกเป็นสิ่งที่มองไม่เห็นจากที่บ้าน
          แต่แสดงออกอย่างเต็มที่เมื่ออยู่ในห้องเรียน
        </p>
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="rounded-3xl border border-line bg-white px-7 py-[30px]"
        >
          <div class="mb-4 font-condensed text-[40px] font-bold leading-none text-brand">
            0{{ i + 1 }}
          </div>
          <h3 class="mb-2 font-display text-[21px] font-medium">{{ f.title }}</h3>
          <p class="text-base leading-[1.65] text-muted">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <section class="wrap pb-16 md:pb-[88px]">
      <div
        class="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[26px] bg-blush p-7 md:px-[38px] md:py-[34px]"
      >
        <div class="max-w-[640px]">
          <h3 class="mb-1.5 font-display text-2xl font-semibold">หาชื่อลูกไม่เจอ?</h3>
          <p class="text-base leading-[1.65] text-muted">
            ตรวจสอบเลขบัตรประชาชน 13 หลักของนักเรียนอีกครั้ง หากยังไม่พบ ติดต่อเจ้าหน้าที่ได้เลยค่ะ
          </p>
        </div>
        <div class="flex flex-wrap gap-2.5">
          <a :href="contact.tel" class="btn-primary h-[52px] px-6 text-base"
            >โทร {{ contact.phone }}</a
          >
          <a
            :href="chatUrl('สอบถามเรื่องดูผลการเรียนผ่าน LINE')"
            class="inline-flex h-[52px] items-center whitespace-nowrap rounded-full border-[1.5px] border-[#F2CFCF] bg-white px-6 text-base font-normal transition-colors hover:border-brand hover:text-brand"
            rel="noopener"
            target="_blank"
            >ทักแชท Messenger</a
          >
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BrandLogo from '@/components/BrandLogo.vue'
import { chatUrl, contact } from '@/data/site'
import { history, radar, sampleChild, sampleId, steps } from '@/data/parentReport'

// radar chart geometry, in the SVG's own units: centre, and the radius of a score of 100
const CX = 150
const CY = 150
const R = 74
const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / radar.axes.length
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

const chart = {
  rings: [60, 70, 80, 90, 100].map((v) => ({ v, points: polygon(radar.axes.map(() => v)) })),
  spokes: radar.axes.map((_, i) => point(i, 100)),
  average: polygon(radar.average),
  child: polygon(radar.child),
  dots: radar.child.map((v, i) => point(i, v)),
  ticks: [60, 80, 100].map((v) => ({ v, y: CY - ((v - 50) / 50) * R + 3 })),
  labels: radar.axes.map((text, i) => {
    const c = Math.cos(angle(i))
    const s = Math.sin(angle(i))
    return {
      text,
      x: CX + (R + 10) * c,
      y: CY + (R + 10) * s + (s > 0.5 ? 13 : s < -0.5 ? -4 : 5),
      anchor: c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle'
    }
  })
}

export default {
  name: 'ResultsView',
  components: { BrandLogo },
  setup() {
    useHead({
      title: 'ดูผลการเรียนของลูกผ่าน LINE - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'ผู้ปกครองนักเรียนไบรท์ตันดูผลการเรียนของลูกได้ทุกเดือนผ่าน LINE BrightonLA Official: กราฟทักษะเทียบค่าเฉลี่ยระดับชั้น ประวัติการประเมิน และความคิดเห็นจากคุณครู'
        }
      ]
    })
  },
  data() {
    return {
      contact,
      lineQr: '/images/parents/line-qr.png',
      lineMenu: '/images/parents/line-richmenu.jpg',
      lineShort: contact.line.replace(/^https:\/\//, ''),
      steps,
      child: sampleChild,
      history,
      sampleId,
      chart,
      CX,
      CY,
      features: [
        {
          title: 'กราฟทักษะ เทียบค่าเฉลี่ย',
          text: 'กราฟ 8 ด้าน — การฟัง การพูด คำศัพท์ การเข้าเรียน พัฒนาการทางสังคม การมีส่วนร่วม ความมั่นใจ และสมาธิ เทียบกับค่าเฉลี่ยของระดับชั้น'
        },
        {
          title: 'ประวัติการประเมินรายเดือน',
          text: 'คะแนนทุกทักษะแยกตามหน่วยการเรียน พร้อมวันที่และชื่อคุณครูผู้ประเมิน ย้อนดูพัฒนาการได้ตลอด'
        },
        {
          title: 'ความคิดเห็นจากคุณครู',
          text: 'ข้อความแห่งความใส่ใจและคำแนะนำโดยตรงจากคุณครูผู้สอนทุกเดือน ทั้งภาษาไทยและภาษาอังกฤษ'
        }
      ],
      // phone demo state
      step: 0,
      digits: '',
      added: false
    }
  },
  computed: {
    // 1-2345-67890-12-3, the way the ID card prints it
    idDisplay() {
      const parts = []
      let i = 0
      for (const n of [1, 4, 5, 2, 1]) {
        if (i >= this.digits.length) break
        parts.push(this.digits.slice(i, i + n))
        i += n
      }
      return parts.join('-')
    },
    statusBar() {
      if (this.step === 1) return 'bg-[#1C1C1E] text-white'
      if (this.step === 3) return 'bg-brand text-white'
      return this.step === 0 ? 'bg-white text-ink' : 'bg-[#F7F8FA] text-ink'
    }
  },
  methods: {
    chatUrl,
    go(step) {
      this.step = step
      // the child shows on the list once they've opened the report; going back to the
      // start clears it
      if (step === 3) this.added = true
      else if (step < 2) this.added = false
    },
    onId(e) {
      this.digits = e.target.value.replace(/\D/g, '').slice(0, 13)
      // keep the field formatted even when the typed character was dropped
      e.target.value = this.idDisplay
    },
    addChild() {
      if (this.digits.length === 13) this.added = true
    }
  }
}
</script>
