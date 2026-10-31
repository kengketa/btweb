<template>
  <main>
    <!-- Hero: headline on the left, a bento of photos and proof points on the right -->
    <section class="relative">
      <div
        class="wrap grid items-center gap-10 pb-10 pt-8 md:pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-14 lg:pt-14"
      >
        <div class="flex flex-col gap-5 md:gap-7">
          <span
            class="flex items-center gap-2.5 self-start rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-muted md:px-4 md:py-2 md:text-sm"
          >
            <span class="h-2 w-2 rounded-full bg-sun"></span>
            โรงเรียนสอนภาษาอังกฤษสำหรับเด็ก · ใจกลางเมืองพะเยา
          </span>
          <h1
            class="font-display text-[36px] font-bold leading-[1.4] tracking-[-0.01em] md:text-5xl md:leading-[1.38] lg:text-[46px] xl:text-[56px] xl:leading-[1.34]"
          >
            <span class="sm:block sm:whitespace-nowrap">ให้ลูกเรียนภาษาอังกฤษ</span>
            <span class="sm:block sm:whitespace-nowrap"
              >อย่าง<span class="marker">มีความสุข</span></span
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
          <p class="text-[13px] leading-[1.6] text-muted">
            วัดระดับฟรี ไม่มีค่าใช้จ่าย · เริ่มเรียนได้ตั้งแต่ 3 ขวบ
          </p>
        </div>

        <!-- 4 × 3 bento on tablets and up; on phones it folds into two columns -->
        <div
          v-reveal="{ stagger: 70, variant: 'scale' }"
          class="grid grid-flow-row-dense auto-rows-[118px] grid-cols-2 gap-2.5 sm:grid-cols-4 sm:grid-rows-[repeat(3,132px)] md:gap-3 lg:grid-rows-[repeat(3,146px)] xl:grid-rows-[repeat(3,164px)]"
        >
          <PhotoBox
            :src="heroPhotos[0]"
            alt="บรรยากาศการเรียนที่ Brighton"
            class="col-span-2 row-span-2 rounded-[24px] md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 300px, 100vw"
          />
          <PhotoBox
            :src="heroPhotos[1]"
            alt="ครูและนักเรียนที่ Brighton"
            class="rounded-[24px] md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 150px, 50vw"
          />
          <div
            class="flex -rotate-2 flex-col justify-between rounded-[24px] bg-sun p-4 shadow-[inset_0_-5px_0_rgba(0,0,0,.08)] md:rounded-[28px] md:p-5"
          >
            <BentoIcon class="h-6 w-6" name="sparkle" />
            <span class="font-condensed text-[17px] font-semibold italic leading-[1.15] md:text-lg"
              >Happy learning starts here</span
            >
          </div>
          <PhotoBox
            :src="heroPhotos[2]"
            alt="นักเรียน Brighton"
            class="col-span-2 hidden rounded-[24px] sm:block md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 300px, 50vw"
          />
          <div
            class="flex flex-col justify-between rounded-[24px] bg-ink p-4 text-cream md:rounded-[28px] md:p-5"
          >
            <span class="text-[12px] text-cream/70 md:text-[13px]">ดูแลเด็กๆ ในพะเยา</span>
            <span class="flex items-baseline gap-1.5">
              <span
                class="font-condensed text-[40px] font-bold leading-none text-sun md:text-[48px]"
                >{{ years }}</span
              >
              <span class="text-sm text-cream/80">ปี</span>
            </span>
          </div>
          <router-link
            :to="{ hash: '#reviews' }"
            class="group col-span-2 flex flex-col justify-between rounded-[24px] border border-line bg-white p-4 transition hover:-translate-y-0.5 md:rounded-[28px] md:p-5"
          >
            <span class="flex items-center justify-between gap-2">
              <span class="flex -space-x-2.5">
                <span
                  v-for="r in reviews.slice(0, 4)"
                  :key="r.name"
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-sm font-semibold text-brand ring-2 ring-white"
                  >{{ r.initial }}</span
                >
              </span>
              <span class="flex gap-0.5 text-sun" aria-hidden="true">
                <svg
                  v-for="n in 5"
                  :key="n"
                  class="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9L10 1.5z"
                  />
                </svg>
              </span>
            </span>
            <span class="flex items-end justify-between gap-2">
              <span class="font-display text-base font-medium leading-snug md:text-[17px]"
                >ผู้ปกครองแนะนำ Brighton</span
              >
              <span class="flex-none text-[13px] text-muted group-hover:text-brand"
                >อ่านรีวิว →</span
              >
            </span>
          </router-link>
          <PhotoBox
            :src="heroPhotos[3]"
            alt="กิจกรรมในห้องเรียน Brighton"
            class="rounded-[24px] md:rounded-[28px]"
            sizes="(min-width: 1024px) 150px, 50vw"
          />
        </div>
      </div>

      <!-- the path from first visit to seeing results, as a row of numbered steps -->
      <div class="wrap pb-14 md:pb-20">
        <ol
          v-reveal="{ stagger: 70 }"
          class="-mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-[repeat(4,1fr)_auto] md:overflow-visible md:px-0"
        >
          <li v-for="(s, i) in journey" :key="s.label" class="flex-none snap-start md:flex-auto">
            <router-link
              :class="i === 0 ? 'border-sun bg-sunsoft' : 'border-line bg-white hover:border-line2'"
              :to="s.to"
              class="flex h-full items-center gap-3 rounded-full border py-2 pl-2 pr-5 transition-colors"
            >
              <span
                :class="i === 0 ? 'bg-sun' : 'bg-cream'"
                class="flex h-8 w-8 flex-none items-center justify-center rounded-full font-condensed text-sm font-bold"
                >{{ i + 1 }}</span
              >
              <span class="whitespace-nowrap text-[15px] font-medium">{{ s.label }}</span>
            </router-link>
          </li>
          <li class="flex-none snap-start">
            <router-link
              class="flex h-full items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-cream transition-colors hover:bg-brand"
              to="/contact"
              >นัดเลย →</router-link
            >
          </li>
        </ol>
      </div>
    </section>

    <!-- Welcome: what makes Brighton different, one card per idea (issue #31) -->
    <section id="why" class="scroll-mt-24 pb-16 md:pb-[104px]">
      <div class="wrap">
        <div
          v-reveal="{ stagger: 120 }"
          class="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
        >
          <div class="flex flex-col gap-3 md:gap-5">
            <span class="eyebrow">Welcome to Our Family</span>
            <h2
              class="font-display text-[22px] font-semibold leading-[1.6] md:text-[40px] md:leading-[1.5]"
              style="text-wrap: balance"
            >
              “เพราะเราเชื่อว่า…
              <span class="marker">ความสุข</span>คือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด”
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

        <div
          v-reveal="{ stagger: 90 }"
          class="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
        >
          <BentoCard
            class="md:col-span-2 lg:col-span-7"
            icon="target"
            sub="วัดระดับก่อนเริ่มเรียนตามกรอบ CEFR ติดตามผลตลอดปี และสอบเลื่อนระดับทุกปี"
            tag="ฟรี"
            title="วัดระดับก่อนเรียน"
          >
            <CefrLadder :current="1" />
            <template #foot
              >ตัวอย่างเส้นทางของนักเรียนหนึ่งคน · แตะบนแท่งเพื่อดูแต่ละระดับ</template
            >
          </BentoCard>

          <BentoCard
            class="md:col-span-2 lg:col-span-5"
            icon="route"
            sub="Active Learning ผ่านเกม งานศิลปะ และงานประดิษฐ์ ไม่ใช่การท่องจำ"
            title="หนึ่งคาบเรียนที่ Brighton"
          >
            <ol class="relative flex flex-col gap-2">
              <span
                aria-hidden="true"
                class="absolute bottom-7 left-[29px] top-7 w-0.5 bg-sun/60"
              ></span>
              <li v-for="([name, text], i) in lessonSteps" :key="name" class="relative">
                <button
                  :aria-pressed="step === i"
                  :class="step === i ? 'bg-sunsoft' : 'hover:bg-cream'"
                  class="flex w-full items-start gap-3.5 rounded-2xl p-3 text-left transition-colors"
                  type="button"
                  @click="step = i"
                  @mouseenter="step = i"
                >
                  <span
                    :class="
                      step === i ? 'bg-ink text-sun ring-sunsoft' : 'bg-sun text-ink ring-white'
                    "
                    class="flex h-9 w-9 flex-none items-center justify-center rounded-full font-condensed text-sm font-bold ring-4 transition-colors"
                    >{{ i + 1 }}</span
                  >
                  <span class="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
                    <span class="flex items-center justify-between gap-2">
                      <b class="font-condensed text-[17px] font-semibold">{{ name }}</b>
                      <span
                        v-if="step === i"
                        class="rounded-full bg-sun px-2.5 py-0.5 text-[12px] font-semibold"
                        >{{ stepMinutes[i] }}</span
                      >
                    </span>
                    <span class="text-sm leading-[1.6] text-muted">{{ text }}</span>
                  </span>
                </button>
              </li>
            </ol>
          </BentoCard>

          <BentoCard
            class="lg:col-span-4"
            icon="users"
            sub="ครูผู้สอนคลาสที่ Brighton ใช้ภาษาอังกฤษเป็นภาษาแรก"
            title="ครูเจ้าของภาษา"
            tone="ink"
          >
            <ul class="flex flex-col gap-2.5">
              <li
                v-for="[standard] in teacherStandards"
                :key="standard"
                class="flex items-center justify-between gap-3 rounded-full border border-cream/15 py-2.5 pl-4 pr-2.5 text-[15px]"
              >
                {{ standard }}
                <BentoIcon class="h-6 w-6 flex-none text-sun" name="checkCircle" />
              </li>
            </ul>
            <template #foot>
              <router-link class="font-semibold text-sun hover:underline" to="/teachers"
                >ดูทีมครูชาวต่างชาติของเรา →</router-link
              >
            </template>
          </BentoCard>

          <BentoCard
            class="lg:col-span-4"
            icon="chat"
            sub="ห้องเรียนแบบ Can Do Attitude ตอบผิดได้ ครูและเพื่อนช่วยกันให้กำลังใจ"
            title="กล้าพูด ไม่กลัวผิด"
            tone="blush"
          >
            <ChatDemo :lines="chat" />
            <template #foot>ตัวอย่างบทสนทนาในห้องเรียน</template>
          </BentoCard>

          <BentoCard
            class="md:col-span-2 lg:col-span-4"
            icon="chart"
            sub="ครูประเมินลูกตลอดปี ผู้ปกครองดูผลการเรียนได้ใน LINE"
            title="เห็นพัฒนาการของลูก"
          >
            <SkillRadar
              :average="radar.average"
              :axes="radar.axes"
              :child="radar.child"
              :name="sampleChild.nickname"
              class="mt-auto"
            />
            <template #foot>
              ตัวอย่างกราฟจากแอป Student Progress ·
              <router-link class="link-arrow" to="/results">ดูวิธีดูผลการเรียน →</router-link>
            </template>
          </BentoCard>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section id="courses" class="wrap scroll-mt-24 pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${courses.length} หลักสูตร`"
        class="mb-6 md:mb-10"
        eyebrow="Our Courses"
        icon="book"
        sub="เลือกตามอายุและพื้นฐานของลูก ทุกหลักสูตรเริ่มจากการวัดระดับฟรี"
        title="หลักสูตรตามช่วงวัย"
        tone="brand"
      />
      <!-- one card per course; the first is wide, with its age block beside the points -->
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          v-for="(c, i) in courses"
          :key="c.slug"
          :class="courseCards[i].span"
          :sub="c.short"
          :tag="c.curriculum"
          :title="c.name"
          :to="`/courses/${c.slug}`"
          :tone="courseCards[i].tone"
        >
          <div
            :class="i === 0 && 'sm:grid sm:grid-cols-[200px_1fr] sm:items-stretch sm:gap-7'"
            class="flex flex-1 flex-col gap-5"
          >
            <!-- the wide card keeps the course's colour block; the others show the age on the card -->
            <div
              v-if="i === 0"
              :class="toneClass[c.tone]"
              class="flex min-h-[150px] flex-col justify-between gap-4 rounded-[22px] p-5"
            >
              <span class="text-[13px] font-semibold opacity-90">{{ c.tag }}</span>
              <span :class="ageFont(c.age)" class="text-[52px] font-bold leading-none"
                >{{ c.age }}<span class="ml-1.5 text-lg">ปี</span></span
              >
            </div>
            <div v-else class="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <span>
                <span
                  :class="[ageFont(c.age), courseCards[i].age]"
                  class="text-[52px] font-bold leading-none"
                  >{{ c.age }}<span v-if="c.ageUnit === 'ปี'" class="ml-1.5 text-lg">ปี</span></span
                >
                <span
                  v-if="c.ageUnit !== 'ปี'"
                  :class="courseCards[i].muted"
                  class="mt-1.5 block text-[13px]"
                  >{{ c.ageUnit }}</span
                >
              </span>
              <span
                :class="courseCards[i].pill"
                class="rounded-full px-3 py-1 text-[13px] font-semibold"
                >{{ c.tag }}</span
              >
            </div>
            <ul class="flex flex-col justify-end gap-2.5">
              <li
                v-for="[point] in c.points.slice(0, 3)"
                :key="point"
                class="flex items-center gap-2.5 text-[15px]"
              >
                <span
                  :class="courseCards[i].check"
                  class="flex h-6 w-6 flex-none items-center justify-center rounded-full"
                >
                  <BentoIcon class="h-3.5 w-3.5" name="check" />
                </span>
                {{ point }}
              </li>
            </ul>
          </div>
          <template #foot
            ><span :class="courseCards[i].link" class="font-semibold"
              >ดูรายละเอียด →</span
            ></template
          >
        </BentoCard>

        <BentoCard
          class="lg:col-span-4"
          icon="target"
          tone="sage"
          sub="ให้ครูช่วยประเมิน วัดระดับภาษาฟรี ไม่มีค่าใช้จ่าย"
          title="ไม่แน่ใจว่าเริ่มที่ไหน?"
        >
          <div class="flex flex-1 flex-col justify-between gap-6">
            <p class="flex items-baseline gap-2">
              <span class="text-sm text-muted">เริ่มเรียนได้ตั้งแต่</span>
              <span class="font-condensed text-[64px] font-bold leading-none text-brand">3</span>
              <span class="text-sm text-muted">ขวบ</span>
            </p>
            <div class="flex flex-col gap-3">
              <router-link class="btn-primary h-14 text-base shadow-none" to="/contact">
                นัดวัดระดับฟรี →
              </router-link>
              <router-link class="link-arrow text-center text-sm" to="/courses">
                ดูหลักสูตรทั้งหมด →
              </router-link>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>

    <!-- Programs: teachers, camp, EF, MEP/EP, each with its figure from programs.js -->
    <section id="programs" class="wrap scroll-mt-24 pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        class="mb-6 md:mb-10"
        count="4 โครงการ"
        eyebrow="More at Brighton"
        icon="sparkle"
        sub="ครูต่างชาติในโรงเรียนทั่วพะเยา ค่ายภาษาช่วงปิดเทอม ทักษะ EF และห้องเรียน EP / MEP"
        title="มากกว่าคลาสภาษาอังกฤษ"
        tone="sage"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          class="lg:col-span-5"
          :sub="prog.teachers.card"
          :title="prog.teachers.label"
          :to="prog.teachers.path"
          icon="globe"
          tone="ink"
        >
          <p class="mt-auto flex items-baseline gap-2">
            <span class="font-condensed text-[56px] font-bold leading-none text-sun"
              >~{{ team.foreignTeachers }}</span
            >
            <span class="text-sm text-cream/70">คน</span>
          </p>
          <template #foot><span class="font-semibold text-sun">ดูรายละเอียด →</span></template>
        </BentoCard>

        <BentoCard
          :sub="prog.camp.card"
          :title="prog.camp.label"
          :to="prog.camp.path"
          class="lg:col-span-7"
          icon="sun"
          tone="sun"
        >
          <div class="mt-auto flex flex-wrap gap-2">
            <span class="rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-sun">{{
              prog.camp.camp.term
            }}</span>
            <span
              v-for="week in campWeeks"
              :key="week"
              class="rounded-full bg-white/70 px-3 py-1.5 text-[13px] font-medium"
              >{{ week }}</span
            >
          </div>
          <template #foot><span class="font-semibold text-ink">ดูรายละเอียด →</span></template>
        </BentoCard>

        <BentoCard
          :sub="prog.ef.card"
          :title="prog.ef.label"
          :to="prog.ef.path"
          class="lg:col-span-6"
          icon="sparkle"
          tone="sage"
        >
          <div class="mt-auto flex flex-wrap gap-2">
            <span
              v-for="skill in efSkills"
              :key="skill"
              class="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium"
              >{{ skill }}</span
            >
          </div>
          <template #foot><span class="font-semibold text-sagedeep">ดูรายละเอียด →</span></template>
        </BentoCard>

        <BentoCard
          :sub="prog.mep.card"
          :title="prog.mep.label"
          :to="prog.mep.path"
          class="lg:col-span-6"
          icon="school"
          tone="blush"
        >
          <p class="mt-auto flex items-baseline gap-2">
            <span class="font-condensed text-[56px] font-bold leading-none text-brand">{{
              team.schools
            }}</span>
            <span class="text-sm text-body">โรงเรียนในพะเยา</span>
          </p>
          <template #foot><span class="link-arrow">ดูรายละเอียด →</span></template>
        </BentoCard>
      </div>
    </section>

    <!-- Our story: founder, students, a success story; the full version is on /about -->
    <section class="wrap pb-16 md:pb-[104px]">
      <div
        v-reveal="{ variant: 'scale' }"
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
        <div v-reveal="{ stagger: 90, delay: 200 }" class="grid grid-cols-2 gap-3 self-center">
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
      <div v-reveal class="mb-6 flex items-end justify-between gap-6 md:mb-10">
        <SectionHead
          icon="heart"
          sub="ภาพจากห้องเรียนและกิจกรรมจริง"
          title="บรรยากาศที่ Brighton"
          tone="peach"
        />
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
        v-reveal="{ stagger: 90, variant: 'scale' }"
        class="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:grid-rows-[220px_220px] md:gap-4"
      >
        <!-- phones: two rows sized by the photos' aspect ratios, so the top photo scales with
             the screen and no empty row is left for the photo that only shows from md -->
        <PhotoBox
          alt="นักเรียนและครูที่ Brighton"
          :src="photos[0]"
          class="col-span-2 aspect-[16/10] rounded-[18px] md:row-span-2 md:aspect-auto md:rounded-3xl"
          sizes="(min-width: 768px) 25vw, 100vw"
        />
        <PhotoBox
          :src="photos[1]"
          alt="กิจกรรมที่ Brighton"
          class="aspect-square rounded-[18px] md:aspect-auto md:rounded-3xl"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        <div class="flex flex-col justify-between rounded-[18px] bg-sun p-5 md:rounded-3xl md:p-6">
          <span class="font-condensed text-xl font-semibold italic leading-[1.3] md:text-[26px]"
            >“I can do it!”</span
          >
          <span class="text-[13px] font-medium md:text-sm">ความมั่นใจที่เห็นได้ทุกคาบเรียน</span>
        </div>
        <PhotoBox
          :src="photos[2]"
          alt="กิจกรรมที่ Brighton"
          class="col-span-2 hidden rounded-3xl md:block"
          sizes="50vw"
        />
      </div>
    </section>

    <!-- Reviews: a masonry bento of parents' Facebook comments, opened by a brand card -->
    <section id="reviews" class="wrap scroll-mt-24 pb-16 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${reviews.length} รีวิว`"
        class="mb-6 md:mb-10"
        eyebrow="เสียงจากผู้ปกครอง"
        icon="chat"
        sub="รีวิวจากผู้ปกครองบนเพจ Facebook ของโรงเรียน"
        title="ผู้ปกครองแนะนำ Brighton"
        tone="brand"
      />
      <!-- comments vary a lot in length, so cards flow down columns instead of rows. On
           phones (one column) the negative margin takes back the last card's bottom margin;
           the multi-column layout already drops it. -->
      <div
        v-reveal="{ stagger: 80 }"
        class="-mb-3 gap-3 sm:mb-0 sm:columns-2 md:gap-4 lg:columns-3"
      >
        <div
          class="relative mb-3 flex break-inside-avoid flex-col gap-6 overflow-hidden rounded-[28px] bg-brand p-6 text-white md:mb-4 md:p-7"
        >
          <div
            aria-hidden="true"
            class="absolute -right-10 -top-10 grid grid-cols-[60px_60px] gap-2.5 opacity-[.14]"
          >
            <div v-for="n in 4" :key="n" class="h-[60px] border-[7px] border-white"></div>
          </div>
          <span class="flex items-baseline gap-2">
            <span class="font-condensed text-[64px] font-bold leading-none text-sun">{{
              years
            }}</span>
            <span class="text-[15px] font-medium">ปี</span>
          </span>
          <span class="text-[17px] font-medium leading-normal"
            >ที่ครอบครัวในพะเยา<br />ไว้วางใจ Brighton</span
          >
          <a
            :href="contact.reviews"
            class="self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-sun hover:text-ink"
            rel="noopener"
            target="_blank"
            >อ่านรีวิวทั้งหมดบน Facebook →</a
          >
        </div>
        <figure
          v-for="r in reviews"
          :key="r.name"
          class="mb-3 break-inside-avoid rounded-[28px] border border-line bg-white p-5 text-ink md:mb-4 md:p-6"
        >
          <blockquote
            :title="r.text"
            class="line-clamp-4 whitespace-pre-line text-sm leading-[1.75] text-body md:text-[15px]"
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
    </section>

    <!-- Booking CTA -->
    <section class="wrap pb-16 md:pb-24">
      <div v-reveal="{ stagger: 100 }" class="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
        <BentoCard
          :level="2"
          class="lg:col-span-7"
          icon="calendar"
          sub="นัดวัดระดับภาษาฟรี ครูจะพูดคุยกับลูกและแนะนำคลาสที่เหมาะกับวัยและพื้นฐานของลูกมากที่สุด"
          title="มาลองเรียนกับเราก่อน"
        >
          <ol class="flex flex-col gap-3 sm:flex-row sm:gap-3">
            <li
              v-for="(step, i) in bookingSteps"
              :key="step"
              class="flex flex-1 items-center gap-3 rounded-2xl bg-cream p-4 sm:flex-col sm:items-start"
            >
              <span
                class="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sun font-condensed text-sm font-bold"
                >{{ i + 1 }}</span
              >
              <span class="text-[15px] font-medium leading-snug">{{ step }}</span>
            </li>
          </ol>
          <router-link
            class="btn-primary mt-6 h-[58px] self-start px-8 text-[17px] shadow-none"
            to="/contact"
          >
            นัดวัดระดับภาษาฟรี →
          </router-link>
        </BentoCard>

        <BentoCard
          :sub="contact.hours"
          class="lg:col-span-5"
          icon="pin"
          title="ติดต่อเรา"
          tone="ink"
        >
          <div class="flex flex-col gap-2.5">
            <a
              :href="contact.tel"
              class="flex items-center justify-between gap-3 rounded-full border border-cream/15 py-2.5 pl-4 pr-2.5 transition-colors hover:border-cream/40"
            >
              <span class="flex items-center gap-2.5 text-[15px]">
                <IconMobile class="h-[18px] w-[18px] text-sun" />{{ contact.phone }}
              </span>
              <span class="rounded-full bg-sun px-3 py-1 text-[13px] font-semibold text-ink"
                >โทร</span
              >
            </a>
            <a
              :href="contact.facebook"
              class="flex items-center justify-between gap-3 rounded-full border border-cream/15 py-2.5 pl-4 pr-2.5 transition-colors hover:border-cream/40"
              rel="noopener"
              target="_blank"
            >
              <span class="flex min-w-0 items-center gap-2.5 text-[15px]">
                <IconFacebook class="h-[18px] w-[18px] flex-none text-sun" />
                <span class="truncate">{{ contact.facebookName }}</span>
              </span>
              <span class="flex-none rounded-full bg-cream/10 px-3 py-1 text-[13px] font-semibold"
                >แชท</span
              >
            </a>
          </div>
          <template #foot>{{ contact.address.join(' ') }}</template>
        </BentoCard>
      </div>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import BentoIcon from '@/components/BentoIcon.vue'
import CefrLadder from '@/components/CefrLadder.vue'
import ChatDemo from '@/components/ChatDemo.vue'
import SectionHead from '@/components/SectionHead.vue'
import SkillRadar from '@/components/SkillRadar.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconMobile from '@/components/icons/IconMobile.vue'
import { useRandomPhotos } from '@/composables/useRandomPhotos'
import { contact, team, yearsLabel } from '@/data/site'
import { founderStory, studentsLabel, teacherStandards } from '@/data/about'
import reviewList from '@/data/reviews.json'
import { ageFont, courses, lessonSteps, toneClass } from '@/data/courses'
import { homePhotos } from '@/data/photos'
import { programBySlug } from '@/data/programs'
import { radar, sampleChild } from '@/data/parentReport'

export default {
  name: 'HomeView',
  components: {
    BentoCard,
    BentoIcon,
    CefrLadder,
    ChatDemo,
    SectionHead,
    SkillRadar,
    PhotoBox,
    IconFacebook,
    IconMobile
  },
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
    // The hero grid is in the first screen, so its photos stay the pre-rendered ones:
    // swapping them after load would download a second set. The gallery further down
    // hasn't started loading by then, so it gets a random 3 of the rest.
    const heroPhotos = homePhotos.slice(0, 4)
    const photos = useRandomPhotos(homePhotos.slice(4), 3)
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
      team,
      teacherStandards,
      lessonSteps,
      // the lesson card: which step is highlighted, and roughly how long each takes
      step: 2,
      stepMinutes: ['10 นาที', '15 นาที', '25 นาที', '10 นาที'],
      // the numbered strip under the hero, from first visit to seeing results
      journey: [
        { label: 'วัดระดับฟรี', to: { hash: '#why' } },
        { label: 'เลือกหลักสูตรตามวัย', to: { hash: '#courses' } },
        { label: 'เรียนกับครูเจ้าของภาษา', to: { hash: '#programs' } },
        { label: 'ดูพัฒนาการใน LINE', to: '/results' }
      ],
      courses,
      toneClass,
      ageFont,
      // the course cards, in the order of `courses`: grid width, card tone and the
      // colours that sit on it (row 1: 7 + 5 columns, row 2: 4 + 4 + the booking card)
      courseCards: [
        {
          span: 'md:col-span-2 lg:col-span-7',
          tone: 'white',
          check: 'bg-sunsoft text-ink',
          link: 'text-brand'
        },
        {
          span: 'lg:col-span-5',
          tone: 'sun',
          age: 'text-ink',
          muted: 'text-body',
          pill: 'bg-white text-ink',
          check: 'bg-white text-ink',
          link: 'text-ink'
        },
        {
          span: 'lg:col-span-4',
          tone: 'blush',
          age: 'text-brand-deep',
          muted: 'text-body',
          pill: 'bg-white text-brand',
          check: 'bg-white text-brand',
          link: 'text-brand'
        },
        {
          span: 'lg:col-span-4',
          tone: 'ink',
          age: 'text-sun',
          muted: 'text-cream/70',
          pill: 'bg-cream/10 text-cream',
          check: 'bg-cream/10 text-sun',
          link: 'text-sun'
        }
      ],
      prog: programBySlug,
      campWeeks: programBySlug.camp.camp.weeks.map((w) => w.name.replace(/^Week \d+ · /, '')),
      efSkills: programBySlug.ef.sections[0].items.map(([skill]) => skill),
      // the "กล้าพูด ไม่กลัวผิด" card: a sample exchange, labelled as one on the card
      chat: [
        ['teacher', 'What colour is the apple?'],
        ['child', 'It’s… blue?'],
        ['teacher', 'Good try! Look again.'],
        ['child', 'Red! I can do it!']
      ],
      // the progress card: the sample child's radar from the /results demo
      radar,
      sampleChild,
      bookingSteps: [
        'ทักแชทหรือโทรนัดเวลา',
        'ครูพูดคุยและวัดระดับลูก ฟรี',
        'แนะนำคลาสที่เหมาะกับลูก'
      ]
    }
  }
}
</script>
