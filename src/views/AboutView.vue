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
        Brighton Language Academy เกิดขึ้นจากความตั้งใจที่จะสร้างพื้นที่เรียนรู้ที่ปลอดภัย อบอุ่น
        และมีคุณภาพ ใจกลางเมืองพะเยา เพื่อให้เด็กๆ ทุกคนได้เรียนภาษาอังกฤษอย่างมีความสุข
        พร้อมเติบโตอย่างมั่นใจและกล้าก้าวข้ามขีดจำกัดของตัวเอง
      </p>
    </section>

    <div class="wrap relative">
      <PhotoBox
        alt="นักเรียนและครูที่ Brighton Language Academy"
        class="h-[260px] rounded-3xl md:h-[440px] md:rounded-[28px]"
        :src="cover"
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

    <section
      class="wrap grid gap-8 pb-16 pt-24 md:pb-24 md:pt-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20"
    >
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

    <section class="wrap pb-16 md:pb-[104px]">
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
import { yearsLabel } from '@/data/site'

export default {
  name: 'AboutView',
  components: { PhotoBox },
  setup() {
    useHead({ title: 'เกี่ยวกับเรา - Brighton Language Academy' })
    const { photos } = useFeed()
    const cover = computed(() => photos.value[6])
    const strip = computed(() => [photos.value[12], photos.value[16], photos.value[20]])
    return { cover, strip }
  },
  data() {
    return {
      years: yearsLabel,
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
          en: 'Oxford',
          title: 'หลักสูตรมาตรฐานสากล',
          desc: 'หลักสูตรแท้จาก Oxford University Press พัฒนาครบ ฟัง–พูด–อ่าน–เขียน อย่างเป็นระบบ'
        },
        {
          en: 'Phonics',
          title: 'อ่านออกเสียงได้ถูกต้อง',
          desc: 'ปูพื้นฐานเสียงภาษาอังกฤษด้วย Jolly Phonics ให้ลูกอ่านคล่องและสะกดคำได้เอง'
        },
        {
          en: 'CEFR',
          title: 'วัดระดับและติดตามผล',
          desc: 'ประเมินระดับตามกรอบ CEFR ก่อนเริ่มเรียน เพื่อเริ่มในระดับที่ใช่และเห็นพัฒนาการชัดเจน'
        },
        {
          en: 'Care',
          title: 'ครูที่ใส่ใจ บรรยากาศอบอุ่น',
          desc: 'ครูเจ้าของภาษาและครูผู้เชี่ยวชาญ ดูแลอย่างใกล้ชิดในบรรยากาศที่ลูกอยากมาเรียน'
        }
      ]
    }
  }
}
</script>
