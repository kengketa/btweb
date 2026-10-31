<template>
  <main>
    <section
      class="wrap flex flex-col justify-between gap-6 pb-6 pt-10 md:pb-8 md:pt-16 lg:flex-row lg:items-end lg:gap-10"
    >
      <SectionHead
        :count="loaded && posts.length ? `${posts.length} โพสต์` : ''"
        :level="1"
        eyebrow="News & Events"
        icon="megaphone"
        sub="ประกาศ กิจกรรม และความเคลื่อนไหวล่าสุดจากเพจ Facebook ของ Brighton"
        title="ข่าวสารและกิจกรรม"
        tone="brand"
      />
      <div class="-mx-5 flex flex-none gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
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

    <!-- loading: the same 7/5 + 4/4/4 shape the posts will take -->
    <section
      v-if="!loaded"
      class="wrap grid grid-cols-1 gap-4 pb-24 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
    >
      <div
        v-for="n in 5"
        :key="n"
        :class="n === 1 ? 'lg:col-span-7' : n === 2 ? 'lg:col-span-5' : 'lg:col-span-4'"
        class="ph h-[300px] animate-pulse rounded-[28px] md:rounded-[32px]"
      ></div>
    </section>

    <!-- nothing to show -->
    <section v-else-if="!lead.length" class="wrap pb-24">
      <BentoCard icon="megaphone" sub="ยังไม่มีข่าวในหมวดนี้" title="ไม่พบข่าว" tone="paper">
        <a :href="contact.facebook" class="link-arrow" rel="noopener" target="_blank"
          >ดูความเคลื่อนไหวบน Facebook →</a
        >
      </BentoCard>
    </section>

    <template v-else>
      <!-- the two newest posts as a wide + narrow pair, the rest in rows of three -->
      <section
        v-reveal="{ stagger: 80 }"
        class="wrap grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 md:gap-5 md:pb-5 lg:grid-cols-12"
      >
        <BentoCard
          v-for="(n, i) in lead"
          :key="n.id"
          :class="
            lead.length === 1
              ? 'md:col-span-2 lg:col-span-12'
              : i === 0
                ? 'lg:col-span-7'
                : 'lg:col-span-5'
          "
          :href="n.url"
          :tone="i === 0 ? 'white' : 'sun'"
        >
          <div class="flex flex-1 flex-col gap-5">
            <PhotoBox
              :alt="n.title"
              :src="n.images[0]"
              class="h-[220px] rounded-[20px] md:h-[300px] md:rounded-[24px]"
              sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
            />
            <div class="flex items-center gap-3 text-sm">
              <span
                :class="i === 0 ? 'bg-sun text-ink' : 'bg-ink text-sun'"
                class="rounded-full px-3 py-1 font-semibold"
                >{{ n.category }}</span
              >
              <span :class="i === 0 ? 'text-muted' : 'text-body'">{{ n.date }}</span>
            </div>
            <h2 class="line-clamp-3 font-display text-xl font-bold leading-[1.45] md:text-[26px]">
              {{ n.title }}
            </h2>
            <p
              v-if="i === 0"
              class="line-clamp-3 text-[15px] leading-[1.75] text-muted md:text-base"
            >
              {{ n.excerpt }}
            </p>
          </div>
          <template #foot
            ><span :class="i === 0 ? 'link-arrow' : 'font-semibold text-ink'"
              >อ่านต่อบน Facebook →</span
            ></template
          >
        </BentoCard>
      </section>

      <section
        v-if="rest.length"
        v-reveal="{ stagger: 70 }"
        class="wrap grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
      >
        <BentoCard v-for="n in rest" :key="n.id" :href="n.url">
          <div class="flex flex-1 flex-col gap-4">
            <PhotoBox
              :alt="n.title"
              :src="n.images[0]"
              class="h-[200px] rounded-[20px]"
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            />
            <div class="flex gap-2.5 text-[13px]">
              <b class="text-brand">{{ n.category }}</b
              ><span class="text-muted">{{ n.date }}</span>
            </div>
            <h3 class="line-clamp-2 font-display text-lg font-semibold leading-normal md:text-xl">
              {{ n.title }}
            </h3>
          </div>
        </BentoCard>
      </section>

      <div class="wrap pb-16 pt-6 text-center md:pb-[104px]">
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
import BentoCard from '@/components/BentoCard.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import SectionHead from '@/components/SectionHead.vue'
import { useFeed } from '@/composables/useFeed'
import { contact } from '@/data/site'

const ALL = 'ทั้งหมด'

export default {
  name: 'NewsView',
  components: { BentoCard, PhotoBox, SectionHead },
  setup() {
    useHead({
      title: 'ข่าวสารและกิจกรรม - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'ข่าวสาร ประกาศ และกิจกรรมของ Brighton Language Academy โรงเรียนสอนภาษาอังกฤษสำหรับเด็กในพะเยา'
        }
      ]
    })
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
    lead() {
      return this.filtered.slice(0, 2)
    },
    rest() {
      return this.filtered.slice(2, 2 + this.shown)
    },
    hasMore() {
      return this.filtered.length > 2 + this.shown
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
