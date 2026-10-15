<template>
  <footer class="bg-paper pb-28 pt-16 md:pb-8">
    <div class="wrap">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div class="flex flex-col gap-4">
          <BrandLogo class="self-start" />
          <p class="max-w-[300px] text-sm leading-[1.7] text-muted">
            โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก ใจกลางเมืองพะเยา —
            เพราะความสุขคือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด
          </p>
        </div>
        <div class="flex flex-col gap-2.5 text-sm">
          <b class="text-[13px] tracking-[.04em] text-brand">หลักสูตร</b>
          <router-link
            v-for="c in courses"
            :key="c.slug"
            :to="`/courses/${c.slug}`"
            class="hover:text-brand"
          >
            {{ c.name }} · {{ c.age }} {{ c.ageUnit === 'ปี' ? 'ปี' : '' }}
          </router-link>
        </div>
        <div class="flex flex-col gap-2.5 text-sm">
          <b class="text-[13px] tracking-[.04em] text-brand">Brighton</b>
          <router-link class="hover:text-brand" to="/about">เกี่ยวกับเรา</router-link>
          <router-link class="hover:text-brand" to="/news">ข่าวสารและกิจกรรม</router-link>
          <router-link class="hover:text-brand" to="/contact">นัดวัดระดับภาษา</router-link>
          <router-link class="hover:text-brand" to="/privacy-policy"
            >นโยบายความเป็นส่วนตัว</router-link
          >
        </div>
        <div class="flex flex-col gap-2.5 text-sm">
          <b class="text-[13px] tracking-[.04em] text-brand">ติดต่อ</b>
          <a :href="contact.tel" class="hover:text-brand">โทร {{ contact.phone }}</a>
          <a :href="contact.facebook" class="hover:text-brand" rel="noopener" target="_blank">
            Facebook: {{ contact.facebookName }}
          </a>
          <span class="text-muted">{{ contact.address.join(' ') }}</span>
          <span class="text-muted">{{ contact.hours }}</span>
        </div>
      </div>
      <div
        class="mt-12 flex flex-col justify-between gap-2 border-t border-line2 pt-5 text-xs text-muted sm:flex-row"
      >
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

export default {
  name: 'SiteFooter',
  components: { BrandLogo },
  data() {
    return { contact, courses, year: new Date().getFullYear() }
  }
}
</script>
