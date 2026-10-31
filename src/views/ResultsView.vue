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
            For Parents · Student Progress
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
            ติดตามผลการเรียน เครดิต และชำระค่าเรียนของลูกได้ในมือถือ ผ่านแอปผู้ปกครองใน LINE
            ทั้งกราฟผลการประเมินเทียบค่าเฉลี่ยระดับชั้นและความเห็นจากคุณครูผู้สอน — ได้ทุกที่
            ทุกเวลา
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
            class="relative w-full max-w-[360px] rounded-[28px] border border-line bg-white px-6 pb-5 pt-7 text-center md:px-7 md:pb-6 shadow-[0_24px_56px_rgba(33,26,23,.12)] md:rounded-[32px]"
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

    <section id="how" class="wrap pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        :title="`${steps.length} ขั้นตอนง่าย ๆ`"
        class="mb-5 md:mb-10"
        eyebrow="How it works"
        icon="route"
        sub="แตะแต่ละขั้นตอนเพื่อดูหน้าจอตัวอย่าง — ลองกรอกข้อมูลเพิ่มลูกได้จริงในขั้นตอนที่ 3"
        tone="brand"
      />
      <div class="grid grid-cols-1 items-start gap-3 md:gap-5 lg:grid-cols-12">
        <!-- desktop: the steps as a list beside the phone; phones get number tabs instead -->
        <BentoCard class="hidden lg:col-span-7 lg:flex">
          <div class="flex flex-col gap-3">
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
        </BentoCard>

        <!-- phone demo: a sun card from tablet up; on phones the phone itself is the card -->
        <div
          class="flex flex-col items-center gap-4 md:rounded-[32px] md:border md:border-[#F1DFAE] md:bg-sunsoft md:p-8 lg:sticky lg:top-[108px] lg:col-span-5"
        >
          <!-- phones: number tabs and the current step stand in for the list -->
          <div class="flex w-full max-w-[420px] flex-col gap-2.5 lg:hidden">
            <div class="grid grid-cols-6 gap-2">
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
            <div class="min-h-[100px] rounded-2xl border-[1.5px] border-brand bg-white px-4 py-3.5">
              <div class="mb-1 text-[17px] font-medium leading-[1.4]">
                {{ step + 1 }}. {{ steps[step].title }}
              </div>
              <div class="text-[14.5px] leading-[1.55] text-muted">{{ steps[step].desc }}</div>
            </div>
          </div>
          <div
            class="h-[580px] w-[320px] max-w-full rounded-[48px] bg-ink p-[11px] shadow-[0_30px_70px_rgba(33,26,23,.28)] lg:h-[660px]"
          >
            <div
              class="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-app-cream font-normal"
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
              <div v-else-if="step === 1" class="flex flex-1 flex-col bg-[#8CABD8]">
                <div class="bg-white px-4 pb-3 pt-2.5 text-ink">
                  <div class="text-[15px] font-medium">{{ contact.lineName }}</div>
                  <div class="text-[11px] text-[#8E8E93]">Automated responses</div>
                </div>
                <div class="flex flex-1 flex-col gap-2.5 px-3.5 py-4">
                  <div
                    class="max-w-[84%] self-start rounded-2xl bg-white px-[13px] py-2.5 text-[13px] leading-[1.55] text-ink"
                  >
                    สวัสดีค่ะ ยินดีต้อนรับสู่ Brighton 😊 คุณพ่อคุณแม่ดูผลการเรียน เครดิต
                    และชำระค่าเรียนของน้อง ๆ ได้ที่เมนู Student Progress ด้านล่างนะคะ
                  </div>
                </div>
                <div class="relative flex-none">
                  <img
                    :src="lineMenu"
                    alt="เมนู LINE: Student Progress, Credit / Payment, Promotion"
                    class="block h-auto w-full"
                    height="430"
                    width="640"
                  />
                  <!-- Student Progress takes the left two thirds of the menu -->
                  <button
                    aria-label="Student Progress"
                    class="absolute bottom-[3%] left-[1%] top-[3%] w-[64.5%] rounded-xl border-[3px] border-app-red shadow-[0_0_0_4px_rgba(255,255,255,.7)]"
                    type="button"
                    @click="go(2)"
                  ></button>
                  <div
                    class="pointer-events-none absolute left-[4%] top-[7%] whitespace-nowrap rounded-full border-2 border-white bg-app-red px-3 py-1 text-xs font-semibold text-white"
                  >
                    แตะตรงนี้
                  </div>
                </div>
                <div
                  class="grid h-[34px] flex-none place-items-center bg-white text-[13px] text-ink"
                >
                  Menu ▾
                </div>
              </div>

              <!-- 3–6: the parent app -->
              <template v-else>
                <div ref="app" class="relative flex-1 overflow-y-auto text-app-navy">
                  <!-- 3: the children list -->
                  <template v-if="step === 2">
                    <div class="relative overflow-hidden bg-app-sky px-4 pb-10 pt-3">
                      <span
                        class="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#FFE28A]"
                      ></span>
                      <span
                        class="absolute right-7 top-3 h-2.5 w-2.5 rotate-45 rounded-[2px] bg-app-sun"
                      ></span>
                      <div class="relative flex justify-center">
                        <div
                          class="rounded-full bg-white px-5 py-2.5 shadow-[0_3px_0_rgba(27,37,89,.08)]"
                        >
                          <BrandLogo class="!h-auto !w-[150px]" />
                        </div>
                      </div>
                      <div class="absolute -bottom-6 -left-3 -right-3 flex items-end">
                        <span
                          v-for="(c, i) in clouds"
                          :key="i"
                          :style="{ width: `${c[0]}px`, height: `${c[1]}px` }"
                          class="-ml-6 flex-none rounded-[50%] bg-app-cream first:ml-0"
                        ></span>
                      </div>
                    </div>
                    <div class="relative flex flex-col gap-3 px-4 pb-6 pt-3">
                      <div class="flex items-center gap-2">
                        <div class="text-[19px] font-semibold">ลูกของคุณ</div>
                        <div
                          class="rounded-full border-2 border-app-navy bg-app-sun px-2.5 text-xs font-semibold"
                        >
                          {{ added ? 1 : 0 }} คน
                        </div>
                      </div>
                      <button
                        v-if="added"
                        :class="childHint ? 'ring-4 ring-sun/60' : ''"
                        class="grid grid-cols-[46px_minmax(0,1fr)_auto_22px] items-center gap-2.5 rounded-[20px] border-2 border-app-navy bg-white p-3 text-left shadow-[0_4px_0_#1B2559]"
                        type="button"
                        @click="go(3)"
                      >
                        <span
                          class="grid h-[46px] w-[46px] place-items-center rounded-full border-2 border-app-navy bg-app-red text-base font-semibold text-white"
                          >{{ child.initials }}</span
                        >
                        <span class="min-w-0">
                          <span class="block truncate text-[16px] font-semibold leading-tight">{{
                            child.nickname
                          }}</span>
                          <span class="block truncate text-xs text-app-muted"
                            >{{ child.name }} (ตัวอย่าง)</span
                          >
                        </span>
                        <span
                          class="flex flex-col items-center rounded-xl bg-[#E5F7EC] px-2 py-1 text-[#0E8A43]"
                        >
                          <span class="font-condensed text-[17px] font-bold leading-none">{{
                            child.credit
                          }}</span>
                          <span class="text-[9.5px] font-semibold">เครดิต</span>
                        </span>
                        <span class="text-lg leading-none">›</span>
                      </button>
                      <button
                        :class="added ? '' : 'ring-4 ring-sun/60'"
                        class="flex h-[60px] items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#E58A9A] bg-[#FFF1F3] text-[17px] font-semibold text-app-red"
                        type="button"
                        @click="openSheet"
                      >
                        <span
                          class="grid h-6 w-6 place-items-center rounded-full bg-app-red text-base leading-none text-white"
                          >+</span
                        >
                        เพิ่มลูก
                      </button>
                      <div
                        v-if="childHint"
                        class="text-center text-[12.5px] font-medium text-app-red"
                      >
                        ↑ แตะที่ชื่อลูกเพื่อดูผลการเรียน
                      </div>
                    </div>
                  </template>

                  <!-- 4–5: one child, results and credit tabs -->
                  <template v-else-if="step === 3 || step === 4">
                    <div class="relative overflow-hidden bg-app-sky px-4 pb-14 pt-3">
                      <span
                        class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#FFE28A]"
                      ></span>
                      <div class="relative flex items-center justify-between gap-2">
                        <button
                          class="rounded-full border-2 border-app-navy bg-white px-3 py-1 text-[13px] font-semibold shadow-[0_2px_0_#1B2559]"
                          type="button"
                          @click="go(2)"
                        >
                          ‹ กลับ
                        </button>
                        <div class="rounded-full bg-white px-3 py-1.5">
                          <BrandLogo class="!h-auto !w-[96px]" />
                        </div>
                      </div>
                      <div class="relative mt-4 flex items-center gap-3">
                        <span
                          class="grid h-[58px] w-[58px] flex-none place-items-center rounded-full border-2 border-app-navy bg-app-red text-xl font-semibold text-white"
                          >{{ child.initials }}</span
                        >
                        <div class="min-w-0">
                          <div class="truncate text-[22px] font-semibold leading-tight">
                            {{ child.nickname }}
                          </div>
                          <div class="truncate text-[13px] text-[#3D4770]">
                            {{ child.name }} · {{ child.level }}
                          </div>
                        </div>
                      </div>
                      <div class="absolute -bottom-6 -left-3 -right-3 flex items-end">
                        <span
                          v-for="(c, i) in clouds"
                          :key="i"
                          :style="{ width: `${c[0]}px`, height: `${c[1]}px` }"
                          class="-ml-6 flex-none rounded-[50%] bg-app-cream first:ml-0"
                        ></span>
                      </div>
                    </div>
                    <div class="relative -mt-7 flex flex-col gap-3 px-3.5 pb-6">
                      <div
                        class="flex items-end justify-between gap-2 rounded-[20px] border-2 border-app-navy bg-white px-3.5 py-3 shadow-[0_4px_0_#1B2559]"
                      >
                        <div>
                          <div class="text-xs text-app-muted">เครดิตคงเหลือ</div>
                          <div class="flex items-baseline gap-1">
                            <span
                              class="font-condensed text-[34px] font-bold leading-none text-[#0E8A43]"
                              >{{ child.credit }}</span
                            >
                            <span class="font-condensed text-sm text-app-muted">Credit</span>
                          </div>
                        </div>
                        <div class="rounded-xl bg-[#EAF6FF] px-2.5 py-1.5 text-right">
                          <div class="text-[10.5px] text-app-muted">ใช้ได้ถึง</div>
                          <div class="text-[13px] font-semibold">{{ child.validUntil }}</div>
                        </div>
                      </div>
                      <div
                        class="grid grid-cols-2 gap-1 rounded-full border-2 border-app-navy bg-white p-1"
                      >
                        <button
                          v-for="(t, i) in ['ผลการประเมิน', 'เครดิต']"
                          :key="t"
                          :class="
                            step === 3 + i
                              ? 'bg-app-red text-white'
                              : step === 3 && i === 1
                                ? 'text-[#4A5378] ring-2 ring-sun/70'
                                : 'text-[#4A5378]'
                          "
                          class="h-9 rounded-full text-[13.5px] font-semibold transition-colors"
                          type="button"
                          @click="go(3 + i)"
                        >
                          {{ t }}
                        </button>
                      </div>

                      <template v-if="step === 3">
                        <div
                          class="rounded-[20px] border-2 border-app-navy bg-white px-2.5 pb-3 pt-3"
                        >
                          <div class="flex items-baseline justify-between px-1.5">
                            <div class="text-[15px] font-semibold">ผลการประเมิน</div>
                            <div class="text-[11px] text-app-muted">เดือนล่าสุด</div>
                          </div>
                          <SkillRadar
                            :average="radar.average"
                            :axes="radar.axes"
                            :child="radar.child"
                            :name="child.nickname"
                            class="mb-1 mt-1"
                          />
                        </div>
                        <div class="px-1 pt-1 text-[16px] font-semibold">ประวัติการประเมิน</div>
                        <div
                          v-for="h in history"
                          :key="h.unit"
                          class="flex flex-col gap-2.5 rounded-[20px] border-2 border-app-navy bg-white p-3 shadow-[0_4px_0_#1B2559]"
                        >
                          <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                              <div class="text-[14.5px] font-semibold leading-snug">
                                {{ h.unit }}
                              </div>
                              <div class="text-[11px] text-app-muted">
                                ผู้ประเมิน: {{ h.teacher }}
                              </div>
                            </div>
                            <div
                              class="flex-none rounded-full bg-[#EAF6FF] px-2 py-0.5 text-[10.5px] font-semibold"
                            >
                              {{ h.date }}
                            </div>
                          </div>
                          <div class="grid grid-cols-2 gap-1.5">
                            <div
                              v-for="k in h.scores"
                              :key="k.label"
                              class="flex flex-col gap-1 rounded-[10px] bg-app-pale px-2 py-1.5"
                            >
                              <div class="flex items-center justify-between gap-1 text-[10.5px]">
                                <span class="truncate">{{ k.label }}</span
                                ><span
                                  :style="{ color: scoreColor(k.v) }"
                                  class="font-condensed text-[13px] font-bold"
                                  >{{ k.v }}</span
                                >
                              </div>
                              <div class="h-[3px] overflow-hidden rounded bg-[#DCE7F2]">
                                <div
                                  :style="{ width: `${k.v}%`, background: scoreColor(k.v) }"
                                  class="h-full rounded"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div class="rounded-xl bg-app-note px-2.5 py-2">
                            <div class="text-[10.5px] font-semibold text-[#9A6A00]">
                              ความเห็นจากครู
                            </div>
                            <div class="text-xs leading-[1.55]">{{ h.comment }}</div>
                          </div>
                        </div>
                      </template>

                      <div
                        v-else
                        class="overflow-hidden rounded-[20px] border-2 border-app-navy bg-white"
                      >
                        <div
                          v-for="(t, i) in transactions"
                          :key="i"
                          class="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2.5 border-b-2 border-dashed border-[#E3ECF5] px-3 py-2.5 last:border-b-0"
                        >
                          <span
                            :class="
                              t.kind === 'pay'
                                ? 'bg-[#E5F7EC] text-[#0E8A43]'
                                : 'bg-[#FFE6EA] text-app-red'
                            "
                            class="grid h-9 w-9 place-items-center rounded-full text-base font-bold"
                            >{{ t.kind === 'pay' ? '฿' : '✎' }}</span
                          >
                          <span class="min-w-0">
                            <span class="block text-[13px] font-semibold">{{
                              t.kind === 'pay' ? 'ชำระค่าเรียน' : 'ลงเรียน'
                            }}</span>
                            <span class="block truncate text-[11px] text-[#4A5378]">{{
                              t.desc
                            }}</span>
                            <span class="block text-[10.5px] text-[#8A93B2]">{{ t.date }}</span>
                          </span>
                          <span class="text-right">
                            <span
                              :class="t.amount > 0 ? 'text-[#0E8A43]' : 'text-app-red'"
                              class="block whitespace-nowrap font-condensed text-[15px] font-bold"
                              >{{ t.amount > 0 ? `+${t.amount}` : `−${-t.amount}` }}</span
                            >
                            <span class="block text-[10.5px] text-[#8A93B2]">{{
                              t.price || ''
                            }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- 6: pay an invoice with PromptPay -->
                  <div v-else class="flex flex-col gap-3 px-4 pb-6 pt-4">
                    <div class="flex items-center gap-2">
                      <button
                        v-if="payStage > 0"
                        class="rounded-full border-2 border-app-navy bg-white px-2.5 py-0.5 text-[13px] font-semibold"
                        type="button"
                        @click="payStage--"
                      >
                        ‹
                      </button>
                      <div class="text-[19px] font-semibold">
                        {{ ['ใบแจ้งหนี้', 'ตรวจสอบยอด', 'สแกนเพื่อชำระ'][payStage] }}
                      </div>
                    </div>

                    <div
                      v-if="payStage === 0"
                      class="flex flex-col gap-2.5 rounded-[20px] border-2 border-app-navy bg-white p-3.5 shadow-[0_4px_0_#1B2559]"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <div class="text-[14px] font-semibold leading-snug">
                            {{ invoice.title }}
                          </div>
                          <div class="text-[11px] text-app-muted">
                            {{ child.nickname }} · ครบกำหนด {{ invoice.due }}
                          </div>
                        </div>
                        <div
                          class="flex-none rounded-full bg-[#FFF1F3] px-2 py-0.5 text-[10.5px] font-semibold text-app-red"
                        >
                          รอชำระ
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="font-condensed text-[24px] font-bold">{{
                          invoice.amount
                        }}</span>
                        <button
                          class="rounded-full border-2 border-app-navy bg-app-red px-5 py-1.5 text-[14px] font-semibold text-white shadow-[0_3px_0_#1B2559] ring-4 ring-sun/60"
                          type="button"
                          @click="payStage = 1"
                        >
                          ชำระ
                        </button>
                      </div>
                    </div>

                    <template v-else-if="payStage === 1">
                      <div class="rounded-[20px] border-2 border-app-navy bg-white p-3.5">
                        <div
                          v-for="row in [
                            ['รายการ', invoice.title],
                            ['เลขที่', invoice.number],
                            ['นักเรียน', `${child.nickname} (${child.level})`]
                          ]"
                          :key="row[0]"
                          class="flex justify-between gap-3 border-b border-dashed border-[#E3ECF5] py-2 text-[12.5px]"
                        >
                          <span class="flex-none text-app-muted">{{ row[0] }}</span
                          ><span class="text-right">{{ row[1] }}</span>
                        </div>
                        <div class="flex items-baseline justify-between pt-2.5">
                          <span class="text-[13px] font-semibold">ยอดชำระ</span>
                          <span class="font-condensed text-[26px] font-bold text-app-red">{{
                            invoice.amount
                          }}</span>
                        </div>
                      </div>
                      <button
                        class="h-12 rounded-full border-2 border-app-navy bg-app-red text-[15px] font-semibold text-white shadow-[0_4px_0_#1B2559] ring-4 ring-sun/60"
                        type="button"
                        @click="payStage = 2"
                      >
                        ชำระเงิน
                      </button>
                    </template>

                    <div
                      v-else
                      class="flex flex-col items-center gap-2 rounded-[20px] border-2 border-app-navy bg-white px-4 pb-4 pt-3 text-center"
                    >
                      <div
                        class="w-full rounded-lg bg-[#113566] py-1.5 font-condensed text-[13px] font-bold tracking-[.06em] text-white"
                      >
                        THAI QR PAYMENT · PromptPay
                      </div>
                      <!-- not a real code: nothing can be paid from this page -->
                      <svg
                        aria-label="QR พร้อมเพย์ตัวอย่าง"
                        class="my-1 h-auto w-[170px]"
                        role="img"
                        :viewBox="`-1 -1 ${qr.size + 2} ${qr.size + 2}`"
                      >
                        <path :d="qr.path" fill="#1B2559" />
                        <g v-for="f in qr.finders" :key="f.join()">
                          <rect
                            :x="f[0] + 0.5"
                            :y="f[1] + 0.5"
                            fill="none"
                            height="6"
                            stroke="#1B2559"
                            width="6"
                          />
                          <rect :x="f[0] + 2" :y="f[1] + 2" fill="#1B2559" height="3" width="3" />
                        </g>
                      </svg>
                      <div class="font-condensed text-[24px] font-bold leading-none">
                        {{ invoice.amount }}
                      </div>
                      <div class="text-[12px] leading-[1.5] text-app-muted">
                        สแกนด้วยแอปธนาคารใดก็ได้<br />ภายใน
                        <b class="font-semibold text-app-red">15 นาที</b>
                      </div>
                      <div class="text-[10.5px] text-[#A3A9C2]">
                        QR ตัวอย่าง — ใช้ชำระจริงไม่ได้
                      </div>
                    </div>
                  </div>
                </div>

                <!-- the app's tab bar -->
                <nav
                  class="grid flex-none grid-cols-4 gap-1 rounded-t-[18px] border-t-2 border-app-navy bg-white px-1.5 pb-3 pt-1.5"
                >
                  <button
                    v-for="n in appNav"
                    :key="n.key"
                    :class="navActive === n.key ? 'text-app-red' : 'text-app-muted'"
                    class="flex flex-col items-center gap-0.5 text-[10.5px] font-semibold"
                    type="button"
                    @click="navTo(n.key)"
                  >
                    <span
                      :class="navActive === n.key ? 'bg-[#FFE6EA]' : ''"
                      class="grid h-6 w-10 place-items-center rounded-full"
                    >
                      <span
                        v-if="n.key === 'credit'"
                        class="grid h-[17px] w-[17px] place-items-center rounded-full border-2 border-current font-condensed text-[10px] font-bold leading-none"
                        >฿</span
                      >
                      <svg v-else class="h-[18px] w-[18px]" viewBox="0 0 22 22">
                        <path
                          :d="n.icon"
                          :fill="n.key === 'eval' ? 'currentColor' : 'none'"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          :stroke-width="n.key === 'eval' ? 0 : 2.2"
                        />
                      </svg>
                    </span>
                    {{ n.label }}
                  </button>
                </nav>

                <!-- 3: add a child -->
                <div v-if="sheetOpen" class="absolute inset-0 z-10 flex flex-col justify-end">
                  <div class="absolute inset-0 bg-app-navy/45" @click="sheetOpen = false"></div>
                  <div
                    class="relative flex flex-col gap-2.5 rounded-t-[24px] border-t-2 border-app-navy bg-app-cream px-4 pb-5 pt-4 text-app-navy"
                  >
                    <div class="text-center">
                      <div class="text-[18px] font-semibold">เพิ่มลูก</div>
                      <div class="text-xs leading-[1.5] text-app-muted">
                        กรอกเลขบัตรประชาชนของลูก และเบอร์โทรศัพท์ที่ให้ไว้กับโรงเรียน
                      </div>
                    </div>
                    <!-- demo only: what is typed here never leaves the page -->
                    <label class="flex flex-col gap-1 text-[12.5px] font-semibold" for="demo-id"
                      >เลขบัตรประชาชน 13 หลัก
                      <input
                        id="demo-id"
                        :value="idDisplay"
                        autocomplete="off"
                        class="rounded-xl border-2 border-app-navy bg-white px-3 py-2.5 font-condensed text-[16px] font-semibold tracking-[.05em] outline-none placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-[#A3A9C2] focus:border-app-red"
                        inputmode="numeric"
                        placeholder="x-xxxx-xxxxx-xx-x"
                        @input="onId"
                      />
                      <span v-if="idError" class="text-[11.5px] font-medium text-app-red"
                        >เลขบัตรประชาชนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง</span
                      >
                    </label>
                    <label class="flex flex-col gap-1 text-[12.5px] font-semibold" for="demo-phone"
                      >เบอร์โทรศัพท์ที่ให้ไว้กับโรงเรียน
                      <input
                        id="demo-phone"
                        :value="phoneDisplay"
                        autocomplete="off"
                        class="rounded-xl border-2 border-app-navy bg-white px-3 py-2.5 font-condensed text-[16px] font-semibold tracking-[.05em] outline-none placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-[#A3A9C2] focus:border-app-red"
                        inputmode="numeric"
                        placeholder="เช่น 081-234-5678"
                        @input="onPhone"
                      />
                    </label>
                    <button
                      class="self-end text-[12px] font-medium text-app-red"
                      type="button"
                      @click="fillSample"
                    >
                      ใส่ข้อมูลตัวอย่าง
                    </button>
                    <div class="grid grid-cols-[1fr_2fr] gap-2">
                      <button
                        class="h-11 rounded-full border-2 border-app-navy bg-white text-[14px] font-semibold"
                        type="button"
                        @click="sheetOpen = false"
                      >
                        ยกเลิก
                      </button>
                      <button
                        :class="canSave ? '' : 'opacity-45'"
                        class="h-11 rounded-full border-2 border-app-navy bg-app-red text-[14px] font-semibold text-white shadow-[0_3px_0_#1B2559]"
                        type="button"
                        @click="saveChild"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </template>
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
              @click="go(isLast ? 0 : step + 1)"
            >
              {{ isLast ? 'เริ่มใหม่ ↺' : 'ขั้นตอนถัดไป ›' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        class="mb-5 md:mb-10"
        eyebrow="What you'll see"
        icon="chart"
        sub="บางครั้งจุดเด่นเล็ก ๆ ของลูกเป็นสิ่งที่มองไม่เห็นจากที่บ้าน แต่แสดงออกอย่างเต็มที่เมื่ออยู่ในห้องเรียน"
        title="เห็นการเติบโตของลูกในทุก ๆ ก้าว"
        tone="sun"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          :sub="features[0].text"
          :title="features[0].title"
          class="md:col-span-2 lg:col-span-7 lg:row-span-2"
          icon="chart"
          tag="ตัวอย่าง"
        >
          <SkillRadar
            :average="radar.average"
            :axes="radar.axes"
            :child="radar.child"
            :name="child.nickname"
            class="mt-auto"
          />
          <template #foot>ตัวอย่างกราฟจากแอป Student Progress</template>
        </BentoCard>

        <BentoCard
          :sub="features[1].text"
          :title="features[1].title"
          class="lg:col-span-5"
          icon="calendar"
          tag="ตัวอย่าง"
          tone="sun"
        >
          <p class="mt-auto flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span class="font-condensed text-[56px] font-bold leading-none">{{
              child.credit
            }}</span>
            <span class="text-sm text-body">เครดิต · ใช้ได้ถึง {{ child.validUntil }}</span>
          </p>
        </BentoCard>

        <BentoCard
          :sub="features[2].text"
          :title="features[2].title"
          class="lg:col-span-5"
          icon="wallet"
          tag="ตัวอย่าง"
          tone="sage"
        >
          <div class="mt-auto flex flex-wrap items-center gap-2">
            <span class="font-condensed text-[40px] font-bold leading-none">{{
              invoice.amount
            }}</span>
            <span class="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium">{{
              invoice.title
            }}</span>
          </div>
        </BentoCard>

        <BentoCard
          id="help"
          :level="2"
          class="md:col-span-2 lg:col-span-12"
          icon="help"
          sub="เพิ่มลูกไม่ได้ หาชื่อลูกไม่เจอ หรือสงสัยเรื่องเครดิตและการชำระค่าเรียน ทักแชทเพจ Facebook หรือโทรหาเจ้าหน้าที่ได้เลยค่ะ"
          title="มีข้อสงสัย? ทักเราได้เลย"
          tone="blush"
        >
          <div class="flex flex-wrap gap-2.5">
            <a :href="contact.tel" class="btn-primary h-[52px] px-6 text-base"
              >โทร {{ contact.phone }}</a
            >
            <a
              :href="chatUrl('สอบถามเรื่องแอปผู้ปกครองใน LINE (Student Progress)')"
              class="inline-flex h-[52px] items-center whitespace-nowrap rounded-full border-[1.5px] border-[#F2CFCF] bg-white px-6 text-base font-normal transition-colors hover:border-brand hover:text-brand"
              rel="noopener"
              target="_blank"
              >ทักแชท Messenger</a
            >
          </div>
        </BentoCard>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import BrandLogo from '@/components/BrandLogo.vue'
import SectionHead from '@/components/SectionHead.vue'
import SkillRadar from '@/components/SkillRadar.vue'
import { chatUrl, contact } from '@/data/site'
import {
  appFeatures,
  history,
  invoice,
  radar,
  sampleChild,
  sampleId,
  samplePhone,
  steps,
  transactions
} from '@/data/parentReport'

// a QR-looking pattern for the payment screen: random modules around the three corner
// finders. It is not a real code, so nothing can be paid from the page.
const qr = (() => {
  const size = 25
  const finders = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7]
  ]
  const nearFinder = (x, y) =>
    finders.some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7)
  let seed = 11
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  let path = ''
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!nearFinder(x, y) && random() < 0.5) path += `M${x} ${y}h1v1h-1z`
    }
  }
  return { size, finders, path }
})()

// Thai ID cards end in a check digit over the first 12
const validId = (d) =>
  d.length === 13 &&
  (11 - ([...d.slice(0, 12)].reduce((sum, n, i) => sum + n * (13 - i), 0) % 11)) % 10 === +d[12]

export default {
  name: 'ResultsView',
  components: { BentoCard, BrandLogo, SectionHead, SkillRadar },
  setup() {
    useHead({
      title: 'ดูผลการเรียนของลูกผ่าน LINE - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'ผู้ปกครองนักเรียนไบรท์ตันติดตามผลการเรียน เครดิต และชำระค่าเรียนของลูกได้ในแอปผู้ปกครองผ่าน LINE BrightonLA Official: กราฟผลการประเมินเทียบค่าเฉลี่ยระดับชั้น ความเห็นจากคุณครู และชำระผ่านพร้อมเพย์'
        }
      ]
    })
  },
  data() {
    return {
      contact,
      lineQr: '/images/parents/line-qr.png',
      lineMenu: '/images/parents/line-richmenu.webp',
      lineShort: contact.line.replace(/^https:\/\//, ''),
      steps,
      child: sampleChild,
      history,
      transactions,
      invoice,
      radar,
      qr,
      clouds: [
        [64, 50],
        [78, 60],
        [64, 46],
        [84, 62],
        [64, 50],
        [70, 56]
      ],
      appNav: [
        {
          key: 'home',
          label: 'หน้าหลัก',
          icon: 'M3 10.5 11 4l8 6.5V18a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z'
        },
        {
          key: 'eval',
          label: 'ผลการเรียน',
          icon: 'M3 13.5a1.5 1.5 0 0 1 3 0V19H3zM9 9.5a1.5 1.5 0 0 1 3 0V19H9zM15 5.5a1.5 1.5 0 0 1 3 0V19h-3z'
        },
        { key: 'credit', label: 'เครดิต' },
        {
          key: 'contact',
          label: 'ติดต่อเรา',
          icon: 'M4 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z'
        }
      ],
      features: appFeatures,
      // phone demo state
      step: 0,
      digits: '',
      phone: '',
      added: false,
      sheetOpen: false,
      payStage: 0
    }
  },
  computed: {
    isLast() {
      return this.step === this.steps.length - 1
    },
    // 1-2345-67890-12-3, the way the ID card prints it
    idDisplay() {
      return this.groups(this.digits, [1, 4, 5, 2, 1])
    },
    phoneDisplay() {
      return this.groups(this.phone, [3, 3, 4])
    },
    idError() {
      return this.digits.length === 13 && !validId(this.digits)
    },
    canSave() {
      return validId(this.digits) && /^0\d{8,9}$/.test(this.phone)
    },
    // on the list step, once the child is there, point at them
    childHint() {
      return this.step === 2 && this.added
    },
    navActive() {
      return ['home', 'eval', 'credit', 'credit'][this.step - 2]
    },
    statusBar() {
      if (this.step < 2) return 'bg-white text-ink'
      return this.step === 5 ? 'bg-app-cream text-app-navy' : 'bg-app-sky text-app-navy'
    }
  },
  methods: {
    chatUrl,
    scoreColor(v) {
      return v >= 80 ? '#0E8A43' : v >= 70 ? '#D98200' : '#C8102E'
    },
    groups(digits, sizes) {
      const parts = []
      let i = 0
      for (const n of sizes) {
        if (i >= digits.length) break
        parts.push(digits.slice(i, i + n))
        i += n
      }
      return parts.join('-')
    },
    go(step) {
      this.step = step
      this.sheetOpen = false
      this.payStage = 0
      // the child shows on the list once they've been added or their pages opened; going
      // back before the app clears them
      if (step >= 3) this.added = true
      else if (step < 2) {
        this.added = false
        this.digits = ''
        this.phone = ''
      }
      this.$nextTick(() => {
        if (this.$refs.app) this.$refs.app.scrollTop = 0
      })
    },
    navTo(key) {
      if (key === 'contact') this.$router.push({ hash: '#help' })
      else this.go({ home: 2, eval: 3, credit: 4 }[key])
    },
    openSheet() {
      this.sheetOpen = true
    },
    onId(e) {
      this.digits = e.target.value.replace(/\D/g, '').slice(0, 13)
      // keep the field formatted even when the typed character was dropped
      e.target.value = this.idDisplay
    },
    onPhone(e) {
      this.phone = e.target.value.replace(/\D/g, '').slice(0, 10)
      e.target.value = this.phoneDisplay
    },
    fillSample() {
      this.digits = sampleId
      this.phone = samplePhone
    },
    saveChild() {
      if (!this.canSave) return
      this.added = true
      this.sheetOpen = false
    }
  }
}
</script>
