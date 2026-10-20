<template>
  <div class="ph relative overflow-hidden">
    <img
      v-if="src && !failed"
      :alt="alt"
      :fetchpriority="priority ? 'high' : undefined"
      :loading="priority ? 'eager' : 'lazy'"
      :sizes="srcset && sizes"
      :src="src"
      :srcset="srcset"
      :style="{ objectPosition: position }"
      class="absolute inset-0 h-full w-full object-cover"
      decoding="async"
      @error="failed = true"
    />
    <slot />
  </div>
</template>

<script>
// Our own photos have WebP copies 480, 960 and 1600px wide (scripts/responsive-images.mjs),
// so the browser picks the smallest that is sharp at `sizes`, the width the photo is shown at.
const OWN_PHOTO =
  /^\/images\/(1_home|2_about_us|3_courses|4_camp)\/[^/]+\.jpg$|^\/images\/cover-brighton\.jpg$/
const WIDTHS = [480, 960, 1600]

// Feed photos are signed Facebook CDN links that can expire, so a photo that fails
// to load leaves the striped placeholder showing.
export default {
  name: 'PhotoBox',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    position: { type: String, default: 'center' },
    sizes: { type: String, default: '(min-width: 768px) 50vw, 100vw' },
    // a photo in the first screen: load it straight away instead of lazily
    priority: { type: Boolean, default: false }
  },
  data() {
    return { failed: false }
  },
  computed: {
    srcset() {
      if (!OWN_PHOTO.test(this.src)) return undefined
      const base = this.src.slice(0, -'.jpg'.length)
      return WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
    }
  },
  watch: {
    src() {
      this.failed = false
    }
  }
}
</script>
