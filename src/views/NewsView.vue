<template>
  <main>
    <section
      class="wrap flex flex-col justify-between gap-6 pb-8 pt-12 md:pb-10 md:pt-[88px] lg:flex-row lg:items-end lg:gap-10"
    >
      <div class="flex flex-col gap-4">
        <span class="eyebrow">News &amp; Events</span>
        <h1
          class="font-display text-[36px] font-bold leading-[1.35] md:text-[56px] xl:text-[64px] xl:leading-[1.3]"
        >
          ข่าวสารและกิจกรรม
        </h1>
      </div>
      <div class="-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ 'chip-on': filter === cat }"
          class="chip h-10 px-[18px] text-sm"
          @click="setFilter(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- loading -->
    <section v-if="!loaded" class="wrap grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n" class="ph h-[220px] animate-pulse rounded-[22px]"></div>
    </section>

    <!-- nothing to show -->
    <section v-else-if="!featured" class="wrap pb-24">
      <div class="rounded-[32px] border border-line bg-white p-10 text-center">
        <p class="mb-4 text-muted">ยังไม่มีข่าวในหมวดนี้</p>
        <a :href="contact.facebook" class="link-arrow" rel="noopener" target="_blank"
          >ดูความเคลื่อนไหวบน Facebook →</a
        >
      </div>
    </section>

    <template v-else>
      <section class="wrap pb-12 md:pb-16">
        <a
          :href="featured.url"
          class="grid items-center gap-6 rounded-[28px] border border-line bg-white p-3 md:rounded-[32px] md:p-5 lg:grid-cols-[1.35fr_1fr] lg:gap-12"
          rel="noopener"
          target="_blank"
        >
          <PhotoBox
            :alt="featured.title"
            :src="featured.images[0]"
            class="h-[240px] rounded-[20px] md:h-[400px] md:rounded-[22px]"
          />
          <div class="flex flex-col gap-4 px-3 pb-4 md:gap-[18px] lg:pb-0 lg:pr-7">
            <div class="flex items-center gap-3 text-sm">
              <span class="rounded-full bg-sun px-3 py-1 font-semibold">{{
                featured.category
              }}</span>
              <span class="text-muted">{{ featured.date }}</span>
            </div>
            <h2 class="line-clamp-3 font-display text-2xl font-bold leading-[1.45] md:text-[36px]">
              {{ featured.title }}
            </h2>
            <p class="line-clamp-4 text-base leading-[1.75] text-muted">{{ featured.excerpt }}</p>
            <span class="link-arrow">อ่านต่อบน Facebook →</span>
          </div>
        </a>
      </section>

      <section class="wrap grid gap-x-6 gap-y-8 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="n in rest"
          :key="n.id"
          :href="n.url"
          class="flex flex-col gap-3.5 transition-opacity hover:opacity-85"
          rel="noopener"
          target="_blank"
        >
          <PhotoBox :alt="n.title" :src="n.images[0]" class="h-[220px] rounded-[22px]" />
          <div class="flex gap-2.5 text-[13px]">
            <b class="text-brand">{{ n.category }}</b
            ><span class="text-muted">{{ n.date }}</span>
          </div>
          <b
            class="line-clamp-2 font-display text-xl font-semibold leading-normal md:text-[21px]"
            >{{ n.title }}</b
          >
        </a>
      </section>

      <div class="wrap pb-16 text-center md:pb-[104px]">
        <button v-if="hasMore" class="btn-outline h-12 px-8 text-[15px]" @click="shown += 9">
          ดูข่าวเพิ่มเติม
        </button>
        <a v-else :href="contact.facebook" class="link-arrow" rel="noopener" target="_blank">
          ดูโพสต์ทั้งหมดบน Facebook →
        </a>
      </div>
    </template>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import PhotoBox from '@/components/PhotoBox.vue'
import { useFeed } from '@/composables/useFeed'
import { contact } from '@/data/site'

const ALL = 'ทั้งหมด'

export default {
  name: 'NewsView',
  components: { PhotoBox },
  setup() {
    useHead({ title: 'ข่าวสารและกิจกรรม - Brighton Language Academy' })
    const { posts, loaded } = useFeed()
    return { posts, loaded }
  },
  data() {
    return { contact, filter: ALL, shown: 9 }
  },
  computed: {
    categories() {
      return [ALL, ...new Set(this.posts.map((p) => p.category))]
    },
    filtered() {
      return this.posts.filter((p) => this.filter === ALL || p.category === this.filter)
    },
    featured() {
      return this.filtered[0]
    },
    rest() {
      return this.filtered.slice(1, 1 + this.shown)
    },
    hasMore() {
      return this.filtered.length > 1 + this.shown
    }
  },
  methods: {
    setFilter(cat) {
      this.filter = cat
      this.shown = 9
    }
  }
}
</script>
