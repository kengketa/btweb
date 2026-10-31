<template>
  <main>
    <section
      class="wrap grid items-end gap-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
    >
      <div class="flex flex-col gap-4">
        <span class="eyebrow">About Brighton</span>
        <h1
          class="font-display text-[36px] font-bold leading-[1.4] md:text-[56px] xl:text-[64px] xl:leading-[1.32]"
        >
          มากกว่าโรงเรียน…<br />คือ<span class="marker">บ้าน</span>แห่งการเรียนรู้
        </h1>
      </div>
      <p class="text-base leading-[1.8] text-muted md:text-lg" style="text-wrap: pretty">
        Brighton Language Academy ดูแลเด็กๆ ในพะเยามากว่า {{ years }} ปี มีนักเรียนมาแล้วกว่า
        {{ students }} คน ตั้งแต่วัย 3 ขวบ ด้วยความตั้งใจให้ทุกคนได้ใช้ภาษาอังกฤษเป็นทักษะจริง
        ไม่ใช่แค่วิชาที่ต้องท่องจำ ในห้องเรียนที่ปลอดภัย อบอุ่น และสนุก
      </p>
    </section>

    <!-- cover photo + the four key figures as one bento -->
    <section
      v-reveal="{ stagger: 70, variant: 'scale' }"
      class="wrap grid grid-cols-2 gap-3 pb-16 md:gap-4 md:pb-[104px] lg:grid-cols-12 lg:grid-rows-[repeat(2,210px)]"
    >
      <PhotoBox
        :src="cover"
        alt="นักเรียนและครูที่ Brighton Language Academy"
        class="col-span-2 h-[260px] rounded-[28px] md:h-[400px] lg:col-span-8 lg:row-span-2 lg:h-auto lg:rounded-[32px]"
        position="center 35%"
        priority
        sizes="(min-width: 1280px) 780px, 100vw"
      />
      <div
        v-for="(st, i) in stats"
        :key="st[1]"
        :class="statTones[i].card"
        class="flex min-h-[150px] flex-col justify-between gap-3 rounded-[24px] p-5 lg:col-span-2 lg:rounded-[28px] lg:p-6"
      >
        <span :class="statTones[i].label" class="text-[13px] leading-[1.45]">{{ st[1] }}</span>
        <span
          :class="statTones[i].value"
          class="font-condensed text-[40px] font-bold leading-none md:text-[48px]"
          >{{ st[0] }}</span
        >
      </div>
    </section>

    <!-- Founder's story -->
    <section class="wrap pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :title="story.heading"
        class="mb-6 md:mb-10"
        eyebrow="Our Story"
        icon="heart"
        tone="peach"
      />
      <div v-reveal="{ stagger: 90 }" class="grid gap-4 md:gap-5 lg:grid-cols-12">
        <article
          class="flex flex-col gap-5 rounded-[28px] border border-line bg-white p-6 md:rounded-[32px] md:p-9 lg:col-span-8"
        >
          <p
            v-for="(text, i) in story.paragraphs"
            :key="i"
            class="text-base leading-[1.95] text-body md:text-[17px]"
            style="text-wrap: pretty"
          >
            {{ text }}
          </p>
        </article>
        <figure
          class="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-brand p-7 text-white md:rounded-[32px] md:p-9 lg:col-span-4"
        >
          <span class="font-display text-[72px] leading-[.6] text-sun" aria-hidden="true">“</span>
          <blockquote
            class="font-display text-lg font-medium leading-[1.7] md:text-[22px]"
            style="text-wrap: pretty"
          >
            {{ story.quote }}
          </blockquote>
          <figcaption class="text-sm opacity-85">ผู้ก่อตั้ง Brighton Language Academy</figcaption>
        </figure>
      </div>
    </section>

    <!-- Teaching methods -->
    <section class="wrap pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${methods.length} แนวทาง`"
        class="mb-6 md:mb-10"
        eyebrow="How We Teach"
        icon="route"
        sub="สี่อย่างที่ทำให้ห้องเรียน Brighton ต่างจากการเรียนพิเศษทั่วไป"
        title="วิธีการสอนของเรา"
        tone="sun"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          v-for="(m, i) in methods"
          :key="m.title"
          :class="methodCards[i].span"
          :sub="m.desc"
          :tag="m.en"
          :title="m.title"
          :tone="methodCards[i].tone"
        >
          <span
            :class="methodCards[i].num"
            aria-hidden="true"
            class="mt-auto self-end font-condensed text-[72px] font-bold leading-none md:text-[96px]"
            >0{{ i + 1 }}</span
          >
        </BentoCard>
      </div>
    </section>

    <!-- Teachers -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div
        v-reveal
        class="mb-6 flex flex-col justify-between gap-4 md:mb-10 lg:flex-row lg:items-end"
      >
        <SectionHead
          :count="`${teacherStandards.length} เกณฑ์`"
          eyebrow="Our Teachers"
          icon="users"
          title="ครูของเรา คัดเลือกและอบรมอย่างไร"
          tone="ink"
        />
        <router-link class="link-arrow flex-none text-base" to="/teachers"
          >ดูทีมครูชาวต่างชาติของเรา →</router-link
        >
      </div>
      <div v-reveal="{ stagger: 70 }" class="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <BentoCard
          v-for="([title, text], i) in teacherStandards"
          :key="title"
          :sub="text"
          :title="title"
          :tone="i === 0 ? 'ink' : 'white'"
          icon="checkCircle"
        />
      </div>
    </section>

    <!-- Success story -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div v-reveal="{ stagger: 90 }" class="grid gap-4 md:gap-5 lg:grid-cols-12">
        <div
          class="flex flex-col gap-5 rounded-[28px] bg-sun p-7 md:rounded-[32px] md:p-12 lg:col-span-8"
        >
          <span class="font-condensed text-xs font-semibold uppercase tracking-[.14em]"
            >Success Story</span
          >
          <h2
            class="font-display text-[26px] font-bold leading-[1.4] md:text-[36px]"
            style="text-wrap: balance"
          >
            {{ success.heading }}
          </h2>
          <div class="flex flex-col gap-4 text-base leading-[1.85] md:text-[17px]">
            <p>{{ success.text }}</p>
            <p class="text-body">{{ success.note }}</p>
          </div>
        </div>
        <div
          class="flex flex-col justify-between gap-6 rounded-[28px] bg-ink p-7 text-cream md:rounded-[32px] md:p-9 lg:col-span-4"
        >
          <span class="text-sm text-cream/70">เริ่มเรียนกับเราตอน</span>
          <span class="flex items-baseline gap-2">
            <span class="font-condensed text-[88px] font-bold leading-none text-sun">3</span>
            <span class="text-lg">ขวบ</span>
          </span>
          <span class="flex items-baseline gap-2 border-t border-cream/15 pt-5">
            <span class="text-sm text-cream/70">IELTS</span>
            <span class="font-condensed text-[56px] font-bold leading-none">8.0</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Team culture -->
    <section class="wrap pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        class="mb-6 md:mb-10"
        eyebrow="Our Team"
        icon="sun"
        sub="เราเชื่อว่าห้องเรียนที่ดี เริ่มจากการดูแลคนที่สอนให้ดีที่สุด เพราะครูที่มีเวลาและมีแรงบันดาลใจ จะส่งต่อสิ่งเหล่านั้นให้นักเรียน"
        tone="sage"
      >
        <template #title>ครูมีความสุข <span class="marker">ลูกก็มีความสุข</span></template>
      </SectionHead>
      <div v-reveal="{ stagger: 80 }" class="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        <BentoCard
          v-for="([title, text], i) in teamCulture"
          :key="title"
          :sub="text"
          :title="title"
          :tone="['sage', 'white', 'peach'][i % 3]"
        />
      </div>
    </section>

    <!-- Next decade + mission -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div
        v-reveal
        class="mb-6 flex flex-col justify-between gap-4 md:mb-10 lg:flex-row lg:items-end"
      >
        <SectionHead
          eyebrow="The Next 10 Years"
          icon="target"
          title="ก้าวต่อไปของ Brighton"
          tone="brand"
        />
        <router-link class="link-arrow flex-none text-base" to="/mep"
          >ห้องเรียน EP · IEP · MEP ที่เราดูแล →</router-link
        >
      </div>
      <div v-reveal="{ stagger: 90 }" class="grid gap-4 md:grid-cols-3 md:gap-5">
        <BentoCard
          v-for="([title, text], i) in vision"
          :key="title"
          :sub="text"
          :title="title"
          :tone="i === 1 ? 'sun' : 'white'"
        >
          <span
            aria-hidden="true"
            class="mt-auto self-end font-condensed text-[56px] font-bold leading-none text-brand/20"
            >0{{ i + 1 }}</span
          >
        </BentoCard>
      </div>
    </section>

    <section class="wrap pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${missions.length} ข้อ`"
        class="mb-6 md:mb-10"
        icon="checkCircle"
        title="พันธกิจของเรา"
        tone="ink"
      />
      <div v-reveal="{ stagger: 80 }" class="grid gap-4 md:grid-cols-3 md:gap-5">
        <BentoCard
          v-for="(m, i) in missions"
          :key="m.title"
          :sub="m.desc"
          :tag="m.label"
          :title="`“${m.title}”`"
          :tone="['blush', 'sage', 'paper'][i]"
        />
      </div>
    </section>

    <section
      v-reveal="{ stagger: 90, variant: 'scale' }"
      class="wrap grid gap-3 pb-16 sm:grid-cols-[1fr_1.3fr_1fr] md:gap-4 md:pb-[104px]"
    >
      <PhotoBox
        v-for="(src, i) in strip"
        :key="i"
        :src="src"
        alt="บรรยากาศที่ Brighton"
        class="h-[220px] rounded-[28px] md:h-[300px] md:rounded-[32px]"
        sizes="(min-width: 640px) 40vw, 100vw"
      />
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import SectionHead from '@/components/SectionHead.vue'
import { useRandomPhotos } from '@/composables/useRandomPhotos'
import { aboutCover, aboutPhotos } from '@/data/photos'
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
  components: { BentoCard, PhotoBox, SectionHead },
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
    const strip = useRandomPhotos(aboutPhotos, 3)
    return { cover: aboutCover, strip }
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
      // the figure tiles beside the cover photo
      statTones: [
        { card: 'bg-sun', label: 'text-body', value: 'text-ink' },
        { card: 'bg-ink', label: 'text-cream/70', value: 'text-sun' },
        { card: 'bg-blush', label: 'text-body', value: 'text-brand' },
        { card: 'bg-white border border-line', label: 'text-muted', value: 'text-ink' }
      ],
      // the methods grid: 7/5 then 5/7 columns, each in its own tone
      methodCards: [
        { span: 'lg:col-span-7', tone: 'white', num: 'text-sun' },
        { span: 'lg:col-span-5', tone: 'ink', num: 'text-sun/40' },
        { span: 'lg:col-span-5', tone: 'sun', num: 'text-ink/15' },
        { span: 'lg:col-span-7', tone: 'blush', num: 'text-brand/25' }
      ],
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
