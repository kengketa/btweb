<template>
  <main>
    <section
      class="wrap grid items-start gap-10 pb-16 pt-10 md:pb-[104px] md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
    >
      <div class="flex flex-col gap-5 md:gap-6">
        <span class="eyebrow">Contact &amp; Booking</span>
        <h1
          class="font-display text-[32px] font-bold leading-[1.4] md:text-5xl xl:text-[56px] xl:leading-[1.35]"
        >
          นัดวัดระดับภาษา<br class="hidden md:block" />
          <span class="text-brand">ฟรี</span>สำหรับลูกของคุณ
        </h1>
        <p class="max-w-[480px] text-[15px] leading-[1.75] text-muted md:text-[17px]">
          กรอกข้อมูลสั้นๆ แล้ว{{ booking.endpoint ? 'กดส่ง' : 'ส่งให้เราทาง Messenger' }}
          เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันวันและเวลา หรือติดต่อเราได้โดยตรงตามช่องทางด้านล่าง
        </p>
        <div class="mt-2 grid gap-3 sm:grid-cols-[auto_1fr] lg:grid-cols-1 xl:grid-cols-[auto_1fr]">
          <a
            :href="contact.tel"
            class="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white px-4 py-4 transition-colors hover:border-brand md:px-[22px] md:py-5"
          >
            <span class="flex items-center gap-2.5 text-[13px] text-muted">
              <span
                class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-blush text-brand"
              >
                <IconMobile class="h-5 w-5" />
              </span>
              โทรศัพท์
            </span>
            <b class="whitespace-nowrap text-base md:text-lg">{{ contact.phone }}</b>
          </a>
          <a
            :href="contact.facebook"
            class="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white px-4 py-4 transition-colors hover:border-brand md:px-[22px] md:py-5"
            rel="noopener"
            target="_blank"
          >
            <span class="flex items-center gap-2.5 text-[13px] text-muted">
              <span
                class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#E7F0FE] text-[#1877F2]"
              >
                <IconFacebook class="h-[22px] w-[22px]" />
              </span>
              Facebook
            </span>
            <b class="whitespace-nowrap text-base md:text-lg">{{ contact.facebookName }}</b>
          </a>
        </div>
        <div
          class="flex flex-col gap-1 rounded-[20px] border border-line bg-white px-4 py-4 md:px-[22px] md:py-5"
        >
          <span class="text-[13px] text-muted">ที่ตั้งและเวลาทำการ</span>
          <b class="text-base font-semibold leading-relaxed">{{ contact.address.join(' ') }}</b>
          <span class="text-sm text-muted">{{ contact.hours }}</span>
        </div>
        <div class="ph h-[260px] overflow-hidden rounded-3xl">
          <iframe
            :src="contact.mapEmbed"
            allowfullscreen
            class="h-full w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="แผนที่ Brighton Language Academy"
          ></iframe>
        </div>
      </div>

      <div
        class="rounded-3xl border border-line bg-white p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,.3)] md:rounded-[32px] md:p-11 lg:sticky lg:top-28"
      >
        <form
          v-show="!submitted"
          class="flex flex-col gap-5 md:gap-[22px]"
          novalidate
          @submit.prevent="submit"
        >
          <b class="font-display text-[22px] font-bold md:text-[26px]">ข้อมูลสำหรับนัดหมาย</b>
          <!-- honeypot: hidden from people, but form-filling bots fill it in -->
          <div aria-hidden="true" class="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label
              >เว็บไซต์
              <input v-model="trap" autocomplete="off" name="website" tabindex="-1" type="text"
            /></label>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium">
              ชื่อผู้ปกครอง
              <input
                v-model.trim="form.name"
                :class="errors.name ? 'border-brand' : 'border-line2'"
                :maxlength="LIMITS.name"
                autocomplete="name"
                class="h-[52px] rounded-[14px] border-[1.5px] bg-cream px-4 text-base font-normal outline-brand"
                placeholder="เช่น คุณแม่น้องมิว"
              />
              <span v-if="errors.name" class="text-xs text-brand">{{ errors.name }}</span>
            </label>
            <label class="flex flex-col gap-2 text-sm font-medium">
              เบอร์โทรศัพท์
              <input
                v-model.trim="form.phone"
                :class="errors.phone ? 'border-brand' : 'border-line2'"
                autocomplete="tel"
                class="h-[52px] rounded-[14px] border-[1.5px] bg-cream px-4 text-base font-normal outline-brand"
                inputmode="tel"
                maxlength="20"
                placeholder="08X-XXX-XXXX"
              />
              <span v-if="errors.phone" class="text-xs text-brand">{{ errors.phone }}</span>
            </label>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-sm font-medium">อายุของลูก</span>
            <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <button
                v-for="a in ages"
                :key="a"
                :class="
                  form.age === a
                    ? 'border-brand bg-brand font-semibold text-white'
                    : 'border-line2 bg-white hover:border-brand'
                "
                class="h-11 rounded-full border-[1.5px] px-5 text-[15px] transition-colors"
                type="button"
                @click="form.age = a"
              >
                {{ a }}
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-sm font-medium">วันที่สะดวก</span>
            <div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                v-for="d in days"
                :key="d"
                :class="
                  form.day === d
                    ? 'border-ink bg-ink font-semibold text-white'
                    : 'border-line2 bg-white hover:border-ink'
                "
                class="h-11 rounded-[14px] border-[1.5px] px-5 text-[15px] transition-colors sm:rounded-full"
                type="button"
                @click="form.day = d"
              >
                {{ d }}
              </button>
            </div>
          </div>
          <label class="flex flex-col gap-2 text-sm font-medium">
            ข้อความเพิ่มเติม (ถ้ามี)
            <textarea
              v-model.trim="form.note"
              :class="errors.note ? 'border-brand' : 'border-line2'"
              :maxlength="LIMITS.note"
              class="h-24 resize-none rounded-[14px] border-[1.5px] bg-cream px-4 py-3.5 text-base font-normal outline-brand"
              placeholder="เช่น ลูกเคยเรียนพื้นฐานมาแล้ว 1 ปี"
            ></textarea>
            <span v-if="errors.note" class="text-xs text-brand">{{ errors.note }}</span>
          </label>
          <div v-if="booking.endpoint && booking.turnstileSiteKey" ref="turnstile"></div>
          <div
            v-if="submitError"
            class="flex flex-col items-start gap-2.5 rounded-[14px] bg-blush px-4 py-3 text-sm text-brand"
            role="alert"
          >
            {{ submitError }}
            <!-- a failed send must not lose the booking: let the parent send it by Messenger -->
            <button
              v-if="sendFailed"
              class="rounded-full bg-brand px-4 py-2 font-semibold text-white"
              type="button"
              @click="handOffToMessenger"
            >
              ส่งทาง Messenger แทน →
            </button>
          </div>
          <button
            :disabled="sending"
            class="btn-primary h-14 text-base disabled:cursor-wait disabled:opacity-60 md:h-[58px] md:text-[17px]"
            type="submit"
          >
            {{
              sending
                ? 'กำลังส่ง…'
                : booking.endpoint
                  ? 'ส่งคำขอนัดหมาย →'
                  : 'ส่งคำขอนัดหมายทาง Messenger →'
            }}
          </button>
          <span class="text-center text-[13px] text-muted">
            ไม่มีค่าใช้จ่าย · หรือโทร
            <a :href="contact.tel" class="font-semibold text-ink">{{ contact.phone }}</a>
          </span>
        </form>

        <div
          v-if="submitted"
          class="flex flex-col items-center gap-[18px] px-2 py-10 text-center md:px-5 md:py-[60px]"
        >
          <div
            class="grid grid-cols-[30px_30px] gap-1.5 rounded-md bg-brand p-2"
            aria-hidden="true"
          >
            <div class="h-[30px] rounded-sm bg-cream"></div>
            <div class="h-[30px] rounded-sm bg-sun"></div>
            <div class="h-[30px] rounded-sm bg-sun"></div>
            <div class="h-[30px] rounded-sm bg-cream"></div>
          </div>
          <template v-if="sentVia === 'endpoint'">
            <b class="font-display text-[26px] font-bold md:text-[30px]">ได้รับข้อมูลแล้วค่ะ!</b>
            <span class="max-w-[380px] text-base leading-[1.7] text-muted">
              เจ้าหน้าที่จะติดต่อกลับทางเบอร์ {{ form.phone }} เพื่อยืนยันวันวัดระดับของลูก
            </span>
            <router-link class="btn-outline h-[46px] px-[22px] text-[15px]" to="/"
              >กลับหน้าแรก</router-link
            >
            <span class="text-[13px] text-muted">
              มีคำถามเพิ่มเติม? โทร
              <a :href="contact.tel" class="font-semibold text-ink">{{ contact.phone }}</a>
            </span>
          </template>
          <template v-else>
            <b class="font-display text-[26px] font-bold md:text-[30px]">อีกขั้นเดียวค่ะ!</b>
            <span v-if="chatPrefills" class="max-w-[380px] text-base leading-[1.7] text-muted">
              เราเปิด Messenger พร้อมข้อความนัดหมายให้แล้ว กด “ส่ง” ใน Messenger เพื่อยืนยัน
              เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันวันวัดระดับของลูก
            </span>
            <template v-else>
              <span class="max-w-[400px] text-base leading-[1.7] text-muted">
                เราเปิดแชท Facebook ของโรงเรียนให้แล้ว
                {{ copied ? 'และคัดลอกข้อความนัดหมายไว้ให้แล้ว —' : '—' }}
                วางข้อความด้านล่างในแชท แล้วกด “ส่ง” เพื่อยืนยัน
              </span>
              <div class="w-full rounded-[14px] border border-line bg-cream p-4 text-left">
                <p class="whitespace-pre-line text-sm leading-[1.7]">{{ bookingText }}</p>
                <button class="link-arrow mt-2 text-sm" type="button" @click="copy">
                  {{ copied ? 'คัดลอกแล้ว ✓' : 'คัดลอกข้อความ' }}
                </button>
              </div>
            </template>
            <div class="flex flex-wrap justify-center gap-2.5">
              <a
                :href="messengerLink"
                class="btn-primary h-[46px] px-[22px] text-[15px] shadow-none"
                rel="noopener"
                target="_blank"
              >
                เปิดแชทอีกครั้ง
              </a>
              <button class="btn-outline h-[46px] px-[22px] text-[15px]" @click="submitted = false">
                กลับไปแก้ไข
              </button>
            </div>
            <span class="text-[13px] text-muted">
              ไม่สะดวกใช้ Messenger? โทร
              <a :href="contact.tel" class="font-semibold text-ink">{{ contact.phone }}</a>
            </span>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconMobile from '@/components/icons/IconMobile.vue'
import { booking, chatPrefills, chatUrl, contact } from '@/data/site'
import {
  LIMITS,
  MIN_FILL_MS,
  cooldownLeft,
  hasLink,
  loadTurnstile,
  markSent,
  normalizePhone
} from '@/utils/spamGuard'

const SEND_TIMEOUT_MS = 15000

export default {
  name: 'ContactView',
  components: { IconFacebook, IconMobile },
  setup() {
    useHead({ title: 'นัดวัดระดับภาษาฟรี - Brighton Language Academy' })
  },
  data() {
    return {
      contact,
      booking,
      LIMITS,
      ages: ['3–6 ปี', '7–9 ปี', '10–12 ปี', '13 ปีขึ้นไป'],
      days: ['วันเสาร์', 'วันอาทิตย์', 'วันธรรมดา (หลังเลิกเรียน)'],
      form: { name: '', phone: '', age: '', day: '', note: '' },
      trap: '',
      startedAt: 0,
      errors: {},
      submitError: '',
      sendFailed: false,
      sending: false,
      submitted: false,
      sentVia: '',
      copied: false,
      turnstileToken: '',
      turnstileFailed: false,
      widgetId: null,
      chatPrefills
    }
  },
  computed: {
    bookingText() {
      const f = this.form
      return [
        'สวัสดีค่ะ ขอนัดวัดระดับภาษาฟรีค่ะ',
        `ชื่อผู้ปกครอง: ${f.name}`,
        `เบอร์โทร: ${f.phone}`,
        f.age && `อายุของลูก: ${f.age}`,
        f.day && `วันที่สะดวก: ${f.day}`,
        f.note && `ข้อความเพิ่มเติม: ${f.note}`
      ]
        .filter(Boolean)
        .join('\n')
    },
    messengerLink() {
      return chatUrl(this.bookingText)
    }
  },
  mounted() {
    this.startedAt = Date.now()
    if (booking.endpoint && booking.turnstileSiteKey) this.mountTurnstile()
  },
  beforeUnmount() {
    if (this.widgetId !== null) window.turnstile?.remove(this.widgetId)
  },
  methods: {
    validate() {
      const { name, phone, note } = this.form
      const errors = {}
      if (!name) errors.name = 'กรุณากรอกชื่อ'
      else if (hasLink(name)) errors.name = 'ชื่อต้องไม่มีลิงก์'
      if (!normalizePhone(phone)) errors.phone = 'กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 081-234-5678'
      if (hasLink(note)) errors.note = 'กรุณาไม่ใส่ลิงก์ในข้อความ'
      this.errors = errors
      return !Object.keys(errors).length
    },
    async submit() {
      if (this.sending) return
      this.submitError = ''
      this.sendFailed = false
      if (!this.validate()) return

      // Without an endpoint the parent sends the message themselves, so there is nothing to guard.
      if (!booking.endpoint) return this.handOffToMessenger()

      // Bots fill the hidden field or submit instantly: show success but send nothing.
      const elapsedMs = Date.now() - this.startedAt
      if (this.trap || elapsedMs < MIN_FILL_MS) return this.finish('endpoint')

      const wait = cooldownLeft()
      if (wait) {
        this.submitError = `เพิ่งส่งคำขอไปเมื่อสักครู่ กรุณารออีก ${Math.ceil(wait / 1000)} วินาที`
        return
      }
      if (booking.turnstileSiteKey && !this.turnstileToken) {
        this.submitError = this.turnstileFailed
          ? `ตรวจสอบความปลอดภัยไม่สำเร็จ กรุณารีเฟรชหน้าแล้วลองใหม่ หรือโทร ${contact.phone}`
          : 'กำลังตรวจสอบความปลอดภัย กรุณารอสักครู่แล้วกดส่งอีกครั้ง'
        return
      }

      this.sending = true
      try {
        await this.post(elapsedMs)
        markSent()
        this.finish('endpoint')
      } catch {
        this.submitError = `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง ส่งทาง Messenger หรือโทร ${contact.phone}`
        this.sendFailed = true
      } finally {
        this.sending = false
        this.resetTurnstile()
      }
    },
    async post(elapsedMs) {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
      try {
        const res = await fetch(booking.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.form.name,
            phone: normalizePhone(this.form.phone),
            age: this.form.age,
            day: this.form.day,
            note: this.form.note,
            // for the server to repeat the bot checks
            website: this.trap,
            elapsedMs,
            turnstileToken: this.turnstileToken || undefined,
            page: window.location.href
          }),
          signal: controller.signal
        })
        if (!res.ok) throw new Error(`Booking endpoint answered ${res.status}`)
      } finally {
        clearTimeout(timer)
      }
    },
    handOffToMessenger() {
      // start the copy before the chat tab steals focus, or the clipboard write is refused
      if (!chatPrefills) this.copy()
      window.open(this.messengerLink, '_blank', 'noopener')
      this.finish('messenger')
    },
    finish(via) {
      this.sentVia = via
      this.submitted = true
    },
    mountTurnstile() {
      loadTurnstile()
        .then((turnstile) => {
          if (!this.$refs.turnstile) return
          this.widgetId = turnstile.render(this.$refs.turnstile, {
            sitekey: booking.turnstileSiteKey,
            language: 'th',
            appearance: 'interaction-only',
            callback: (token) => {
              this.turnstileToken = token
              this.turnstileFailed = false
            },
            'expired-callback': () => (this.turnstileToken = ''),
            'error-callback': () => {
              this.turnstileToken = ''
              this.turnstileFailed = true
            }
          })
        })
        .catch(() => (this.turnstileFailed = true))
    },
    resetTurnstile() {
      if (this.widgetId === null) return
      this.turnstileToken = ''
      window.turnstile?.reset(this.widgetId)
    },
    copy() {
      navigator.clipboard
        ?.writeText(this.bookingText)
        .then(() => (this.copied = true))
        .catch(() => (this.copied = false))
    }
  }
}
</script>
