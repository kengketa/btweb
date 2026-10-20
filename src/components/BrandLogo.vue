<template>
  <img
    :class="small ? 'h-6' : 'h-8'"
    alt="Brighton Language Academy"
    class="block w-auto"
    height="96"
    src="@/assets/images/brighton-logo.webp"
    width="480"
  />
</template>

<script>
export default {
  name: 'BrandLogo',
  props: {
    small: { type: Boolean, default: false }
  }
}
</script>
