<template>
  <div class="flex flex-col">
    <h2 class="mb-4 font-display text-2xl font-bold leading-[1.4] md:text-[32px]">
      คำถามที่พบบ่อย
    </h2>
    <div v-for="([q, a], i) in faqs" :key="q" class="border-t border-line2">
      <button
        :aria-expanded="open === i"
        class="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold md:py-[22px] md:text-lg"
        @click="open = open === i ? -1 : i"
      >
        {{ q }}
        <span
          class="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cream text-lg text-brand"
        >
          {{ open === i ? '–' : '+' }}
        </span>
      </button>
      <p v-if="open === i" class="mb-[22px] max-w-[620px] text-base leading-[1.75] text-muted">
        {{ a }}
      </p>
    </div>
  </div>
</template>

<script>
// Question/answer accordion; the first answer starts open. `faqs` is a list of [question, answer].
export default {
  name: 'FaqList',
  props: {
    faqs: { type: Array, required: true }
  },
  data() {
    return { open: 0 }
  }
}
</script>
