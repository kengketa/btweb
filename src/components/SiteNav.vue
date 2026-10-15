<template>
  <header class="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
    <div class="wrap flex h-16 items-center justify-between gap-6 md:h-[84px]">
      <router-link aria-label="Brighton Language Academy" to="/">
        <BrandLogo :small="true" class="md:hidden" />
        <BrandLogo class="hidden md:block" />
      </router-link>

      <nav class="hidden items-center gap-8 lg:flex">
        <router-link
          v-for="link in links"
          :key="link.to"
          :class="isActive(link) ? 'text-ink' : 'text-ink/80'"
          :to="link.to"
          class="relative py-1.5 text-[15px] font-medium transition-colors hover:text-brand"
        >
          {{ link.label }}
          <span
            v-if="isActive(link)"
            class="absolute inset-x-0 -bottom-1 h-[3px] rounded-sm bg-brand"
          ></span>
        </router-link>
      </nav>

      <div class="flex items-center gap-3">
        <router-link
          class="btn-primary hidden h-11 px-[22px] text-[15px] shadow-none md:inline-flex"
          to="/contact"
        >
          นัดวัดระดับฟรี
        </router-link>
        <button
          :aria-expanded="open"
          aria-label="เมนู"
          class="flex flex-col gap-[5px] p-2.5 lg:hidden"
          @click="open = !open"
        >
          <span
            :class="open ? 'translate-y-[7px] rotate-45' : ''"
            class="h-0.5 w-[22px] bg-ink transition-transform"
          ></span>
          <span
            :class="open ? 'opacity-0' : ''"
            class="h-0.5 w-[22px] bg-ink transition-opacity"
          ></span>
          <span
            :class="open ? 'w-[22px] -translate-y-[7px] -rotate-45' : 'w-3.5'"
            class="h-0.5 bg-ink transition-transform"
          ></span>
        </button>
      </div>
    </div>

    <nav v-if="open" class="border-t border-line bg-cream lg:hidden">
      <div class="wrap flex flex-col py-3">
        <router-link
          v-for="link in links"
          :key="link.to"
          :class="isActive(link) ? 'text-brand' : 'text-ink'"
          :to="link.to"
          class="border-b border-line py-4 text-lg font-medium last:border-0"
        >
          {{ link.label }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import BrandLogo from './BrandLogo.vue'

export default {
  name: 'SiteNav',
  components: { BrandLogo },
  data() {
    return {
      open: false,
      links: [
        { label: 'หน้าแรก', to: '/' },
        { label: 'เกี่ยวกับเรา', to: '/about' },
        { label: 'หลักสูตร', to: '/courses' },
        { label: 'ข่าวสาร', to: '/news' },
        { label: 'ติดต่อเรา', to: '/contact' }
      ]
    }
  },
  watch: {
    $route() {
      this.open = false
    }
  },
  methods: {
    isActive(link) {
      const path = this.$route.path
      return link.to === '/' ? path === '/' : path.startsWith(link.to)
    }
  }
}
</script>
