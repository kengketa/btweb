<template>
  <!-- a floating pill bar, after bebetter.education -->
  <header class="sticky top-0 z-50 pt-2.5 md:pt-4">
    <div class="wrap">
      <div
        :class="scrolled ? 'shadow-[0_18px_40px_-24px_rgba(34,28,25,.35)]' : ''"
        class="relative flex h-14 items-center justify-between gap-4 rounded-full border border-line bg-white/85 pl-5 pr-2 backdrop-blur-md transition-shadow md:h-16 md:pl-6"
      >
        <router-link aria-label="Brighton Language Academy" class="flex-none" to="/">
          <BrandLogo :small="true" class="md:hidden" />
          <BrandLogo class="hidden md:block" />
        </router-link>

        <nav class="hidden items-center gap-1 lg:flex">
          <router-link
            v-for="link in desktopLinks"
            :key="link.label"
            :aria-current="isActive(link) ? 'location' : null"
            :class="isActive(link) ? 'bg-sunsoft text-ink' : 'text-ink/75 hover:bg-cream'"
            :to="target(link)"
            class="rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors xl:px-4"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <div class="flex items-center gap-1.5">
          <router-link
            :to="bookingLink"
            class="btn-primary hidden h-11 px-[22px] text-[15px] shadow-none md:inline-flex md:h-12"
          >
            นัดวัดระดับฟรี
          </router-link>
          <button
            :aria-expanded="open"
            aria-label="เมนู"
            class="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-cream lg:hidden"
            @click="open = !open"
          >
            <span
              :class="open ? 'translate-y-[7px] rotate-45' : ''"
              class="h-0.5 w-[18px] bg-ink transition-transform"
            ></span>
            <span
              :class="open ? 'opacity-0' : ''"
              class="h-0.5 w-[18px] bg-ink transition-opacity"
            ></span>
            <span
              :class="open ? '-translate-y-[7px] -rotate-45' : ''"
              class="h-0.5 w-[18px] bg-ink transition-transform"
            ></span>
          </button>
        </div>
      </div>

      <nav
        v-if="open"
        class="mt-2 grid grid-cols-2 gap-2 rounded-[28px] border border-line bg-white p-2.5 shadow-[0_24px_48px_-28px_rgba(34,28,25,.4)] lg:hidden"
      >
        <router-link
          v-for="link in links"
          :key="link.label"
          :aria-current="isActive(link) ? 'location' : null"
          :class="isActive(link) ? 'bg-sunsoft' : 'bg-cream'"
          :to="target(link)"
          class="rounded-[20px] px-4 py-4 text-base font-medium"
          @click="open = false"
        >
          {{ link.label }}
        </router-link>
        <router-link
          :to="bookingLink"
          class="btn-primary col-span-2 h-12 text-base shadow-none"
          @click="open = false"
        >
          นัดวัดระดับภาษาฟรี →
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import BrandLogo from './BrandLogo.vue'
import { bookingLink, menu } from '@/data/pages'

export default {
  name: 'SiteNav',
  components: { BrandLogo },
  data() {
    return {
      open: false,
      scrolled: false,
      links: menu,
      bookingLink,
      // on the home page: the section(s) being read, '' above the first one. null until
      // mounted, so the first render matches the pre-rendered page.
      reading: null,
      frame: 0
    }
  },
  computed: {
    desktopLinks() {
      return this.links.filter((link) => !link.phone)
    }
  },
  watch: {
    $route() {
      this.open = false
      this.$nextTick(this.spy)
    }
  },
  mounted() {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    cancelAnimationFrame(this.frame)
  },
  methods: {
    target(link) {
      return link.hash ? { path: '/', hash: link.hash } : '/'
    },
    onScroll() {
      this.scrolled = window.scrollY > 8
      if (!this.frame) this.frame = requestAnimationFrame(this.spy)
    },
    // Scroll spy: the section being read is the last one whose top has passed just below
    // the nav. Hall of Fame and the LINE app sit side by side on desktop, so every target
    // starting at that same line counts.
    spy() {
      this.frame = 0
      if (this.$route.path !== '/') {
        this.reading = null
        return
      }
      const line = 140
      const tops = this.links
        .filter((link) => link.hash)
        .map((link) => {
          const el = document.querySelector(link.hash)
          return el && [link.hash, el.getBoundingClientRect().top]
        })
        .filter((entry) => entry && entry[1] <= line)
      if (!tops.length) {
        this.reading = ['']
        return
      }
      const last = Math.max(...tops.map(([, top]) => top))
      this.reading = tops.filter(([, top]) => last - top < 4).map(([hash]) => hash)
    },
    isActive(link) {
      const path = this.$route.path
      if (path !== '/') return link.pages.some((p) => path === p || path.startsWith(`${p}/`))
      return this.reading ? this.reading.includes(link.hash) : link.hash === ''
    }
  }
}
</script>
