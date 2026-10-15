<template>
  <div class="min-h-screen overflow-x-clip bg-cream">
    <SiteNav />
    <RouterView />
    <SiteFooter />
    <MobileActionBar v-if="$route.name !== 'contact'" />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import MobileActionBar from '@/components/MobileActionBar.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    SiteNav,
    SiteFooter,
    MobileActionBar
  },
  setup() {
    useHead({
      title: 'Brighton Language Academy - เรียนภาษาอังกฤษ พะเยา',
      meta: [
        {
          name: 'description',
          content: 'โรงเรียนสอนภาษาอังกฤษ ไบรท์ตัน พะเยา สอนสดโดยครูเจ้าของภาษา'
        },
        {
          name: 'keywords',
          content: 'เรียนภาษาอังกฤษ พะเยา, สอนภาษาอังกฤษ, โรงเรียนสอนภาษา, Brighton, Phayao'
        }
      ]
    })
  }
}
</script>
