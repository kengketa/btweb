<template>
  <div
    class="fixed inset-x-3 z-40 grid grid-cols-[auto_auto_1fr] gap-2 rounded-full border border-line bg-white p-2 shadow-[0_12px_30px_-10px_rgba(0,0,0,.3)] md:hidden"
    style="bottom: calc(12px + env(safe-area-inset-bottom, 0px))"
  >
    <a
      :href="contact.tel"
      class="flex h-12 items-center rounded-full bg-cream px-4 text-sm font-semibold"
      >โทร</a
    >
    <a
      :href="contact.facebook"
      class="flex h-12 items-center rounded-full bg-cream px-4 text-sm font-semibold"
      rel="noopener"
      target="_blank"
    >
      Facebook
    </a>
    <router-link
      class="flex h-12 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
      to="/contact"
    >
      นัดวัดระดับฟรี
    </router-link>
  </div>
</template>

<script>
import { contact } from '@/data/site'

export default {
  name: 'MobileActionBar',
  data() {
    return { contact }
  }
}
</script>
