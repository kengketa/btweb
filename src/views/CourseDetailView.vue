<template>
  <main v-if="course">
    <section class="wrap pb-12 pt-8 md:pb-16 md:pt-10">
      <div class="mb-7 text-sm text-muted md:mb-9">
        <router-link class="hover:text-brand" to="/courses">หลักสูตร</router-link>
        <span class="mx-2">/</span>
        <b class="text-ink">{{ course.name }}</b>
      </div>
      <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div class="flex flex-col gap-4 md:gap-5">
          <span class="self-start rounded-full bg-sun px-3.5 py-1.5 text-sm font-semibold">
            {{ course.tag }} ·
            {{ course.ageUnit === 'ปี' ? `อายุ ${course.age} ปี` : course.ageUnit }}
          </span>
          <h1
            class="font-condensed text-[40px] font-bold leading-[1.1] md:text-[56px] xl:text-[68px]"
          >
            {{ course.name }}
          </h1>
          <p class="font-display text-xl font-medium leading-[1.55] text-brand md:text-2xl">
            {{ course.tagline }}
          </p>
          <p class="text-base leading-[1.8] text-muted md:text-[17px]">{{ course.desc }}</p>
        </div>
        <div class="relative">
          <PhotoBox
            :alt="course.name"
            :src="course.photo"
            class="h-[260px] rounded-3xl md:h-[380px] md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div
            class="absolute -right-2 -top-3 h-14 w-14 rounded-lg bg-brand md:-right-4 md:-top-4 md:h-[72px] md:w-[72px]"
          ></div>
        </div>
      </div>
    </section>

    <!-- the course as bento cards beside a sticky facts card (issue #33) -->
    <section
      class="wrap grid grid-cols-1 items-start gap-4 pb-16 md:gap-5 md:pb-[104px] lg:grid-cols-12"
    >
      <div v-reveal="{ stagger: 80 }" class="flex min-w-0 flex-col gap-4 md:gap-5 lg:col-span-8">
        <BentoCard :level="2" icon="checkCircle" title="สิ่งที่ลูกจะได้เรียน">
          <ul class="grid gap-x-7 gap-y-4 sm:grid-cols-2">
            <li v-for="[title, text] in course.points" :key="title" class="flex items-start gap-3">
              <BentoIcon class="mt-0.5 h-6 w-6 flex-none text-brand" name="checkCircle" />
              <span class="text-[15px] leading-[1.7] text-muted"
                ><b class="text-ink">{{ title }}</b> — {{ text }}</span
              >
            </li>
          </ul>
        </BentoCard>

        <BentoCard
          v-if="course.levels"
          :level="2"
          :tag="`${course.levels.items.length} ขั้น`"
          :title="course.levels.heading"
          icon="route"
          tone="ink"
        >
          <!-- a study-plan path: numbered nodes joined by one line -->
          <ol class="relative flex flex-col gap-5">
            <span
              aria-hidden="true"
              class="absolute bottom-5 left-[17px] top-5 w-0.5 bg-cream/15"
            ></span>
            <li
              v-for="([title, text], i) in course.levels.items"
              :key="title"
              class="relative flex gap-4"
            >
              <span
                class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sun font-condensed text-sm font-bold text-ink ring-4 ring-ink"
                >{{ i + 1 }}</span
              >
              <span class="flex min-w-0 flex-col gap-1 pt-1">
                <b class="text-[17px] text-cream">{{ title }}</b>
                <span class="text-[15px] leading-[1.7] text-cream/70">{{ text }}</span>
              </span>
            </li>
          </ol>
        </BentoCard>

        <BentoCard
          :level="2"
          icon="calendar"
          sub="Active Learning ผ่านเกม งานศิลปะ และงานประดิษฐ์ ไม่ใช่การท่องจำ"
          title="หนึ่งคาบเรียนที่ Brighton"
          tone="sun"
        >
          <!-- the four lesson steps as a timeline: down on phones, across from sm up -->
          <ol class="relative grid gap-4 sm:grid-cols-4 sm:gap-3">
            <span
              aria-hidden="true"
              class="absolute bottom-5 left-[17px] top-5 w-0.5 bg-ink/15 sm:bottom-auto sm:left-[18px] sm:right-[calc(25%_-_27px)] sm:top-[17px] sm:h-0.5 sm:w-auto"
            ></span>
            <li
              v-for="([name, text], i) in steps"
              :key="name"
              class="relative flex gap-3.5 sm:flex-col sm:gap-3"
            >
              <span
                :class="i === steps.length - 1 ? 'bg-ink text-sun' : 'bg-white text-ink'"
                class="flex h-9 w-9 flex-none items-center justify-center rounded-full font-condensed text-sm font-bold ring-4 ring-sunsoft"
                >0{{ i + 1 }}</span
              >
              <span class="flex min-w-0 flex-col gap-1 pt-1 sm:pt-0">
                <b class="font-condensed text-lg font-semibold">{{ name }}</b>
                <span class="text-sm leading-[1.6] text-body">{{ text }}</span>
              </span>
            </li>
          </ol>
        </BentoCard>

        <BentoCard :level="2" icon="help" title="คำถามที่พบบ่อย">
          <FaqList :key="course.slug" :faqs="faqs" heading="" />
        </BentoCard>
      </div>

      <BentoCard
        v-reveal
        class="lg:sticky lg:top-28 lg:col-span-4"
        icon="book"
        :level="2"
        title="ข้อมูลหลักสูตร"
        tone="paper"
      >
        <dl class="flex flex-col gap-3 text-[15px]">
          <div v-for="[k, v] in facts" :key="k" class="flex items-center justify-between gap-3">
            <dt class="text-muted">{{ k }}</dt>
            <dd class="rounded-full bg-white px-3.5 py-1.5 text-right text-[14px] font-semibold">
              {{ v }}
            </dd>
          </div>
        </dl>
        <div class="mt-6 flex flex-col gap-3">
          <router-link class="btn-primary h-14 text-base shadow-none" to="/contact"
            >นัดวัดระดับฟรี →</router-link
          >
          <a :href="contact.tel" class="btn-outline h-[52px] bg-white text-[15px]"
            >โทร {{ contact.phone }}</a
          >
        </div>
        <template #foot>
          <span class="block font-medium text-ink"
            >วัดระดับภาษาฟรีตามกรอบ CEFR ก่อนเริ่มเรียนทุกคอร์ส</span
          >
          {{ contact.hours }}
        </template>
      </BentoCard>
    </section>

    <section class="wrap pb-16 md:pb-[104px]">
      <SectionHead v-reveal class="mb-6 md:mb-10" icon="book" title="หลักสูตรอื่นๆ" tone="sun" />
      <div v-reveal="{ stagger: 80 }" class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <BentoCard
          v-for="c in others"
          :key="c.slug"
          :sub="c.sub"
          :title="c.name"
          :to="`/courses/${c.slug}`"
        >
          <div class="mt-auto flex items-end justify-between gap-4">
            <span class="link-arrow">ดูรายละเอียด →</span>
            <span
              :class="toneClass[c.tone]"
              class="flex flex-none -rotate-2 flex-col items-start gap-0.5 rounded-[18px] px-3.5 py-2.5"
            >
              <span :class="ageFont(c.age)" class="text-[28px] font-bold leading-none">{{
                c.age
              }}</span>
              <span class="text-[12px] opacity-90">{{ c.ageUnit }}</span>
            </span>
          </div>
        </BentoCard>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import BentoIcon from '@/components/BentoIcon.vue'
import FaqList from '@/components/FaqList.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import SectionHead from '@/components/SectionHead.vue'
import { contact } from '@/data/site'
import { ageFont, courses, faqs, lessonSteps, toneClass } from '@/data/courses'
import { courseSchema, jsonLd } from '@/data/schema'

export default {
  name: 'CourseDetailView',
  components: { BentoCard, BentoIcon, FaqList, PhotoBox, SectionHead },
  beforeRouteEnter(to, from, next) {
    next(courses.some((c) => c.slug === to.params.slug) ? undefined : '/courses')
  },
  beforeRouteUpdate(to) {
    if (!courses.some((c) => c.slug === to.params.slug)) return '/courses'
  },
  setup() {
    const route = useRoute()
    const course = computed(() => courses.find((c) => c.slug === route.params.slug))
    useHead({
      title: computed(() => `${course.value?.name ?? 'หลักสูตร'} - Brighton Language Academy`),
      meta: [{ name: 'description', content: computed(() => course.value?.desc ?? '') }],
      script: computed(() => (course.value ? [jsonLd(courseSchema(course.value))] : []))
    })
    return { course }
  },
  data() {
    return {
      ageFont,
      contact,
      faqs,
      steps: lessonSteps,
      toneClass
    }
  },
  computed: {
    others() {
      return courses.filter((c) => c !== this.course).slice(0, 3)
    },
    facts() {
      const c = this.course
      return [
        ['เหมาะสำหรับ', c.ageUnit === 'ปี' ? `อายุ ${c.age} ปี` : c.tag],
        ['หลักสูตร', c.curriculum],
        ['วันเรียน', 'อังคาร – อาทิตย์'],
        ['ค่าเรียน', 'สอบถามที่โรงเรียน']
      ]
    }
  }
}
</script>
