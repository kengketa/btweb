<template>
  <div class="flex items-start gap-4 md:gap-5">
    <!-- a chunky, slightly tilted icon tile: the bento stand-in for BeBetter's 3D icons -->
    <span
      :class="tiles[tone]"
      aria-hidden="true"
      class="mt-1 flex h-12 w-12 flex-none -rotate-6 items-center justify-center rounded-[16px] shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_10px_18px_-10px_rgba(34,28,25,.45)] md:h-[60px] md:w-[60px] md:rounded-[18px]"
    >
      <BentoIcon :name="icon" class="h-6 w-6 md:h-7 md:w-7" />
    </span>
    <div class="flex min-w-0 flex-col gap-1.5 md:gap-2">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span :class="dots[tone]" class="h-2.5 w-2.5 flex-none rounded-full"></span>
        <component
          :is="`h${level}`"
          class="font-display text-2xl font-bold leading-[1.35] md:text-[40px] md:leading-[1.3]"
          style="text-wrap: balance"
          ><slot name="title">{{ title }}</slot></component
        >
        <span
          v-if="count"
          class="rounded-full border border-line2 bg-white px-2.5 py-0.5 text-xs font-semibold text-muted md:text-[13px]"
          >{{ count }}</span
        >
      </div>
      <p v-if="sub" class="max-w-[720px] text-[15px] leading-[1.7] text-muted md:text-[17px]">
        {{ sub }}
      </p>
    </div>
  </div>
</template>

<script>
import BentoIcon from './BentoIcon.vue'

// Section heading for bento pages: tilted icon tile, colour dot, title, an optional
// "N เรื่อง" count and a one-line subtitle (after bebetter.education's section heads).
export default {
  name: 'SectionHead',
  components: { BentoIcon },
  props: {
    title: { type: String, default: '' },
    sub: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    count: { type: String, default: '' },
    icon: { type: String, default: 'sparkle' },
    tone: { type: String, default: 'sun' },
    level: { type: Number, default: 2 }
  },
  data() {
    return {
      tiles: {
        sun: 'bg-sun text-ink',
        brand: 'bg-brand text-white',
        ink: 'bg-ink text-sun',
        sage: 'bg-[#BFD4B8] text-sagedeep',
        peach: 'bg-[#F6C3A6] text-peachdeep'
      },
      dots: {
        sun: 'bg-sun',
        brand: 'bg-brand',
        ink: 'bg-ink',
        sage: 'bg-sagedeep',
        peach: 'bg-peachdeep'
      }
    }
  }
}
</script>
