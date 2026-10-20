<template>
  <div class="min-h-screen overflow-x-clip bg-cream">
    <SiteNav />
    <RouterView :route="base" />
    <FeedPage
      v-for="item in items"
      :key="item.path"
      :ref="(page) => (item.el = page?.$el)"
      :active="$route.path === item.path"
      :component="item.component"
      :label="item.label"
    />
    <SiteFooter v-if="!hidesFooter" />
    <MobileActionBar v-if="$route.name !== 'contact'" />
    <BackToTop :above-bar="$route.name !== 'contact'" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { SITE_URL } from '@/data/pages'
import { jsonLd, school } from '@/data/schema'
import { usePageFeed } from '@/composables/usePageFeed'
import BackToTop from '@/components/BackToTop.vue'
import FeedPage from '@/components/FeedPage.vue'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import MobileActionBar from '@/components/MobileActionBar.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    BackToTop,
    FeedPage,
    SiteNav,
    SiteFooter,
    MobileActionBar
  },
  setup() {
    const route = useRoute()
    const url = computed(() => SITE_URL + route.path)
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
        },
        { property: 'og:url', content: url }
      ],
      link: [{ rel: 'canonical', href: url }],
      script: [jsonLd(school)]
    })
    return usePageFeed()
  }
}
</script>
