<template>
  <!-- the 4-window mark from the Brighton logo -->
  <svg aria-hidden="true" viewBox="0 0 100 100">
    <path
      :fill="color"
      d="M0 0h100v100H0z M12 12v32h32V12z M56 12v32h32V12z M12 56v32h32V56z M56 56v32h32V56z"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  name: 'BrandMark',
  props: {
    color: { type: String, default: '#BE1E2D' }
  }
}
</script>
