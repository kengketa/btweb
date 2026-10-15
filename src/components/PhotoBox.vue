<template>
  <div class="ph relative overflow-hidden">
    <img
      v-if="src && !failed"
      :alt="alt"
      :src="src"
      :style="{ objectPosition: position }"
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      @error="failed = true"
    />
    <slot />
  </div>
</template>

<script>
// Feed photos are signed Facebook CDN links that can expire, so a photo that fails
// to load leaves the striped placeholder showing.
export default {
  name: 'PhotoBox',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    position: { type: String, default: 'center' }
  },
  data() {
    return { failed: false }
  },
  watch: {
    src() {
      this.failed = false
    }
  }
}
</script>
