<template>
  <footer class="pb-28 pt-0 md:pb-8">
    <div class="wrap">
      <!-- the footer is one more bento grid. Row one: who we are, the courses and how to
           reach us, three cards of about the same height; row two: every other page as
           chips across the full width. -->
      <div class="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-12">
        <div
          class="lift flex flex-col gap-4 rounded-[28px] border border-line bg-white p-6 text-ink shadow-[0_24px_48px_-36px_rgba(34,28,25,.28)] sm:col-span-2 md:p-7 lg:col-span-4"
        >
          <BrandLogo class="self-start" />
          <p class="text-[15px] leading-[1.75] text-muted">
            โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก ใจกลางเมืองพะเยา —
            เพราะความสุขคือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด
          </p>
          <router-link
            class="btn-primary mt-auto h-12 self-start px-6 text-[15px] shadow-none"
            to="/contact"
            >นัดวัดระดับภาษาฟรี →</router-link
          >
        </div>

        <!-- the courses as a short table: name, and who it's for on the right -->
        <div
          class="lift flex flex-col rounded-[28px] border border-line bg-white p-5 text-sm md:p-6 lg:col-span-4"
        >
          <b class="mb-1.5 text-[13px] tracking-[.04em] text-brand">หลักสูตร</b>
          <router-link
            v-for="c in courses"
            :key="c.slug"
            :to="`/courses/${c.slug}`"
            class="group flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0 last:pb-0"
          >
            <span class="font-medium transition-colors group-hover:text-brand">{{ c.name }}</span>
            <span class="flex-none rounded-full bg-cream px-2.5 py-0.5 text-[12px] text-body"
              >{{ c.age }}{{ c.ageUnit === 'ปี' ? ' ปี' : '' }}</span
            >
          </router-link>
        </div>

        <!-- contact: the number big, then Facebook, LINE, address and hours, each with its icon -->
        <div
          class="lift flex flex-col gap-3 rounded-[28px] bg-sunsoft p-5 text-sm md:p-6 lg:col-span-4"
        >
          <b class="text-[13px] tracking-[.04em] text-ink">ติดต่อ</b>
          <a
            :href="contact.tel"
            class="flex items-center gap-2.5 font-condensed text-[28px] font-bold leading-none hover:text-brand"
          >
            <BentoIcon class="h-6 w-6 text-brand" name="phone" />{{ contact.phone }}
          </a>
          <ul class="flex flex-col gap-2.5 text-body">
            <li>
              <a
                :href="contact.facebook"
                class="flex items-start gap-2.5 hover:text-brand"
                rel="noopener"
                target="_blank"
              >
                <IconFacebook class="mt-0.5 h-4 w-4 flex-none text-brand" />
                {{ contact.facebookName }}
              </a>
            </li>
            <li>
              <a
                :href="contact.line"
                class="flex items-start gap-2.5 hover:text-brand"
                rel="noopener"
                target="_blank"
              >
                <BentoIcon class="mt-0.5 h-4 w-4 flex-none text-brand" name="chat" />
                LINE: {{ contact.lineName }}
              </a>
            </li>
            <li class="flex items-start gap-2.5">
              <BentoIcon class="mt-0.5 h-4 w-4 flex-none text-brand" name="pin" />
              {{ contact.address.join(' ') }}
            </li>
            <li class="flex items-start gap-2.5">
              <BentoIcon class="mt-0.5 h-4 w-4 flex-none text-brand" name="clock" />
              {{ contact.hours }}
            </li>
          </ul>
        </div>

        <nav
          aria-label="หน้าอื่นๆ"
          class="lift flex flex-wrap gap-2 rounded-[28px] border border-line bg-white p-4 text-sm sm:col-span-2 md:px-5 lg:col-span-12"
        >
          <router-link class="footer-chip" to="/about">เกี่ยวกับเรา</router-link>
          <router-link v-for="p in programs" :key="p.slug" :to="p.path" class="footer-chip">
            {{ p.label }}
          </router-link>
          <router-link class="footer-chip" to="/hall-of-fame">Hall of Fame</router-link>
          <router-link class="footer-chip" to="/results">ดูผลการเรียน</router-link>
          <router-link class="footer-chip" to="/news">ข่าวสารและกิจกรรม</router-link>
        </nav>
      </div>
      <div class="mt-6 flex flex-col justify-between gap-2 px-2 text-xs text-muted sm:flex-row">
        <span>© {{ year }} Brighton Education Co., Ltd.</span>
        <span class="flex gap-4">
          <router-link class="hover:text-brand" to="/privacy-policy"
            >นโยบายความเป็นส่วนตัว</router-link
          >
          <span>brightonedu.com</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import BentoIcon from './BentoIcon.vue'
import BrandLogo from './BrandLogo.vue'
import IconFacebook from './icons/IconFacebook.vue'
import { contact } from '@/data/site'
import { courses } from '@/data/courses'
import { programs } from '@/data/programs'

export default {
  name: 'SiteFooter',
  components: { BentoIcon, BrandLogo, IconFacebook },
  data() {
    return { contact, courses, programs, year: new Date().getFullYear() }
  }
}
</script>
