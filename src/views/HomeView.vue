<template>
  <main>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        class="absolute -bottom-56 -left-44 hidden h-[420px] w-[420px] rounded-full bg-blush lg:block"
      ></div>
      <div
        class="wrap relative grid items-center gap-10 pb-16 pt-8 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20"
      >
        <div class="flex flex-col gap-5 md:gap-7">
          <span
            class="flex items-center gap-2.5 self-start text-[13px] text-muted md:rounded-full md:border md:border-line md:bg-white md:px-4 md:py-2 md:text-sm"
          >
            <span class="h-2 w-2 rounded-full bg-sun"></span>
            โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก · ใจกลางเมืองพะเยา
          </span>
          <h1
            class="font-display text-[36px] font-bold leading-[1.4] tracking-[-0.01em] md:text-5xl md:leading-[1.35] lg:text-[44px] xl:text-[54px] xl:leading-[1.32]"
          >
            <span class="sm:block sm:whitespace-nowrap">ให้ลูกเรียนภาษาอังกฤษ</span>
            <span class="sm:block sm:whitespace-nowrap"
              >อย่าง<span class="whitespace-nowrap text-brand">มีความสุข</span></span
            >
            <span class="sm:block sm:whitespace-nowrap">และใช้ได้จริง</span>
          </h1>
          <p class="max-w-[520px] text-base leading-[1.7] text-muted md:text-lg md:leading-[1.75]">
            Brighton Language Academy โรงเรียนสอนภาษามาตรฐานสากลในพะเยา หลักสูตร Oxford และ Jolly
            Phonics กับครูที่รู้จักและใส่ใจลูกของคุณทุกคน
          </p>
          <div class="flex flex-wrap items-center gap-3.5">
            <router-link class="btn-primary h-14 px-[30px] text-[17px]" to="/contact">
              นัดวัดระดับภาษาฟรี <span>→</span>
            </router-link>
            <router-link class="btn-outline h-14 px-7 text-[17px]" to="/courses">
              ดูหลักสูตร
            </router-link>
          </div>
          <div class="mt-3 hidden items-center gap-7 border-t border-line pt-7 md:flex">
            <div class="flex items-baseline gap-2.5">
              <span class="font-condensed text-[44px] font-bold leading-none text-brand">{{
                years
              }}</span>
              <span class="text-sm leading-[1.4] text-muted">ปีที่ดูแลเด็กๆ<br />ในพะเยา</span>
            </div>
            <div class="h-11 w-px bg-line"></div>
            <router-link :to="{ hash: '#reviews' }" class="group flex items-center gap-3.5">
              <span class="flex -space-x-2.5">
                <span
                  v-for="r in reviews.slice(0, 4)"
                  :key="r.name"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-sm font-semibold text-brand ring-2 ring-cream"
                  >{{ r.initial }}</span
                >
              </span>
              <span class="flex flex-col gap-0.5">
                <span class="font-display text-base font-medium leading-normal"
                  >ผู้ปกครองแนะนำ Brighton</span
                >
                <span class="text-[13px] text-muted group-hover:text-brand"
                  >ดูรีวิวบน Facebook →</span
                >
              </span>
            </router-link>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -right-6 -top-7 hidden h-24 w-24 rounded-lg bg-sun lg:block"></div>
          <div
            class="relative grid grid-cols-2 grid-rows-[150px_150px] gap-2.5 rounded-md bg-brand p-2.5 sm:grid-rows-[220px_220px] lg:grid-rows-[250px_250px] lg:gap-3.5 lg:rounded-lg lg:p-3.5"
          >
            <PhotoBox
              v-for="(src, i) in heroPhotos"
              :key="i"
              :src="src"
              alt="บรรยากาศการเรียนที่ Brighton"
              class="rounded-sm"
            />
          </div>
          <div
            class="absolute -bottom-9 -left-11 hidden h-[136px] w-[136px] -rotate-[10deg] items-center justify-center rounded-full bg-sun text-center shadow-[0_12px_24px_-12px_rgba(0,0,0,.3)] lg:flex"
          >
            <span class="font-condensed text-[17px] font-semibold italic leading-tight">
              Happy<br />learning<br />starts here
            </span>
          </div>
          <div
            class="absolute -bottom-7 right-2 flex h-24 w-24 -rotate-[8deg] flex-col items-center justify-center rounded-full bg-sun lg:hidden"
          >
            <span class="font-condensed text-[30px] font-bold leading-none">{{ years }}</span>
            <span class="text-[11px] font-semibold">ปีในพะเยา</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Welcome -->
    <section class="bg-white py-16 md:py-[104px]">
      <div class="wrap">
        <div class="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div class="flex flex-col gap-3 md:gap-5">
            <span class="eyebrow">Welcome to Our Family</span>
            <h2
              class="font-display text-[22px] font-semibold leading-[1.6] md:text-[40px] md:leading-[1.5]"
              style="text-wrap: balance"
            >
              “เพราะเราเชื่อว่า… ความสุขคือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด”
            </h2>
          </div>
          <p class="text-base leading-[1.85] text-muted md:text-[17px]">
            ที่ Brighton เราไม่ได้เป็นเพียงแค่โรงเรียนสอนภาษา
            แต่เราเป็นพื้นที่แห่งการเรียนรู้ที่ให้ความสำคัญกับ “ความรู้สึก” ของผู้เรียน
            ห้องเรียนที่ลูกกล้าพูดโดยไม่กลัวผิด ได้ลงมือทำผ่านกิจกรรม พร้อมหลักสูตรระดับสากล (Oxford
            &amp; Jolly Phonics) และครูที่ผ่านการคัดเลือกและอบรม
            เพื่อให้ลูกเติบโตอย่างมั่นคงทั้งทักษะภาษาและทัศนคติ
          </p>
        </div>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 md:mt-[72px] lg:grid-cols-4 lg:gap-10">
          <div
            v-for="(item, i) in pillars"
            :key="item.title"
            class="flex flex-col gap-3 border-t-2 border-ink pt-6"
          >
            <span class="font-condensed text-[13px] font-medium text-brand">0{{ i + 1 }}</span>
            <b class="text-[22px] font-semibold">{{ item.title }}</b>
            <span class="text-[15px] leading-[1.7] text-muted">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section class="py-16 md:py-[104px]">
      <div class="wrap mb-6 flex items-end justify-between gap-6 md:mb-10">
        <div class="flex flex-col gap-3">
          <span class="eyebrow">Our Courses</span>
          <h2 class="font-display text-2xl font-bold leading-[1.35] md:text-[44px]">
            หลักสูตรตามช่วงวัย
          </h2>
        </div>
        <router-link class="link-arrow text-sm md:text-base" to="/courses">
          <span class="hidden md:inline">ดูหลักสูตรทั้งหมด</span
          ><span class="md:hidden">ทั้งหมด</span> →
        </router-link>
      </div>
      <div
        class="mx-auto flex max-w-[1280px] snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-10 lg:grid-cols-4 lg:px-14"
      >
        <router-link
          v-for="c in courses"
          :key="c.slug"
          :to="`/courses/${c.slug}`"
          class="flex w-[240px] flex-none snap-start flex-col overflow-hidden rounded-[20px] border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.25)] md:w-auto md:rounded-3xl"
        >
          <div
            :class="toneClass[c.tone]"
            class="flex h-[120px] flex-col justify-between p-5 md:h-[170px] md:p-6"
          >
            <span class="text-[13px] font-semibold opacity-90">{{ c.tag }}</span>
            <span :class="ageFont(c.age)" class="text-[40px] font-bold leading-none md:text-[56px]">
              {{ c.age
              }}<span v-if="c.ageUnit === 'ปี'" class="ml-1.5 text-base md:text-xl">ปี</span>
            </span>
          </div>
          <div class="flex flex-1 flex-col gap-2 p-4 md:gap-2.5 md:p-6">
            <b class="text-[17px] md:text-[21px]">{{ c.name }}</b>
            <span class="text-[13px] font-medium text-brand md:text-sm">{{ c.sub }}</span>
            <span class="hidden flex-1 text-sm leading-[1.7] text-muted md:block">{{
              c.short
            }}</span>
            <span class="mt-1 hidden text-sm font-semibold md:block">ดูรายละเอียด →</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Programs: camp, teachers, MEP/EP, EF -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div class="mb-6 flex flex-col gap-3 md:mb-10">
        <span class="eyebrow">More at Brighton</span>
        <h2 class="font-display text-2xl font-bold leading-[1.35] md:text-[44px]">
          มากกว่าคลาสภาษาอังกฤษ
        </h2>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <router-link
          v-for="p in programs"
          :key="p.slug"
          :to="p.path"
          class="group flex flex-col gap-3 rounded-[20px] border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.25)] md:rounded-3xl md:p-7"
        >
          <b class="font-display text-xl font-semibold group-hover:text-brand md:text-[22px]">{{
            p.label
          }}</b>
          <span class="flex-1 text-[15px] leading-[1.7] text-muted">{{ p.card }}</span>
          <span class="text-sm font-semibold text-brand">ดูรายละเอียด →</span>
        </router-link>
      </div>
    </section>

    <!-- Our story: founder, students, a success story; the full version is on /about -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div
        class="grid gap-8 rounded-3xl bg-ink p-7 text-cream md:rounded-[32px] md:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14"
      >
        <div class="flex flex-col gap-4">
          <span class="font-condensed text-xs font-semibold uppercase tracking-[.14em] text-sun"
            >Our Story</span
          >
          <h2
            class="font-display text-[26px] font-bold leading-[1.4] md:text-[40px]"
            style="text-wrap: balance"
          >
            {{ story.heading }}
          </h2>
          <p class="text-[15px] leading-[1.8] opacity-85 md:text-[17px]">
            ผู้ก่อตั้ง Brighton เคยเรียนภาษาอังกฤษแบบท่องจำจนสื่อสารไม่ได้ ใช้เวลา 5
            ปีในออสเตรเลียจนใช้ภาษาได้จริง แล้วกลับมาพะเยาเพื่อส่งต่อวิธีเรียนแบบนั้นให้เด็กๆ
          </p>
          <router-link class="mt-1 self-start font-semibold text-sun hover:underline" to="/about"
            >อ่านเรื่องราวของเรา →</router-link
          >
        </div>
        <div class="grid grid-cols-2 gap-3 self-center">
          <div
            v-for="[value, label] in storyStats"
            :key="label"
            class="flex flex-col gap-2 rounded-[20px] bg-cream/10 p-5"
          >
            <span
              class="font-condensed text-[36px] font-bold leading-none text-sun md:text-[44px]"
              >{{ value }}</span
            >
            <span class="text-sm leading-[1.5] opacity-85">{{ label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div class="mb-6 flex items-end justify-between gap-6 md:mb-8">
        <h2 class="font-display text-2xl font-bold leading-[1.35] md:text-[44px]">
          บรรยากาศที่ Brighton
        </h2>
        <a
          :href="contact.facebook"
          class="link-arrow text-sm md:text-base"
          rel="noopener"
          target="_blank"
        >
          <span class="hidden md:inline">ติดตามเราบน </span>Facebook →
        </a>
      </div>
      <div
        class="grid grid-cols-2 grid-rows-[140px_140px_140px] gap-2.5 md:grid-cols-4 md:grid-rows-[220px_220px] md:gap-4"
      >
        <PhotoBox
          alt="นักเรียนและครูที่ Brighton"
          :src="photos[4]"
          class="col-span-2 rounded-[18px] md:row-span-2 md:rounded-3xl"
        />
        <PhotoBox
          :src="photos[5]"
          alt="กิจกรรมที่ Brighton"
          class="rounded-[18px] md:rounded-3xl"
        />
        <div class="flex flex-col justify-between rounded-[18px] bg-sun p-5 md:rounded-3xl md:p-6">
          <span class="font-condensed text-xl font-semibold italic leading-[1.3] md:text-[26px]"
            >“I can do it!”</span
          >
          <span class="text-[13px] font-medium md:text-sm">ความมั่นใจที่เห็นได้ทุกคาบเรียน</span>
        </div>
        <PhotoBox
          :src="photos[6]"
          alt="กิจกรรมที่ Brighton"
          class="col-span-2 hidden rounded-3xl md:block"
        />
      </div>
    </section>

    <!-- Reviews -->
    <section id="reviews" class="relative overflow-hidden bg-brand py-16 text-white md:py-24">
      <div
        aria-hidden="true"
        class="absolute -right-16 -top-16 grid grid-cols-[90px_90px] gap-3.5 opacity-[.14]"
      >
        <div v-for="n in 4" :key="n" class="h-[90px] border-[10px] border-white"></div>
      </div>
      <div class="wrap relative">
        <div class="grid items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div class="flex flex-col gap-4">
            <span
              class="text-xs font-semibold uppercase tracking-[.14em] opacity-85 md:text-[13px]"
            >
              เสียงจากผู้ปกครอง
            </span>
            <h2
              class="font-display text-[28px] font-bold leading-[1.4] md:text-[44px] md:leading-[1.35]"
            >
              ผู้ปกครองแนะนำ Brighton
            </h2>
            <p class="max-w-[520px] text-[15px] leading-[1.75] opacity-90 md:text-[17px]">
              รีวิวจากผู้ปกครองบนเพจ Facebook ของโรงเรียน
            </p>
          </div>
          <div class="flex items-center gap-5 rounded-[20px] bg-sun p-6 text-ink md:p-[26px]">
            <span class="font-condensed text-[56px] font-bold leading-none">{{ years }}</span>
            <span class="text-[15px] font-medium leading-normal">
              ปีที่ครอบครัวในพะเยา<br />ไว้วางใจ Brighton
            </span>
          </div>
        </div>

        <!-- comments vary a lot in length, so cards flow down columns instead of rows -->
        <div class="mt-10 gap-3 sm:columns-2 md:mt-12 md:gap-4 lg:columns-3">
          <figure
            v-for="r in reviews"
            :key="r.name"
            class="mb-3 break-inside-avoid rounded-[20px] bg-white p-5 text-ink md:mb-4 md:p-6"
          >
            <blockquote
              :title="r.text"
              class="line-clamp-3 whitespace-pre-line text-sm font-light italic leading-[1.75] text-[#7D736D] md:text-[15px]"
            >
              “{{ r.text }}”
            </blockquote>
            <figcaption class="mt-5 flex items-center gap-3">
              <span
                class="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-blush text-[15px] font-semibold text-brand"
                >{{ r.initial }}</span
              >
              <span class="flex min-w-0 flex-col">
                <b class="truncate text-[15px]">{{ r.name }}</b>
                <span aria-label="5 ดาว" class="mt-0.5 flex items-center gap-1.5" role="img">
                  <IconFacebook class="h-3.5 w-3.5 flex-none text-[#1877F2]" />
                  <span class="flex gap-0.5 text-sun">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      aria-hidden="true"
                      class="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9L10 1.5z"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </figcaption>
          </figure>
        </div>

        <a
          :href="contact.reviews"
          class="mt-8 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline md:mt-10"
          rel="noopener"
          target="_blank"
        >
          อ่านรีวิวทั้งหมดบน Facebook →
        </a>
      </div>
    </section>

    <!-- Booking CTA -->
    <section class="wrap py-16 md:py-24">
      <div
        class="grid items-center gap-8 rounded-3xl border border-line bg-white p-7 md:rounded-[32px] md:p-14 lg:grid-cols-[1.3fr_1fr] lg:gap-12"
      >
        <div class="flex flex-col gap-4">
          <h2 class="font-display text-[26px] font-bold leading-[1.35] md:text-[44px]">
            มาลองเรียนกับเราก่อน
          </h2>
          <p class="max-w-[520px] text-[15px] leading-[1.75] text-muted md:text-[17px]">
            นัดวัดระดับภาษาฟรี ครูจะพูดคุยกับลูกและแนะนำคลาสที่เหมาะกับวัยและพื้นฐานของลูกมากที่สุด
          </p>
        </div>
        <div class="flex flex-col gap-3.5">
          <router-link class="btn-primary h-[58px] text-[17px] shadow-none" to="/contact">
            นัดวัดระดับภาษาฟรี →
          </router-link>
          <div class="grid gap-3 sm:grid-cols-[auto_1fr]">
            <a
              :href="contact.tel"
              class="flex flex-col gap-2 rounded-2xl bg-cream px-4 py-3.5 sm:px-[18px]"
            >
              <span class="flex items-center gap-2 whitespace-nowrap text-xs text-muted">
                <span
                  class="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-brand"
                >
                  <IconMobile class="h-[18px] w-[18px]" />
                </span>
                โทรหาเรา
              </span>
              <b class="whitespace-nowrap text-[15px]">{{ contact.phone }}</b>
            </a>
            <a
              :href="contact.facebook"
              class="flex flex-col gap-2 rounded-2xl bg-cream px-4 py-3.5 sm:px-[18px]"
              rel="noopener"
              target="_blank"
            >
              <span class="flex items-center gap-2 whitespace-nowrap text-xs text-muted">
                <span
                  class="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[#1877F2]"
                >
                  <IconFacebook class="h-5 w-5" />
                </span>
                เพจ Facebook
              </span>
              <b class="whitespace-nowrap text-[15px]">{{ contact.facebookName }}</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import PhotoBox from '@/components/PhotoBox.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconMobile from '@/components/icons/IconMobile.vue'
import { useRandomPhotos } from '@/composables/useRandomPhotos'
import { contact, yearsLabel } from '@/data/site'
import { founderStory, studentsLabel } from '@/data/about'
import reviewList from '@/data/reviews.json'
import { ageFont, courses, toneClass } from '@/data/courses'
import { homePhotos } from '@/data/photos'
import { programs } from '@/data/programs'

export default {
  name: 'HomeView',
  components: { PhotoBox, IconFacebook, IconMobile },
  setup() {
    useHead({
      title: 'เรียนภาษาอังกฤษ พะเยา สำหรับเด็ก กับครูเจ้าของภาษา - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content:
            'โรงเรียนสอนภาษาอังกฤษสำหรับเด็กในพะเยา เรียนพิเศษกับครูเจ้าของภาษา หลักสูตร Oxford และ Jolly Phonics ค่ายภาษาอังกฤษช่วงปิดเทอม และติวเสริม MEP / EP วัดระดับฟรี'
        }
      ]
    })
    // 4 for the hero grid, 3 for the gallery
    const photos = useRandomPhotos(homePhotos, 7)
    const heroPhotos = computed(() => photos.value.slice(0, 4))
    return { photos, heroPhotos }
  },
  data() {
    return {
      contact,
      // only reviews with a written comment are shown
      reviews: reviewList
        .filter((r) => r.text?.trim())
        .map((r) => ({
          ...r,
          initial: Array.from(r.name)[0]
        })),
      years: yearsLabel,
      story: founderStory,
      storyStats: [
        [yearsLabel, 'ปีที่ดูแลเด็กๆ ในพะเยา'],
        [studentsLabel, 'นักเรียนที่เรียนกับเรา'],
        ['3', 'ขวบ ก็เริ่มเรียนกับเราได้แล้ว'],
        ['8.0', 'IELTS ของศิษย์เก่าที่เริ่มเรียนกับเราตอน 3 ขวบ']
      ],
      courses,
      programs,
      toneClass,
      ageFont,
      pillars: [
        {
          title: 'หลักสูตรมาตรฐานสากล',
          desc: 'Oxford และ Jolly Phonics เรียนผ่านกิจกรรม Active Learning เกม งานศิลปะและงานประดิษฐ์ ไม่ใช่การท่องจำ'
        },
        {
          title: 'ครูเจ้าของภาษา',
          desc: 'ครูที่ใช้ภาษาอังกฤษเป็นภาษาแรก มีพื้นฐานด้านการศึกษา และผ่านการอบรมของ Brighton'
        },
        {
          title: 'กล้าพูด ไม่กลัวผิด',
          desc: 'ห้องเรียนแบบ Can Do Attitude ตอบผิดได้ ครูและเพื่อนช่วยกันให้กำลังใจ ลูกจึงกล้าใช้ภาษาอย่างมั่นใจ'
        },
        {
          title: 'วัดระดับก่อนเรียน',
          desc: 'วัดระดับก่อนเริ่มเรียน ติดตามผลตลอดปี และสอบเลื่อนระดับทุกปี เห็นพัฒนาการของลูกชัดเจน'
        }
      ]
    }
  }
}
</script>
