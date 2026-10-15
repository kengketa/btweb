<template>
  <div class="ph relative overflow-hidden">
    <img
      v-if="current"
      :alt="alt"
      :src="current"
      :style="{ objectPosition: usingFallback ? fallbackPosition || position : position }"
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      @error="onError"
    />
    <slot />
  </div>
</template>

<script>
// Feed photos are signed Facebook CDN links that can expire, so fall back to the
// local cover photo, then to the striped placeholder.
export default {
  name: 'PhotoBox',
  props: {
    src: { type: String, default: '' },
    fallback: { type: String, default: '/images/cover.jpg' },
    alt: { type: String, default: '' },
    position: { type: String, default: 'center' },
    fallbackPosition: { type: String, default: '' }
  },
  data() {
    return { failures: 0 }
  },
  computed: {
    current() {
      const chain = [this.src, this.fallback].filter(Boolean)
      return chain[this.failures] || null
    },
    usingFallback() {
      return this.current === this.fallback
    }
  },
  watch: {
    src() {
      this.failures = 0
    }
  },
  methods: {
    onError() {
      this.failures++
    }
  }
}
</script>
