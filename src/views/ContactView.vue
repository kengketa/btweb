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
          กรอกข้อมูลสั้นๆ แล้วส่งให้เราทาง Messenger เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันวันและเวลา
          หรือติดต่อเราได้โดยตรงตามช่องทางด้านล่าง
        </p>
        <div class="mt-2 grid grid-cols-2 gap-3">
          <a
            :href="contact.tel"
            class="flex flex-col gap-1 rounded-[20px] border border-line bg-white px-4 py-4 transition-colors hover:border-brand md:px-[22px] md:py-5"
          >
            <span class="text-[13px] text-muted">โทรศัพท์</span>
            <b class="text-base md:text-lg">{{ contact.phone }}</b>
          </a>
          <a
            :href="contact.facebook"
            class="flex flex-col gap-1 rounded-[20px] border border-line bg-white px-4 py-4 transition-colors hover:border-brand md:px-[22px] md:py-5"
            rel="noopener"
            target="_blank"
          >
            <span class="text-[13px] text-muted">Facebook</span>
            <b class="text-base md:text-lg">Brighton Language</b>
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
          v-if="!submitted"
          class="flex flex-col gap-5 md:gap-[22px]"
          novalidate
          @submit.prevent="submit"
        >
          <b class="font-display text-[22px] font-bold md:text-[26px]">ข้อมูลสำหรับนัดหมาย</b>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium">
              ชื่อผู้ปกครอง
              <input
                v-model.trim="form.name"
                :class="errors.name ? 'border-brand' : 'border-line2'"
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
              class="h-24 resize-none rounded-[14px] border-[1.5px] border-line2 bg-cream px-4 py-3.5 text-base font-normal outline-brand"
              placeholder="เช่น ลูกเคยเรียนพื้นฐานมาแล้ว 1 ปี"
            ></textarea>
          </label>
          <button class="btn-primary h-14 text-base md:h-[58px] md:text-[17px]" type="submit">
            ส่งคำขอนัดหมายทาง Messenger →
          </button>
          <span class="text-center text-[13px] text-muted">
            ไม่มีค่าใช้จ่าย · หรือโทร
            <a :href="contact.tel" class="font-semibold text-ink">{{ contact.phone }}</a>
          </span>
        </form>

        <div
          v-else
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
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import { chatPrefills, chatUrl, contact } from '@/data/site'

export default {
  name: 'ContactView',
  setup() {
    useHead({ title: 'นัดวัดระดับภาษาฟรี - Brighton Language Academy' })
  },
  data() {
    return {
      contact,
      ages: ['3–6 ปี', '7–9 ปี', '10–12 ปี', '13 ปีขึ้นไป'],
      days: ['วันเสาร์', 'วันอาทิตย์', 'วันธรรมดา (หลังเลิกเรียน)'],
      form: { name: '', phone: '', age: '', day: '', note: '' },
      errors: {},
      submitted: false,
      copied: false,
      chatPrefills
    }
  },
  computed: {
    // The site has no backend, so the request is handed to the school's Messenger inbox.
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
  methods: {
    submit() {
      const errors = {}
      if (!this.form.name) errors.name = 'กรุณากรอกชื่อ'
      if (this.form.phone.replace(/\D/g, '').length < 9)
        errors.phone = 'กรุณากรอกเบอร์โทรให้ถูกต้อง'
      this.errors = errors
      if (Object.keys(errors).length) return
      // start the copy before the chat tab steals focus, or the clipboard write is refused
      if (!chatPrefills) this.copy()
      window.open(this.messengerLink, '_blank', 'noopener')
      this.submitted = true
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
