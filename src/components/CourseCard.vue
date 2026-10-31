<template>
  <!-- One course, laid out the same way as every other: who it's for (the same four school
       stages on every card, the ones it suits filled in), the age in words, then the name,
       one line on what it is, three points, and the fee. -->
  <router-link
    :class="dimmed ? 'opacity-40 saturate-50' : ''"
    :to="`/courses/${course.slug}`"
    class="lift group flex min-w-0 flex-col rounded-[28px] border border-line bg-white p-5 transition-opacity duration-300 md:rounded-[32px] md:p-7"
  >
    <div class="flex flex-wrap items-center justify-between gap-2">
      <ul
        :aria-label="`เหมาะสำหรับ ${course.ageLabel}`"
        class="in-stagger flex flex-wrap gap-1.5"
        style="--in-delay: 200ms"
      >
        <li
          v-for="([key, label], i) in stages"
          :key="key"
          :class="[
            course.stages.includes(key)
              ? 'bg-sun font-semibold text-ink'
              : 'bg-cream text-muted/70 line-through decoration-muted/40',
            match && key === picked ? 'ring-2 ring-brand ring-offset-2' : 'ring-0'
          ]"
          :style="{ '--i': i }"
          class="rounded-full px-3 py-1 text-[13px] transition-shadow duration-300"
        >
          {{ label }}
        </li>
      </ul>
      <span class="ml-auto flex items-center gap-2">
        <Transition name="fit">
          <span
            v-if="match"
            class="flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[13px] font-semibold text-white"
            ><BentoIcon class="h-3.5 w-3.5" name="check" />เหมาะกับลูก</span
          >
        </Transition>
        <!-- small flags: who teaches it (Thai, British, or both) -->
        <template v-for="flag in course.flags ?? ['uk']" :key="flag">
          <svg
            v-if="flag === 'uk'"
            aria-label="British"
            class="h-[18px] w-9 flex-none rounded-[4px] shadow-[0_0_0_1px_rgba(34,28,25,.12)]"
            role="img"
            viewBox="0 0 60 30"
          >
            <clipPath :id="`uk-${course.slug}`"><rect height="30" rx="4" width="60" /></clipPath>
            <clipPath :id="`uk-x-${course.slug}`">
              <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
            </clipPath>
            <g :clip-path="`url(#uk-${course.slug})`">
              <path d="M0 0h60v30H0z" fill="#012169" />
              <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6" />
              <path
                :clip-path="`url(#uk-x-${course.slug})`"
                d="M0 0l60 30m0-30L0 30"
                stroke="#C8102E"
                stroke-width="4"
              />
              <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
              <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6" />
            </g>
          </svg>
          <svg
            v-else-if="flag === 'th'"
            aria-label="ไทย"
            class="h-[18px] w-9 flex-none overflow-hidden rounded-[4px] shadow-[0_0_0_1px_rgba(34,28,25,.12)]"
            role="img"
            viewBox="0 0 12 6"
          >
            <path d="M0 0h12v6H0z" fill="#A51931" />
            <path d="M0 1h12v4H0z" fill="#F4F5F8" />
            <path d="M0 2h12v2H0z" fill="#2D2A4A" />
          </svg>
        </template>
      </span>
    </div>
    <p class="in-rise mt-2.5 text-sm text-body" style="--in-delay: 420ms">
      {{ course.ageLabel }}
    </p>

    <h3 class="mt-5 font-display text-[22px] font-bold leading-snug md:text-2xl">
      {{ course.name }}
    </h3>
    <p class="mt-1 text-[15px] leading-[1.65] text-muted">{{ course.short }}</p>

    <div class="mb-6 mt-5 flex items-center justify-between gap-4">
      <!-- the points come in one by one, each tick popping and drawing as its row lands -->
      <ul class="in-cascade flex min-w-0 flex-col gap-2" style="--in-delay: 450ms">
        <li
          v-for="([point], i) in course.points.slice(0, 3)"
          :key="point"
          :style="{ '--i': i }"
          class="flex items-center gap-2.5 text-[15px]"
        >
          <BentoIcon
            :style="{ '--in-delay': `${450 + i * 110}ms` }"
            class="in-pop tick-draw h-[18px] w-[18px] flex-none text-brand"
            name="checkCircle"
          />
          {{ point }}
        </li>
      </ul>
      <!-- the curriculum publisher's or exam's logo(s), stacked when there are several -->
      <span
        v-if="logos.length"
        class="in-rise flex flex-none flex-col items-center gap-2.5"
        style="--in-delay: 700ms"
      >
        <img
          v-for="logo in logos"
          :key="logo.src"
          :alt="logo.alt"
          :class="logo.wide ? 'w-20 sm:w-24' : 'w-16 sm:w-[72px]'"
          :height="logo.height"
          :src="logo.src"
          :width="logo.width"
          class="h-auto"
          loading="lazy"
        />
      </span>
    </div>

    <div
      class="in-rise mt-auto flex items-end justify-between gap-4 border-t border-line pt-4 md:pt-5"
      style="--in-delay: 800ms"
    >
      <span class="flex flex-col">
        <span class="text-[12.5px] text-muted">ค่าเรียน</span>
        <b class="text-[16px] font-semibold">{{ course.price || 'สอบถามที่โรงเรียน' }}</b>
      </span>
      <span class="link-arrow flex-none text-[15px]">ดูรายละเอียด →</span>
    </div>
  </router-link>
</template>

<script>
import BentoIcon from './BentoIcon.vue'
import { stages } from '@/data/courses'

export default {
  name: 'CourseCard',
  components: { BentoIcon },
  props: {
    course: { type: Object, required: true },
    // the stage the parent picked above the cards ('' = none): matching cards say so,
    // the others step back
    picked: { type: String, default: '' }
  },
  data() {
    return { stages }
  },
  computed: {
    logos() {
      return this.course.logos ?? (this.course.logo ? [this.course.logo] : [])
    },
    match() {
      return !!this.picked && this.course.stages.includes(this.picked)
    },
    dimmed() {
      return !!this.picked && !this.match
    }
  }
}
</script>

<style scoped>
/* the space below the card's top row is kept for the badge, so cards never jump */
.fit-enter-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fit-leave-active {
  transition: opacity 0.15s ease;
}
.fit-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.fit-leave-to {
  opacity: 0;
}
</style>
