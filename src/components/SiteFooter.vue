<template>
  <footer class="pb-28 pt-6 md:pb-8 md:pt-10">
    <div class="wrap">
      <!-- the footer is one more bento grid: brand, courses, links, contact -->
      <div class="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-12">
        <div
          class="flex flex-col justify-between gap-6 rounded-[28px] border border-line bg-white p-6 text-ink md:p-7 shadow-[0_24px_48px_-36px_rgba(34,28,25,.28)] sm:col-span-2 lg:col-span-4 lg:row-span-2"
        >
          <div class="flex flex-col gap-4">
            <BrandLogo class="self-start" />
            <p class="max-w-[320px] text-[15px] leading-[1.75] text-muted">
              โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก ใจกลางเมืองพะเยา —
              เพราะความสุขคือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด
            </p>
          </div>
          <router-link
            class="btn-primary h-12 self-start px-6 text-[15px] shadow-none"
            to="/contact"
            >นัดวัดระดับภาษาฟรี →</router-link
          >
        </div>
        <div
          class="flex flex-col gap-2.5 rounded-[28px] border border-line bg-white p-5 text-sm md:p-6 lg:col-span-4"
        >
          <b class="mb-1 text-[13px] tracking-[.04em] text-brand">หลักสูตร</b>
          <router-link
            v-for="c in courses"
            :key="c.slug"
            :to="`/courses/${c.slug}`"
            class="hover:text-brand"
          >
            {{ c.name }} · {{ c.age }} {{ c.ageUnit === 'ปี' ? 'ปี' : '' }}
          </router-link>
        </div>
        <div
          class="flex flex-col gap-2.5 rounded-[28px] bg-sunsoft p-5 text-sm md:p-6 lg:col-span-4 lg:row-span-2"
        >
          <b class="mb-1 text-[13px] tracking-[.04em] text-ink">ติดต่อ</b>
          <a
            :href="contact.tel"
            class="font-condensed text-[28px] font-bold leading-tight hover:text-brand"
            >{{ contact.phone }}</a
          >
          <a :href="contact.facebook" class="hover:text-brand" rel="noopener" target="_blank">
            Facebook: {{ contact.facebookName }}
          </a>
          <span class="text-body">{{ contact.address.join(' ') }}</span>
          <span class="text-body">{{ contact.hours }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2 rounded-[28px] border border-line bg-white p-5 text-sm sm:col-span-2 lg:col-span-4"
        >
          <router-link class="footer-chip" to="/about">เกี่ยวกับเรา</router-link>
          <router-link v-for="p in programs" :key="p.slug" :to="p.path" class="footer-chip">
            {{ p.label }}
          </router-link>
          <router-link class="footer-chip" to="/hall-of-fame">Hall of Fame</router-link>
          <router-link class="footer-chip" to="/results">ดูผลการเรียน</router-link>
          <router-link class="footer-chip" to="/news">ข่าวสารและกิจกรรม</router-link>
          <router-link class="footer-chip" to="/privacy-policy">นโยบายความเป็นส่วนตัว</router-link>
        </div>
      </div>
      <div class="mt-6 flex flex-col justify-between gap-2 px-2 text-xs text-muted sm:flex-row">
        <span>© {{ year }} Brighton Education Co., Ltd.</span>
        <span>brightonedu.com</span>
      </div>
    </div>
  </footer>
</template>

<script>
import BrandLogo from './BrandLogo.vue'
import { contact } from '@/data/site'
import { courses } from '@/data/courses'
import { programs } from '@/data/programs'

export default {
  name: 'SiteFooter',
  components: { BrandLogo },
  data() {
    return { contact, courses, programs, year: new Date().getFullYear() }
  }
}
</script>
