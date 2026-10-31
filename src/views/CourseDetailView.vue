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

    <section class="bg-white pb-16 pt-8 md:pb-[104px]">
      <div class="wrap grid items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div class="flex flex-col gap-14 lg:gap-16 lg:pt-8">
          <div class="flex flex-col gap-6">
            <h2 v-reveal class="font-display text-2xl font-bold leading-[1.4] md:text-[32px]">
              สิ่งที่ลูกจะได้เรียน
            </h2>
            <div v-reveal="{ stagger: 70 }" class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div
                v-for="[title, text] in course.points"
                :key="title"
                class="flex items-start gap-3.5"
              >
                <span class="mt-2 h-3 w-3 flex-none rounded-sm bg-sun"></span>
                <span class="text-base leading-[1.7]"
                  ><b>{{ title }}</b> — {{ text }}</span
                >
              </div>
            </div>
          </div>

          <div v-if="course.levels" class="flex flex-col gap-6">
            <h2 v-reveal class="font-display text-2xl font-bold leading-[1.4] md:text-[32px]">
              {{ course.levels.heading }}
            </h2>
            <ol v-reveal="{ stagger: 80 }" class="flex flex-col">
              <li
                v-for="([title, text], i) in course.levels.items"
                :key="title"
                class="flex gap-4 border-t border-line2 py-5 first:border-t-0 first:pt-0"
              >
                <span
                  class="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand font-condensed text-sm font-semibold text-white"
                  >{{ i + 1 }}</span
                >
                <span class="flex flex-col gap-1">
                  <b class="text-lg">{{ title }}</b>
                  <span class="text-[15px] leading-[1.75] text-muted">{{ text }}</span>
                </span>
              </li>
            </ol>
          </div>

          <div class="flex flex-col gap-6">
            <h2 v-reveal class="font-display text-2xl font-bold leading-[1.4] md:text-[32px]">
              หนึ่งคาบเรียนที่ Brighton
            </h2>
            <div v-reveal="{ stagger: 90 }" class="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div
                v-for="(step, i) in steps"
                :key="step[0]"
                :class="i === steps.length - 1 ? 'bg-brand text-white' : 'bg-cream'"
                class="flex flex-col gap-2 rounded-[20px] p-5 md:p-[22px]"
              >
                <span
                  :class="i === steps.length - 1 ? 'opacity-85' : 'text-brand'"
                  class="font-condensed text-xs font-medium"
                >
                  0{{ i + 1 }}
                </span>
                <b class="font-condensed text-xl font-semibold">{{ step[0] }}</b>
                <span
                  :class="i === steps.length - 1 ? '' : 'text-muted'"
                  class="text-sm leading-[1.6]"
                  >{{ step[1] }}</span
                >
              </div>
            </div>
          </div>

          <FaqList :key="course.slug" v-reveal="{ stagger: 60 }" :faqs="faqs" />
        </div>

        <aside
          v-reveal
          class="flex flex-col gap-5 rounded-[28px] border border-line bg-cream p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,.3)] md:p-8 lg:sticky lg:top-28 lg:-mt-24"
        >
          <b class="font-display text-[22px] font-bold">ข้อมูลหลักสูตร</b>
          <div class="flex flex-col text-[15px]">
            <div
              v-for="[k, v] in facts"
              :key="k"
              class="flex justify-between gap-4 border-b border-line py-3.5 last:border-0"
            >
              <span class="text-muted">{{ k }}</span
              ><b class="text-right">{{ v }}</b>
            </div>
          </div>
          <router-link class="btn-primary h-14 text-base shadow-none" to="/contact"
            >นัดวัดระดับฟรี →</router-link
          >
          <a :href="contact.tel" class="btn-outline h-[52px] text-[15px]"
            >โทร {{ contact.phone }}</a
          >
          <div class="flex flex-col gap-2 rounded-[18px] bg-white p-[18px]">
            <span class="font-display text-[15px] font-medium leading-[1.6]">
              วัดระดับภาษาฟรีตามกรอบ CEFR ก่อนเริ่มเรียนทุกคอร์ส
            </span>
            <span class="text-xs text-muted">{{ contact.hours }}</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="wrap py-16 md:py-20">
      <h2 v-reveal class="mb-6 font-display text-2xl font-bold md:text-[32px]">หลักสูตรอื่นๆ</h2>
      <div v-reveal="{ stagger: 80 }" class="grid gap-3 sm:grid-cols-3 md:gap-5">
        <router-link
          v-for="c in others"
          :key="c.slug"
          :to="`/courses/${c.slug}`"
          class="flex items-center justify-between gap-4 rounded-[20px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink"
        >
          <span class="flex flex-col gap-1">
            <b class="text-lg">{{ c.name }}</b>
            <span class="text-sm text-muted">{{ c.sub }}</span>
          </span>
          <span class="text-brand">→</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import FaqList from '@/components/FaqList.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import { contact } from '@/data/site'
import { courses, faqs } from '@/data/courses'
import { courseSchema, jsonLd } from '@/data/schema'

export default {
  name: 'CourseDetailView',
  components: { FaqList, PhotoBox },
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
      contact,
      faqs,
      steps: [
        ['Warm-up', 'เพลง เกม และพูดคุยเปิดคาบ'],
        ['Learn', 'เนื้อหาใหม่ทีละช่วง ผ่านภาพและเรื่องราว'],
        ['Activity', 'ลงมือทำ เล่นเกม งานศิลปะและงานประดิษฐ์'],
        ['Wrap-up', 'ทบทวนสิ่งที่เรียน และใช้ภาษาจริงก่อนจบคาบ']
      ]
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
