<template>
  <main>
    <section class="wrap flex flex-col gap-3 pb-6 pt-12 md:gap-5 md:pb-12 md:pt-[88px]">
      <span class="eyebrow">Our Courses</span>
      <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-end lg:gap-10">
        <h1
          class="font-display text-[36px] font-bold leading-[1.35] md:text-[56px] xl:text-[64px] xl:leading-[1.3]"
        >
          หลักสูตรของเรา
        </h1>
        <p class="max-w-[440px] text-base leading-[1.75] text-muted md:text-[17px]">
          ออกแบบตามช่วงวัยและพัฒนาการ เน้นความเข้าใจ ไม่ใช่การท่องจำ ทุกคลาสเริ่มจากการวัดระดับฟรี
          เพื่อให้ลูกได้เรียนในกลุ่มที่เหมาะสม
        </p>
      </div>
    </section>

    <div
      class="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-5 pb-5 md:flex-wrap md:gap-2.5 md:px-10 lg:px-14"
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

    <section class="wrap flex flex-col gap-3.5 pb-12 md:gap-0 md:pb-[72px]">
      <article
        v-for="c in filtered"
        :key="c.slug"
        class="overflow-hidden rounded-[22px] border border-line bg-white md:grid md:grid-cols-[200px_160px_1fr] md:items-center md:gap-8 md:rounded-none md:border-0 md:border-t md:border-line2 md:bg-transparent md:py-8 lg:grid-cols-[240px_200px_1fr_auto] lg:gap-10"
      >
        <PhotoBox
          :alt="c.name"
          :src="photoFor(c.keyword, courses.indexOf(c) * 3 + 2)"
          class="h-[150px] md:h-[160px] md:rounded-[20px]"
        />
        <div class="hidden flex-col gap-1.5 md:flex">
          <span class="text-[13px] font-semibold text-muted">{{ c.tag }}</span>
          <span :class="ageFont(c.age)" class="text-[44px] font-bold leading-[1.1] text-brand">
            {{ c.age }}
          </span>
          <span class="text-sm text-muted">{{ c.ageUnit }}</span>
        </div>
        <div class="flex flex-col gap-1.5 p-[18px] md:gap-2.5 md:p-0">
          <div class="flex items-baseline justify-between gap-3">
            <b class="text-xl md:text-[26px]">{{ c.name }}</b>
            <span :class="ageFont(c.age)" class="text-[22px] font-bold text-brand md:hidden">{{
              c.age
            }}</span>
          </div>
          <span class="text-sm font-medium text-brand md:text-[15px]">{{ c.sub }}</span>
          <span
            class="max-w-[460px] text-sm leading-[1.65] text-muted md:text-[15px] md:leading-[1.7]"
          >
            {{ c.desc }}
          </span>
          <router-link :to="`/courses/${c.slug}`" class="mt-2 text-sm font-semibold lg:hidden">
            ดูรายละเอียด →
          </router-link>
        </div>
        <router-link
          :to="`/courses/${c.slug}`"
          class="btn-outline hidden h-12 px-6 text-[15px] lg:inline-flex"
        >
          ดูรายละเอียด →
        </router-link>
      </article>
    </section>

    <section class="wrap pb-16 md:pb-[104px]">
      <div
        class="flex flex-col justify-between gap-4 rounded-[22px] bg-sun p-6 md:flex-row md:items-center md:gap-8 md:rounded-[28px] md:px-12 md:py-11"
      >
        <div class="flex flex-col gap-2">
          <b class="font-display text-xl font-bold md:text-[30px]"
            >ไม่แน่ใจว่าลูกควรเริ่มที่ระดับไหน?</b
          >
          <span class="text-[15px] md:text-base"
            >ให้ครูช่วยประเมิน — วัดระดับภาษาฟรี ไม่มีค่าใช้จ่าย</span
          >
        </div>
        <router-link
          class="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-ink px-[30px] text-[15px] font-semibold text-white md:h-14 md:text-base"
          to="/contact"
        >
          นัดวัดระดับฟรี →
        </router-link>
      </div>
      <p class="mt-6 text-sm text-muted">
        บริการอื่นๆ:
        <template v-for="p in programs" :key="p.slug">
          <router-link class="link-arrow" :to="p.path">{{ p.label }}</router-link> ·
        </template>
        คอร์สเตรียมสอบ (Exam Prep) · อบรมภาษาอังกฤษสำหรับองค์กร (Corporate Training) —
        <router-link class="link-arrow" to="/contact">สอบถามรายละเอียด</router-link>
      </p>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import PhotoBox from '@/components/PhotoBox.vue'
import { useFeed } from '@/composables/useFeed'
import { ageFont, courseGroups, courses } from '@/data/courses'
import { programs } from '@/data/programs'

export default {
  name: 'CoursesView',
  components: { PhotoBox },
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
    const { photoFor } = useFeed()
    return { photoFor }
  },
  data() {
    return { filter: 'all', groups: courseGroups, courses, programs, ageFont }
  },
  computed: {
    filtered() {
      return courses.filter((c) => this.filter === 'all' || c.group === this.filter)
    }
  }
}
</script>
