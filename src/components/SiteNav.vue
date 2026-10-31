<template>
  <!-- After bebetter.education: at the top of the page the bar is flat and as wide as
       the content; once the page scrolls it shrinks into a floating pill, drops a little,
       picks up a frosted background and shadow, and the booking button springs in.
       The header keeps one height throughout, so nothing below it moves. -->
  <!-- flow-root keeps the bar's top margin inside the header (no margin collapse), so
       the floating pill keeps its gap from the top of the screen -->
  <header class="sticky top-0 z-50 flow-root h-[72px] md:h-[88px]">
    <div
      :data-pill="pill || null"
      class="nav-bar relative mx-auto flex items-center justify-between gap-3 rounded-full"
    >
      <router-link aria-label="Brighton Language Academy" class="flex-none" to="/">
        <BrandLogo :small="true" class="md:hidden" />
        <BrandLogo class="hidden md:block" />
      </router-link>

      <nav ref="links" class="relative hidden items-center lg:flex" @mouseleave="hovered = null">
        <!-- one highlight that glides to the hovered item, and rests on the current one -->
        <span
          :style="{
            width: `${hl.w}px`,
            transform: `translateX(${hl.x}px)`,
            opacity: hl.on ? 1 : 0
          }"
          aria-hidden="true"
          class="nav-hl pointer-events-none absolute left-0 top-1/2 -mt-5 h-10 rounded-full bg-sunsoft"
        ></span>
        <router-link
          v-for="(link, i) in desktopLinks"
          :key="link.label"
          :aria-current="isActive(link) ? 'location' : null"
          :class="isActive(link) ? 'text-ink' : 'text-ink/70'"
          :data-nav-i="i"
          :to="target(link)"
          class="relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-ink xl:px-4"
          @mouseenter="hovered = i"
          @focus="hovered = i"
          @blur="hovered = null"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="flex items-center">
        <a
          :aria-label="`โทร ${contact.phone}`"
          :href="contact.tel"
          :title="`โทร ${contact.phone}`"
          class="hidden h-11 w-11 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-sunsoft hover:text-brand md:inline-flex md:h-12 md:w-12"
        >
          <IconMobile class="h-[22px] w-[22px]" />
        </a>
        <span class="nav-cta hidden md:block">
          <router-link
            :tabindex="pill ? null : -1"
            :to="bookingLink"
            class="btn-primary h-11 px-[22px] text-[15px] shadow-none md:h-12"
          >
            นัดวัดระดับฟรี
          </router-link>
        </span>
        <!-- phones and tablets: back to the top of the home page in one tap -->
        <router-link
          aria-label="หน้าแรก"
          class="ml-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-cream transition-colors hover:bg-sunsoft lg:hidden"
          title="หน้าแรก"
          to="/"
          @click="open = false"
        >
          <BentoIcon class="h-5 w-5" name="home" />
        </router-link>
        <button
          :aria-expanded="open"
          aria-label="เมนู"
          class="ml-1.5 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-cream lg:hidden"
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

    <Transition name="sheet">
      <nav
        v-if="open"
        class="nav-sheet absolute inset-x-2.5 top-full mt-1 grid grid-cols-2 gap-2 rounded-[28px] border border-line bg-white p-2.5 shadow-[0_24px_48px_-28px_rgba(34,28,25,.4)] md:inset-x-10 lg:hidden"
      >
        <router-link
          v-for="(link, i) in links"
          :key="link.label"
          :aria-current="isActive(link) ? 'location' : null"
          :class="isActive(link) ? 'bg-sunsoft' : 'bg-cream'"
          :style="{ '--i': i }"
          :to="target(link)"
          class="sheet-item rounded-[20px] px-4 py-4 text-base font-medium"
          @click="open = false"
        >
          {{ link.label }}
        </router-link>
        <router-link
          :style="{ '--i': links.length }"
          :to="bookingLink"
          class="sheet-item btn-primary col-span-2 h-12 text-base shadow-none"
          @click="open = false"
        >
          นัดวัดระดับภาษาฟรี →
        </router-link>
      </nav>
    </Transition>
  </header>
</template>

<script>
import BentoIcon from './BentoIcon.vue'
import BrandLogo from './BrandLogo.vue'
import IconMobile from './icons/IconMobile.vue'
import { bookingLink, menu } from '@/data/pages'
import { contact } from '@/data/site'

export default {
  name: 'SiteNav',
  components: { BentoIcon, BrandLogo, IconMobile },
  data() {
    return {
      open: false,
      scrolled: false,
      contact,
      // the gliding highlight: which desktop item is hovered, and where the pill sits
      hovered: null,
      hl: { x: 0, w: 0, on: false },
      links: menu,
      bookingLink,
      // on the home page: the section(s) being read, '' above the first one. null until
      // mounted, so the first render matches the pre-rendered page.
      reading: null,
      frame: 0
    }
  },
  computed: {
    // the open menu keeps the bar a pill, so the sheet hangs from a solid edge
    pill() {
      return this.scrolled || this.open
    },
    desktopLinks() {
      return this.links.filter((link) => !link.phone)
    }
  },
  watch: {
    $route() {
      this.open = false
      this.$nextTick(this.spy)
    },
    hovered: 'placeHighlight',
    reading: 'placeHighlight',
    '$route.path': 'placeHighlight'
  },
  mounted() {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.placeHighlight, { passive: true })
    // Kanit arrives after first paint and changes every item's width
    document.fonts?.ready.then(this.placeHighlight)
    this.placeHighlight()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.placeHighlight)
    cancelAnimationFrame(this.frame)
  },
  methods: {
    target(link) {
      if (link.to) return link.to
      return link.hash ? { path: '/', hash: link.hash } : '/'
    },
    onScroll() {
      this.scrolled = window.scrollY > 24
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
    // Move the highlight under the hovered item, or back to the current one.
    placeHighlight() {
      this.$nextTick(() => {
        const nav = this.$refs.links
        if (!nav) return
        let i = this.hovered
        if (i === null) {
          i = this.desktopLinks.findIndex((link) => this.isActive(link))
          if (i < 0) {
            this.hl = { ...this.hl, on: false }
            return
          }
        }
        const el = nav.querySelector(`[data-nav-i="${i}"]`)
        if (!el) return
        this.hl = { x: el.offsetLeft, w: el.offsetWidth, on: true }
      })
    },
    isActive(link) {
      const path = this.$route.path
      if (path !== '/') return link.pages.some((p) => path === p || path.startsWith(`${p}/`))
      return this.reading ? this.reading.includes(link.hash) : link.hash === ''
    }
  }
}
</script>

<style scoped>
/* Flat bar at the top of the page: as wide as the page content, no background. */
.nav-bar {
  width: calc(100% - 40px);
  max-width: 1168px;
  height: 64px;
  margin-top: 4px;
  padding: 0 2px;
  background-color: rgb(255 255 255 / 0);
  box-shadow:
    0 0 0 1px rgb(34 28 25 / 0),
    inset 0 1px 0 rgb(255 255 255 / 0),
    0 18px 40px -26px rgb(34 28 25 / 0);
}
@media (min-width: 768px) {
  .nav-bar {
    width: calc(100% - 80px);
    height: 78px;
    margin-top: 5px;
  }
}
@media (min-width: 1024px) {
  .nav-bar {
    width: calc(100% - 112px);
  }
}

/* Scrolled: a narrower floating pill with a frosted background. */
.nav-bar[data-pill] {
  width: calc(100% - 20px);
  height: 56px;
  margin-top: 8px;
  padding: 0 7px 0 16px;
  /* clear glass: mostly see-through, a light blur, and a bright inner edge */
  background-color: rgb(255 255 255 / 0.5);
  box-shadow:
    0 0 0 1px rgb(34 28 25 / 0.07),
    inset 0 1px 0 rgb(255 255 255 / 0.7),
    0 18px 40px -26px rgb(34 28 25 / 0.4);
  -webkit-backdrop-filter: blur(10px) saturate(1.8);
  backdrop-filter: blur(10px) saturate(1.8);
}
@media (min-width: 768px) {
  .nav-bar[data-pill] {
    width: calc(100% - 64px);
    max-width: 1080px;
    height: 64px;
    margin-top: 12px;
    padding: 0 8px 0 22px;
  }
}

/* the booking button only shows on the pill, springing in from nothing */
.nav-cta {
  max-width: 0;
  margin-left: -6px;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.9);
  visibility: hidden;
}
.nav-bar[data-pill] .nav-cta {
  max-width: 200px;
  margin-left: 2px;
  opacity: 1;
  transform: none;
  visibility: visible;
}

@media (prefers-reduced-motion: no-preference) {
  .nav-bar {
    --out: cubic-bezier(0.19, 1, 0.22, 1);
    transition:
      width 0.7s var(--out),
      max-width 0.7s var(--out),
      height 0.5s var(--out),
      margin 0.5s var(--out),
      padding 0.5s var(--out),
      background-color 0.4s,
      box-shadow 0.4s;
  }
  .nav-cta {
    transition:
      max-width 0.5s cubic-bezier(0.19, 1, 0.22, 1),
      margin 0.5s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s ease,
      transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
      visibility 0.3s;
  }
  .nav-hl {
    transition:
      transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
      width 0.45s cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 0.25s;
  }
  /* phone menu: the sheet fades in and its tiles rise one after another */
  .sheet-enter-active,
  .sheet-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .sheet-enter-from,
  .sheet-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  .sheet-enter-active .sheet-item {
    animation: sheet-item 0.45s cubic-bezier(0.19, 1, 0.22, 1) backwards;
    animation-delay: calc(var(--i) * 45ms + 60ms);
  }
}
@keyframes sheet-item {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
</style>
