<template>
  <main>
    <section
      class="wrap grid items-end gap-6 pb-10 pt-12 md:pb-14 md:pt-[88px] lg:grid-cols-[1.2fr_1fr] lg:gap-16"
    >
      <div class="flex flex-col gap-4">
        <span class="eyebrow">About Brighton</span>
        <h1
          class="font-display text-[36px] font-bold leading-[1.35] md:text-[56px] xl:text-[64px] xl:leading-[1.3]"
        >
          มากกว่าโรงเรียน…<br />คือ<span class="text-brand">บ้าน</span>แห่งการเรียนรู้
        </h1>
      </div>
      <p class="text-base leading-[1.8] text-muted md:text-lg" style="text-wrap: pretty">
        Brighton Language Academy ดูแลเด็กๆ ในพะเยามากว่า {{ years }} ปี มีนักเรียนมาแล้วกว่า
        {{ students }} คน ตั้งแต่วัย 3 ขวบ ด้วยความตั้งใจให้ทุกคนได้ใช้ภาษาอังกฤษเป็นทักษะจริง
        ไม่ใช่แค่วิชาที่ต้องท่องจำ ในห้องเรียนที่ปลอดภัย อบอุ่น และสนุก
      </p>
    </section>

    <div class="wrap relative">
      <PhotoBox
        :src="cover"
        alt="นักเรียนและครูที่ Brighton Language Academy"
        class="h-[260px] rounded-3xl md:h-[440px] md:rounded-[28px]"
        position="center 35%"
      />
      <div
        class="absolute -bottom-10 left-9 flex items-center gap-4 rounded-3xl bg-sun px-6 py-5 shadow-[0_20px_40px_-24px_rgba(0,0,0,.35)] md:-bottom-12 md:left-24 md:gap-5 md:px-8 md:py-7"
      >
        <span class="font-condensed text-5xl font-bold leading-none md:text-[64px]">{{
          years
        }}</span>
        <span class="text-sm font-medium leading-normal md:text-base"
          >ปีแห่งการดูแล<br />เด็กๆ ในพะเยา</span
        >
      </div>
    </div>

    <!-- Founder's story -->
    <section
      class="wrap grid gap-8 pb-16 pt-24 md:pb-24 md:pt-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20"
    >
      <div class="flex flex-col gap-4">
        <span class="eyebrow">Our Story</span>
        <h2
          class="font-display text-[28px] font-bold leading-[1.4] md:text-[40px]"
          style="text-wrap: balance"
        >
          {{ story.heading }}
        </h2>
      </div>
      <article class="flex flex-col gap-5 md:gap-6">
        <p
          v-for="(text, i) in story.paragraphs"
          :key="i"
          class="text-base leading-[1.95] text-body md:text-lg"
          style="text-wrap: pretty"
        >
          {{ text }}
        </p>
        <figure class="mt-2 rounded-3xl bg-brand p-7 text-white md:p-9">
          <blockquote
            class="font-display text-lg font-medium leading-[1.7] md:text-[22px]"
            style="text-wrap: pretty"
          >
            “{{ story.quote }}”
          </blockquote>
          <figcaption class="mt-4 text-sm opacity-85">
            ผู้ก่อตั้ง Brighton Language Academy
          </figcaption>
        </figure>
      </article>
    </section>

    <section class="bg-white py-14 md:py-20">
      <div class="wrap grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
        <div
          v-for="[value, label] in stats"
          :key="label"
          class="flex flex-col gap-2 border-t-2 border-ink pt-5"
        >
          <span
            class="font-condensed text-[44px] font-bold leading-none text-brand md:text-[56px]"
            >{{ value }}</span
          >
          <span class="text-[15px] leading-[1.5] text-muted">{{ label }}</span>
        </div>
      </div>
    </section>

    <section class="wrap py-16 md:py-[104px]">
      <h2 class="mb-7 font-display text-[28px] font-bold leading-[1.4] md:mb-9 md:text-[40px]">
        วิธีการสอนของเรา
      </h2>
      <div class="grid gap-3 rounded-[10px] bg-brand p-3 md:grid-cols-2 md:gap-4 md:p-4">
        <div
          v-for="(m, i) in methods"
          :key="m.title"
          class="flex flex-col gap-3 rounded bg-cream p-6 md:p-9"
        >
          <span class="font-condensed text-[13px] font-medium text-brand"
            >0{{ i + 1 }} — {{ m.en }}</span
          >
          <b class="text-[22px] md:text-2xl">{{ m.title }}</b>
          <span class="text-[15px] leading-[1.7] text-muted">{{ m.desc }}</span>
        </div>
      </div>
    </section>

    <!-- Teachers -->
    <section class="wrap grid gap-8 pb-16 md:pb-[104px] lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <div class="flex flex-col gap-4">
        <span class="eyebrow">Our Teachers</span>
        <h2 class="font-display text-[28px] font-bold leading-[1.4] md:text-[40px]">
          ครูของเรา คัดเลือกและอบรมอย่างไร
        </h2>
        <router-link class="link-arrow text-base" to="/teachers"
          >ดูทีมครูชาวต่างชาติของเรา →</router-link
        >
      </div>
      <div class="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <div
          v-for="[title, text] in teacherStandards"
          :key="title"
          class="flex items-start gap-3.5"
        >
          <span class="mt-2 h-3 w-3 flex-none rounded-sm bg-sun"></span>
          <span class="flex flex-col gap-1">
            <b class="text-lg">{{ title }}</b>
            <span class="text-[15px] leading-[1.75] text-muted">{{ text }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Success story -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div
        class="grid gap-6 rounded-3xl bg-sun p-7 md:rounded-[32px] md:p-14 lg:grid-cols-[1fr_1.3fr] lg:gap-14"
      >
        <div class="flex flex-col gap-3">
          <span class="font-condensed text-xs font-semibold uppercase tracking-[.14em]"
            >Success Story</span
          >
          <h2
            class="font-display text-[28px] font-bold leading-[1.4] md:text-[40px]"
            style="text-wrap: balance"
          >
            {{ success.heading }}
          </h2>
        </div>
        <div class="flex flex-col gap-4 text-base leading-[1.85] md:text-[17px]">
          <p>{{ success.text }}</p>
          <p class="text-body">{{ success.note }}</p>
        </div>
      </div>
    </section>

    <!-- Team culture -->
    <section class="wrap grid gap-8 pb-16 md:pb-[104px] lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <div class="flex flex-col gap-4">
        <span class="eyebrow">Our Team</span>
        <h2 class="font-display text-[24px] font-bold leading-[1.4] md:text-[40px]">
          ครูมีความสุข
        </h2>
        <h2 class="font-display text-[24px] font-bold leading-[1.0] md:text-[40px] px-8">
          ลูกก็มีความสุข...
        </h2>
        <p class="text-base leading-[1.8] text-muted md:text-[17px]">
          เราเชื่อว่าห้องเรียนที่ดี เริ่มจากการดูแลคนที่สอนให้ดีที่สุด
          เพราะครูที่มีเวลาและมีแรงบันดาลใจ จะส่งต่อสิ่งเหล่านั้นให้นักเรียน
        </p>
      </div>
      <div class="flex flex-col">
        <div
          v-for="[title, text] in teamCulture"
          :key="title"
          class="flex flex-col gap-2 border-t border-line2 py-6 first:border-t-0 first:pt-0"
        >
          <b class="font-display text-xl font-semibold leading-normal md:text-[22px]">{{
            title
          }}</b>
          <p class="text-base leading-[1.85] text-body md:text-[17px]">{{ text }}</p>
        </div>
      </div>
    </section>

    <!-- Next decade -->
    <section class="bg-white py-16 md:py-[104px]">
      <div class="wrap">
        <div class="mb-7 flex flex-col gap-3 md:mb-9">
          <span class="eyebrow">The Next 10 Years</span>
          <h2 class="font-display text-[28px] font-bold leading-[1.4] md:text-[40px]">
            ก้าวต่อไปของ Brighton
          </h2>
        </div>
        <div class="grid gap-8 md:grid-cols-3 lg:gap-10">
          <div
            v-for="([title, text], i) in vision"
            :key="title"
            class="flex flex-col gap-3 border-t-2 border-ink pt-6"
          >
            <span class="font-condensed text-[13px] font-medium text-brand">0{{ i + 1 }}</span>
            <b class="text-[22px] font-semibold">{{ title }}</b>
            <span class="text-[15px] leading-[1.7] text-muted">{{ text }}</span>
          </div>
        </div>
        <router-link class="link-arrow mt-8 inline-block text-base" to="/mep"
          >ห้องเรียน EP · IEP · MEP ที่เราดูแล →</router-link
        >
      </div>
    </section>

    <section class="wrap grid gap-8 py-16 md:py-[104px] lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <h2 class="font-display text-[28px] font-bold leading-[1.4] md:text-[40px]">พันธกิจของเรา</h2>
      <div class="flex flex-col">
        <div
          v-for="m in missions"
          :key="m.title"
          class="flex flex-col gap-2 border-t border-line2 py-6 first:border-t-0 first:pt-0"
        >
          <span class="font-display text-[13px] font-medium text-brand">{{ m.label }}</span>
          <b class="font-display text-xl font-semibold leading-normal md:text-[22px]"
            >“{{ m.title }}”</b
          >
          <p class="text-base leading-[1.85] text-body md:text-[17px]">{{ m.desc }}</p>
        </div>
      </div>
    </section>

    <section class="wrap grid gap-3 pb-16 sm:grid-cols-[1fr_1.3fr_1fr] md:gap-4 md:pb-[104px]">
      <PhotoBox
        v-for="(src, i) in strip"
        :key="i"
        :src="src"
        alt="บรรยากาศที่ Brighton"
        class="h-[220px] rounded-3xl md:h-[300px]"
      />
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import PhotoBox from '@/components/PhotoBox.vue'
import { useFeed } from '@/composables/useFeed'
import { team, yearsLabel } from '@/data/site'
import {
  founderStory,
  studentsLabel,
  successStory,
  teacherStandards,
  teamCulture,
  vision
} from '@/data/about'

export default {
  name: 'AboutView',
  components: { PhotoBox },
  setup() {
    useHead({
      title: 'เกี่ยวกับเรา - Brighton Language Academy',
      meta: [
        {
          name: 'description',
          content: `เรื่องราวของ Brighton Language Academy โรงเรียนสอนภาษาอังกฤษในพะเยา ดูแลเด็กๆ มากว่า ${yearsLabel} ปี นักเรียนกว่า ${studentsLabel} คน ก่อตั้งโดยคนพะเยาที่ใช้เวลา 5 ปีในออสเตรเลีย ครูเจ้าของภาษาที่ผ่านการคัดเลือกและอบรม ห้องเรียน Active Learning ที่ลูกกล้าพูดโดยไม่กลัวผิด`
        }
      ]
    })
    const { photos } = useFeed()
    const cover = computed(() => photos.value[6])
    const strip = computed(() => [photos.value[12], photos.value[16], photos.value[20]])
    return { cover, strip }
  },
  data() {
    return {
      years: yearsLabel,
      students: studentsLabel,
      story: founderStory,
      success: successStory,
      teacherStandards,
      teamCulture,
      vision,
      stats: [
        [yearsLabel, 'ปีที่ดูแลเด็กๆ ในพะเยา'],
        [studentsLabel, 'นักเรียนที่เรียนกับเรา'],
        [String(team.schools), 'โรงเรียนในพะเยาที่เราดูแลห้องเรียน MEP'],
        [`~${team.foreignTeachers}`, 'ครูชาวต่างชาติในทีม']
      ],
      missions: [
        {
          label: 'ต่อผู้เรียน',
          title: 'สร้างการเรียนรู้ที่มีความสุข และใช้ได้จริงในชีวิตจริง',
          desc: 'เรามุ่งมั่นพัฒนาทักษะภาษาอังกฤษของผู้เรียน โดยเน้นการเรียนแบบมีความสุข เพื่อให้ผู้เรียนรักในภาษาและสามารถนำไปใช้ได้จริงในชีวิตประจำวัน'
        },
        {
          label: 'ต่อพนักงาน',
          title: 'เติบโตไปด้วยกันอย่างมีคุณภาพและความสุข',
          desc: 'เรามุ่งพัฒนาศักยภาพและการเติบโตของพนักงานทุกคนอย่างต่อเนื่องและยั่งยืน เพราะเราเชื่อว่าทีมงานที่มีความสุข จะส่งต่อการสอนที่มีคุณภาพ'
        },
        {
          label: 'ต่อคู่ค้า',
          title: 'ร่วมมืออย่างมืออาชีพ บนความเชื่อใจและความเป็นธรรม',
          desc: 'เรามุ่งพัฒนาความสัมพันธ์ระหว่างองค์กร บนพื้นฐานของความเป็นธรรม เพื่อการเติบโตในการดำเนินธุรกิจร่วมกันในระยะยาว'
        }
      ],
      methods: [
        {
          en: 'Can Do Attitude',
          title: 'กล้าพูด ไม่กลัวผิด',
          desc: 'ห้องเรียนที่ไม่มีความกดดัน ตอบผิดได้ ครูและเพื่อนช่วยกันให้กำลังใจ ลูกจึงไม่เขินอาย และกล้าใช้ภาษาอังกฤษอย่างเป็นธรรมชาติ'
        },
        {
          en: 'Active Learning',
          title: 'เรียนด้วยการลงมือทำ',
          desc: 'ไม่ใช่การนั่งท่องจำหน้ากระดาน ครูชวนเด็กๆ เล่น ลงมือทำ และสร้างงานศิลปะและงานประดิษฐ์ ให้ภาษาอังกฤษติดตัวผ่านประสบการณ์จริง'
        },
        {
          en: 'Oxford · Jolly Phonics',
          title: 'หลักสูตรมาตรฐานสากล',
          desc: 'หลักสูตร Oxford University Press พัฒนาครบ ฟัง–พูด–อ่าน–เขียน และ Jolly Phonics ปูพื้นฐานเสียงให้ลูกอ่านออกและอ่านเข้าใจ'
        },
        {
          en: 'Placement & Progress',
          title: 'วัดระดับและติดตามผล',
          desc: 'วัดระดับก่อนเริ่มเรียน เพื่อเรียนในชั้นที่ท้าทายพอดี ครูประเมินพัฒนาการอย่างต่อเนื่อง และมีสอบเลื่อนระดับทุกปี'
        }
      ]
    }
  }
}
</script>
