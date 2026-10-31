<template>
  <main>
    <section class="wrap pb-6 pt-10 md:pb-10 md:pt-16">
      <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-10">
        <SectionHead
          :count="`${courses.length} หลักสูตร`"
          :level="1"
          eyebrow="Our Courses"
          icon="book"
          title="หลักสูตรของเรา"
          tone="brand"
        />
        <p class="max-w-[440px] text-base leading-[1.75] text-muted md:text-[17px]">
          ออกแบบตามช่วงวัยและพัฒนาการ เน้นความเข้าใจ ไม่ใช่การท่องจำ ทุกคลาสเริ่มจากการวัดระดับฟรี
          เพื่อให้ลูกได้เรียนในกลุ่มที่เหมาะสม
        </p>
      </div>
    </section>

    <div
      class="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-5 pb-5 md:flex-wrap md:gap-2.5 md:px-10 md:pb-7 lg:px-14"
    >
      <button
        v-for="[key, label] in groups"
        :key="key"
        :class="{ 'chip-on': filter === key }"
        class="chip"
        @click="filter = key"
      >
        {{ label }}
      </button>
    </div>

    <!-- one bento card per course; widths alternate 7/5, 5/7 so rows don't line up -->
    <section
      v-reveal="{ stagger: 80 }"
      class="wrap grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 md:gap-5 md:pb-5 lg:grid-cols-12"
    >
      <BentoCard
        v-for="(c, i) in filtered"
        :key="c.slug"
        :class="filtered.length === 1 ? 'md:col-span-2 lg:col-span-12' : spans[i % 4]"
        :sub="c.sub"
        :tag="c.curriculum"
        :title="c.name"
        :to="`/courses/${c.slug}`"
      >
        <div class="flex flex-1 flex-col gap-5">
          <PhotoBox
            :alt="c.name"
            :src="c.photo"
            class="h-[180px] rounded-[20px] md:h-[220px] md:rounded-[24px]"
            sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
          />
          <div
            class="flex flex-1 flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5"
          >
            <p class="max-w-[460px] text-[15px] leading-[1.7] text-muted">{{ c.desc }}</p>
            <span
              :class="toneClass[c.tone]"
              class="flex flex-none -rotate-2 flex-col items-start gap-1 rounded-[20px] px-4 py-3"
            >
              <span class="text-[12px] font-semibold opacity-90">{{ c.tag }}</span>
              <span :class="ageFont(c.age)" class="text-[34px] font-bold leading-none">{{
                c.age
              }}</span>
              <span class="text-[12px] opacity-90">{{ c.ageUnit }}</span>
            </span>
          </div>
        </div>
        <template #foot><span class="link-arrow">ดูรายละเอียด →</span></template>
      </BentoCard>
    </section>

    <section
      v-reveal="{ stagger: 90 }"
      class="wrap grid grid-cols-1 gap-4 pb-16 md:gap-5 md:pb-[104px] lg:grid-cols-12"
    >
      <BentoCard
        class="lg:col-span-7"
        icon="target"
        sub="ให้ครูช่วยประเมิน — วัดระดับภาษาฟรี ไม่มีค่าใช้จ่าย"
        title="ไม่แน่ใจว่าลูกควรเริ่มที่ระดับไหน?"
        tone="sun"
      >
        <div class="mt-auto flex flex-wrap items-end justify-between gap-5">
          <p class="flex items-baseline gap-2">
            <span class="text-sm text-body">เริ่มเรียนได้ตั้งแต่</span>
            <span class="font-condensed text-[64px] font-bold leading-none">3</span>
            <span class="text-sm text-body">ขวบ</span>
          </p>
          <router-link
            class="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-ink px-[30px] text-base font-semibold text-white transition-colors hover:bg-brand"
            to="/contact"
          >
            นัดวัดระดับฟรี →
          </router-link>
        </div>
      </BentoCard>
      <BentoCard
        class="lg:col-span-5"
        icon="sparkle"
        sub="นอกจากคลาสประจำ เรายังมีโครงการและบริการอื่นๆ"
        title="บริการอื่นๆ"
        tone="sage"
      >
        <div class="mt-auto flex flex-wrap gap-2">
          <router-link
            v-for="p in programs"
            :key="p.slug"
            :to="p.path"
            class="rounded-full bg-white px-3.5 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-white"
            >{{ p.label }} →</router-link
          >
          <span class="rounded-full border border-white px-3.5 py-2 text-sm">Exam Prep</span>
          <span class="rounded-full border border-white px-3.5 py-2 text-sm"
            >Corporate Training</span
          >
        </div>
        <template #foot>
          <router-link class="font-semibold text-sagedeep hover:underline" to="/contact"
            >สอบถามรายละเอียด →</router-link
          >
        </template>
      </BentoCard>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import SectionHead from '@/components/SectionHead.vue'
import { ageFont, courseGroups, courses, toneClass } from '@/data/courses'
import { programs } from '@/data/programs'

export default {
  name: 'CoursesView',
  components: { BentoCard, PhotoBox, SectionHead },
  setup() {
    useHead({
      title: 'คอร์สเรียนพิเศษภาษาอังกฤษ พะเยา - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'คอร์สเรียนพิเศษภาษาอังกฤษสำหรับเด็กอนุบาลถึงมัธยมในพะเยา และคอร์สติวภาษาอังกฤษตัวต่อตัว ออกแบบตามช่วงวัย เน้นความเข้าใจ ไม่ใช่การท่องจำ ทุกคลาสเริ่มจากการวัดระดับฟรี'
        }
      ]
    })
  },
  data() {
    return {
      filter: 'all',
      groups: courseGroups,
      courses,
      programs,
      ageFont,
      toneClass,
      spans: ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
    }
  },
  computed: {
    filtered() {
      return courses.filter((c) => this.filter === 'all' || c.group === this.filter)
    }
  }
}
</script>
