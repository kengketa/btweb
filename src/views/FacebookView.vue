<template>
  <div class="facebook-view">
    <FacebookFeed />
  </div>
</template>

<script>
import FacebookFeed from '@/components/FacebookFeed.vue';

export default {
  components: {
    FacebookFeed,
  },
};
</script>

<style scoped>
.facebook-view {
  padding: 20px;
}
</style>
