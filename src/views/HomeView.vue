<template>
  <main>
    <!-- Hero: headline on the left, a bento of photos and proof points on the right -->
    <section class="relative">
      <div
        class="wrap grid items-center gap-10 pb-12 pt-8 md:pb-10 md:pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-14 lg:pt-14"
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
            <span class="rise sm:block sm:whitespace-nowrap">ให้ลูกเรียนภาษาอังกฤษ</span>
            <span class="rise sm:block sm:whitespace-nowrap" style="--d: 90ms"
              >อย่าง<span class="marker marker-intro">มีความสุข</span></span
            >
            <span class="rise sm:block sm:whitespace-nowrap" style="--d: 180ms"
              >และ<span class="marker marker-intro" style="--marker-delay: 1s"
                >ใช้ได้จริง</span
              ></span
            >
          </h1>
          <p class="max-w-[520px] text-base leading-[1.7] text-muted md:text-lg md:leading-[1.75]">
            Brighton Language Academy โรงเรียนสอนภาษามาตรฐานสากลในพะเยา หลักสูตร Oxford และ Jolly
            Phonics กับ teacher ที่รู้จักและใส่ใจลูกของคุณทุกคน
          </p>
          <div class="flex flex-wrap items-center gap-3.5">
            <router-link :to="bookingLink" class="btn-primary h-14 px-[30px] text-[17px]">
              นัดวัดระดับภาษาฟรี <span>→</span>
            </router-link>
            <router-link :to="{ hash: '#courses' }" class="btn-outline h-14 px-7 text-[17px]">
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
            class="in-zoom lift col-span-2 row-span-2 rounded-[24px] md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 300px, 100vw"
          />
          <PhotoBox
            :src="heroPhotos[1]"
            alt="Teacher และนักเรียนที่ Brighton"
            class="in-zoom lift rounded-[24px] md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 150px, 50vw"
          />
          <div
            class="in-zoom lift flex flex-col [rotate:-2deg] justify-between rounded-[24px] bg-sun p-4 shadow-[inset_0_-5px_0_rgba(0,0,0,.08)] md:rounded-[28px] md:p-5"
          >
            <BentoIcon class="h-6 w-6" name="sparkle" />
            <span class="font-condensed text-[17px] font-semibold italic leading-[1.15] md:text-lg"
              >Happy learning starts here</span
            >
          </div>
          <PhotoBox
            :src="heroPhotos[2]"
            alt="นักเรียน Brighton"
            class="in-zoom lift col-span-2 hidden rounded-[24px] sm:block md:rounded-[28px]"
            priority
            sizes="(min-width: 1024px) 300px, 50vw"
          />
          <div
            class="in-zoom lift flex flex-col justify-between rounded-[24px] bg-paper p-4 text-ink md:rounded-[28px] md:p-5"
          >
            <span class="text-[12px] text-body md:text-[13px]">ดูแลเด็กๆ ในพะเยา</span>
            <span class="flex items-baseline gap-1.5">
              <span
                class="font-condensed text-[40px] font-bold leading-none text-brand md:text-[48px]"
                ><CountUp :value="years"
              /></span>
              <span class="text-sm text-body">ปี</span>
            </span>
          </div>
          <router-link
            :to="{ hash: '#reviews' }"
            class="group col-span-2 flex flex-col justify-between rounded-[24px] border border-line bg-white p-4 lift md:rounded-[28px] md:p-5"
          >
            <span class="flex items-center justify-between gap-2">
              <span class="pop-load flex -space-x-2.5">
                <span
                  v-for="(r, i) in reviews.slice(0, 4)"
                  :key="r.name"
                  :style="{ '--i': i }"
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-sm font-semibold text-brand ring-2 ring-white"
                  >{{ r.initial }}</span
                >
              </span>
              <!-- the five stars stamp down one after another as the page loads -->
              <span class="stamp-load flex gap-0.5 text-sun" aria-hidden="true">
                <svg
                  v-for="n in 5"
                  :key="n"
                  :style="{ '--i': n - 1 }"
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
            class="in-zoom lift rounded-[24px] md:rounded-[28px]"
            sizes="(min-width: 1024px) 150px, 50vw"
          />
        </div>
      </div>

      <!-- the path from first visit to seeing results, as a row of numbered steps; hidden on
           phones, where the sticky call bar already offers the booking step -->
      <div class="wrap hidden pb-20 md:block">
        <ol
          v-reveal="{ stagger: 70 }"
          class="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-[repeat(4,1fr)_auto] md:overflow-visible md:px-0"
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
              :to="bookingLink"
              class="flex h-full items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-cream transition-colors hover:bg-brand"
              >นัดเลย →</router-link
            >
          </li>
        </ol>
      </div>
    </section>

    <!-- Welcome: what makes Brighton different, one card per idea (issue #31) -->
    <section id="why" class="scroll-mt-24 pb-12 md:pb-[104px]">
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
              <span v-reveal="{ variant: 'wipe', delay: 350 }" class="marker">ความสุข</span
              >คือจุดเริ่มต้นของการเรียนรู้ที่<span
                v-reveal="{ variant: 'wipe', delay: 850 }"
                class="marker"
                >ดีที่สุด</span
              >”
            </h2>
          </div>
          <p class="text-base leading-[1.85] text-muted md:text-[17px]">
            ที่ Brighton เราไม่ได้เป็นเพียงแค่โรงเรียนสอนภาษา
            แต่เราเป็นพื้นที่แห่งการเรียนรู้ที่ให้ความสำคัญกับ “ความรู้สึก” ของผู้เรียน
            ห้องเรียนที่ลูกกล้าพูดโดยไม่กลัวผิด ได้ลงมือทำผ่านกิจกรรม พร้อมหลักสูตรระดับสากล (Oxford
            &amp; Jolly Phonics) และ teacher ที่ผ่านการคัดเลือกและอบรม
            เพื่อให้ลูกเติบโตอย่างมั่นคงทั้งทักษะภาษาและทัศนคติ
          </p>
        </div>

        <div
          v-reveal="{ stagger: 90 }"
          class="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-2 md:gap-5 lg:grid-cols-12"
        >
          <BentoCard
            class="md:col-span-2 lg:col-span-7"
            icon="target"
            sub="วัดระดับก่อนเริ่มเรียน แล้วเรียนในระดับชั้นที่เหมาะกับลูก ติดตามผลตลอดปี และสอบเลื่อนระดับทุกปี"
            tag="ฟรี"
            title="วัดระดับก่อนเรียน"
          >
            <LevelLadder />
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
            <LessonSteps :minutes="[10, 15, 25, 10]" :steps="lessonSteps" />
          </BentoCard>

          <BentoCard
            class="lg:col-span-4"
            icon="users"
            sub="Teacher ผู้สอนคลาสที่ Brighton ใช้ภาษาอังกฤษเป็นภาษาแรก"
            title="Teacher เจ้าของภาษา"
            tone="paper"
          >
            <CheckSteps
              :items="teacherStandards.map(([standard]) => standard)"
              complete-label="Teacher ของ Brighton ทุกคนผ่านครบทุกข้อ"
            />
            <template #foot>
              <router-link class="font-semibold text-brand hover:underline" to="/teachers"
                >ดูทีม teacher ชาวต่างชาติของเรา →</router-link
              >
            </template>
          </BentoCard>

          <BentoCard
            class="lg:col-span-4"
            icon="chat"
            sub="ห้องเรียนแบบ Can Do Attitude ตอบผิดได้ teacher และเพื่อนช่วยกันให้กำลังใจ"
            title="กล้าพูด ไม่กลัวผิด"
            tone="blush"
          >
            <ChatDemo :lines="chat" />
            <template #foot>ตัวอย่างบทสนทนาในห้องเรียน</template>
          </BentoCard>

          <BentoCard
            class="md:col-span-2 lg:col-span-4"
            icon="chart"
            sub="Teacher ประเมินลูกตลอดปี ผู้ปกครองดูผลการเรียนได้ใน LINE"
            title="เห็นพัฒนาการของลูก"
          >
            <SkillRadar
              animated
              :average="radar.average"
              :axes="radar.axes"
              :child="radar.child"
              :name="sampleChild.nickname"
              class="my-auto"
            />
            <template #foot>
              <router-link class="link-arrow" to="/results">ดูวิธีดูผลการเรียน →</router-link>
            </template>
          </BentoCard>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section id="courses" class="wrap scroll-mt-24 pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${courses.length} หลักสูตร`"
        class="mb-5 md:mb-8"
        eyebrow="Our Courses"
        icon="book"
        sub="เลือกชั้นเรียนของลูก แล้วดูว่าคอร์สไหนเหมาะ ทุกหลักสูตรเริ่มจากการวัดระดับฟรี"
        title="หลักสูตรตามช่วงวัย"
        tone="brand"
      />

      <!-- the parent picks their child's stage; matching courses are marked, the rest step back -->
      <div
        v-reveal
        class="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 md:mb-6"
        role="group"
        aria-label="ลูกอยู่ชั้นไหน"
      >
        <span class="text-[15px] font-semibold">ลูกอยู่ชั้นไหน?</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="[key, label] in [['', 'ทั้งหมด'], ...stages]"
            :key="key"
            :aria-pressed="stage === key"
            :class="{ 'chip-on': stage === key }"
            class="chip h-10 px-4 text-[15px]"
            type="button"
            @click="stage = key"
          >
            {{ label }}
          </button>
        </div>
      </div>

      <div v-reveal="{ stagger: 90 }" class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        <CourseCard v-for="c in courses" :key="c.slug" :course="c" :picked="stage" />
      </div>

      <!-- not sure: the free placement test decides -->
      <div
        v-reveal
        class="mt-3 flex flex-col gap-4 rounded-[28px] border border-[#D3E0CF] bg-sage p-5 sm:flex-row sm:items-center sm:justify-between md:mt-5 md:rounded-[32px] md:px-8 md:py-6"
      >
        <span class="flex items-start gap-3">
          <BentoIcon class="mt-0.5 h-6 w-6 flex-none text-sagedeep" name="target" />
          <span class="flex flex-col gap-0.5">
            <b class="font-display text-lg font-semibold md:text-xl">ไม่แน่ใจว่าเริ่มที่ไหน?</b>
            <span class="text-[15px] text-body"
              >วัดระดับฟรี ผลสอบจะบอกคลาสที่เหมาะกับลูก · เริ่มเรียนได้ตั้งแต่ 3 ขวบ</span
            >
          </span>
        </span>
        <router-link
          :to="bookingLink"
          class="btn-primary h-12 flex-none px-7 text-[15px] shadow-none md:h-14 md:text-base"
          >นัดวัดระดับฟรี →</router-link
        >
      </div>
    </section>

    <!-- Programs: teachers, camp, EF, MEP/EP, each with its figure from programs.js -->
    <section id="programs" class="wrap scroll-mt-24 pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        class="mb-5 md:mb-10"
        count="4 โครงการ"
        eyebrow="More at Brighton"
        icon="sparkle"
        sub="Teacher ต่างชาติในโรงเรียนทั่วพะเยา ค่ายภาษาช่วงปิดเทอม ทักษะ EF และห้องเรียน EP / MEP"
        title="มากกว่าคลาสภาษาอังกฤษ"
        tone="sage"
      />
      <div
        v-reveal="{ stagger: 90 }"
        class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-12"
      >
        <BentoCard
          class="lg:col-span-5"
          :sub="prog.teachers.card"
          :title="prog.teachers.label"
          :to="prog.teachers.path"
          icon="globe"
          tone="paper"
        >
          <p class="mt-auto flex items-baseline gap-2">
            <span class="font-condensed text-[56px] font-bold leading-none text-brand"
              ><CountUp :delay="250" :value="`~${team.foreignTeachers}`"
            /></span>
            <span class="text-sm text-body">คน</span>
          </p>
          <template #foot><span class="font-semibold text-brand">ดูรายละเอียด →</span></template>
        </BentoCard>

        <BentoCard
          :sub="prog.camp.card"
          :title="prog.camp.label"
          :to="prog.camp.path"
          class="lg:col-span-7"
          icon="sun"
          tone="sun"
        >
          <div class="in-stagger mt-auto flex flex-wrap gap-2">
            <span class="rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-sun">{{
              prog.camp.camp.term
            }}</span>
            <span
              v-for="(week, i) in campWeeks"
              :key="week"
              :style="{ '--i': i + 1 }"
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
          <div class="in-stagger mt-auto flex flex-wrap gap-2">
            <span
              v-for="(skill, i) in efSkills"
              :key="skill"
              :style="{ '--i': i }"
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
            <span class="font-condensed text-[56px] font-bold leading-none text-brand"
              ><CountUp :delay="250" :value="team.schools"
            /></span>
            <span class="text-sm text-body">โรงเรียนในพะเยา</span>
          </p>
          <template #foot><span class="link-arrow">ดูรายละเอียด →</span></template>
        </BentoCard>
      </div>
    </section>

    <!-- Results: real exam results and the parents' LINE app, each opening its full page.
         The nav's Hall of Fame and ดูผลการเรียน scroll to these two cards. -->
    <section id="results" class="wrap scroll-mt-24 pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        class="mb-5 md:mb-10"
        eyebrow="Results"
        icon="trophy"
        sub="ผลสอบจริงของนักเรียนไบรท์ตัน และแอปผู้ปกครองใน LINE ที่ติดตามผลการเรียนของลูกได้ในมือถือ"
        title="ผลการเรียนที่เห็นได้จริง"
        tone="brand"
      />
      <div v-reveal="{ stagger: 90 }" class="grid grid-cols-1 gap-3 md:gap-5 lg:grid-cols-12">
        <BentoCard
          id="hall-of-fame"
          class="lg:col-span-7"
          icon="trophy"
          sub="ผลสอบ IELTS Academic และ Oxford Placement Test ของนักเรียนไบรท์ตัน"
          title="Hall of Fame"
          to="/hall-of-fame"
          tone="paper"
        >
          <div class="mt-auto grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1 rounded-[20px] border border-line2 bg-white/70 p-4">
              <span class="text-[13px] text-body">IELTS Academic</span>
              <span
                class="font-condensed text-[44px] font-bold leading-none text-brand md:text-[52px]"
                ><CountUp :delay="250" :value="topIelts.overall"
              /></span>
              <span class="text-[13px] text-body">Overall · CEFR {{ topIelts.cefr }}</span>
            </div>
            <div class="flex flex-col gap-1 rounded-[20px] border border-line2 bg-white/70 p-4">
              <span class="text-[13px] text-body">Oxford Young Learners</span>
              <span
                class="font-condensed text-[44px] font-bold leading-none text-ink md:text-[52px]"
                >B1+</span
              >
              <span class="text-[13px] text-body">นักเรียนหลายคนได้ระดับ B1 ขึ้นไป</span>
            </div>
          </div>
          <template #foot><span class="font-semibold text-brand">ดู Hall of Fame →</span></template>
        </BentoCard>

        <BentoCard
          id="parent-app"
          class="lg:col-span-5"
          icon="chart"
          sub="ติดตามผลการเรียน เครดิต และชำระค่าเรียนของลูกได้ในมือถือ ผ่านแอปผู้ปกครองใน LINE"
          title="ดูผลการเรียนผ่าน LINE"
          tone="sage"
        >
          <ul class="in-cascade flex flex-col gap-2.5">
            <li
              v-for="(f, i) in appFeatures"
              :key="f.title"
              :style="{ '--i': i }"
              class="flex items-center gap-2.5 text-[15px] font-medium"
            >
              <BentoIcon class="h-5 w-5 flex-none text-sagedeep" name="checkCircle" />{{ f.title }}
            </li>
          </ul>
          <div class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5">
            <a
              :href="contact.line"
              class="inline-flex h-12 items-center whitespace-nowrap rounded-full bg-[#06C755] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#05A948]"
              rel="noopener"
              target="_blank"
              >เพิ่มเพื่อน {{ contact.lineName }}</a
            >
            <router-link class="font-semibold text-sagedeep hover:underline" to="/results"
              >ดูวิธีใช้งาน →</router-link
            >
          </div>
        </BentoCard>
      </div>
    </section>

    <!-- Our story: founder, students, a success story; the full version is on /about -->
    <section class="wrap pb-12 md:pb-[104px]">
      <div
        v-reveal="{ variant: 'scale' }"
        class="grid gap-6 rounded-3xl bg-paper p-6 text-ink md:gap-8 md:rounded-[32px] md:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14"
      >
        <div class="flex flex-col gap-4">
          <span class="font-condensed text-xs font-semibold uppercase tracking-[.14em] text-brand"
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
          <router-link class="mt-1 self-start font-semibold text-brand hover:underline" to="/about"
            >อ่านเรื่องราวของเรา →</router-link
          >
        </div>
        <div v-reveal="{ stagger: 90, delay: 200 }" class="grid grid-cols-2 gap-3 self-center">
          <div
            v-for="[value, label] in storyStats"
            :key="label"
            class="flex flex-col gap-2 rounded-[20px] bg-white/70 p-5"
          >
            <span
              class="font-condensed text-[36px] font-bold leading-none text-brand md:text-[44px]"
              ><CountUp :delay="200" :value="value"
            /></span>
            <span class="text-sm leading-[1.5] opacity-85">{{ label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="wrap pb-12 md:pb-[104px]">
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
          alt="นักเรียนและ teacher ที่ Brighton"
          :src="photos[0]"
          class="in-zoom col-span-2 aspect-[16/10] rounded-[18px] md:row-span-2 md:aspect-auto md:rounded-3xl"
          sizes="(min-width: 768px) 25vw, 100vw"
        />
        <PhotoBox
          :src="photos[1]"
          alt="กิจกรรมที่ Brighton"
          class="in-zoom aspect-square rounded-[18px] md:aspect-auto md:rounded-3xl"
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
          class="in-zoom col-span-2 hidden rounded-3xl md:block"
          sizes="50vw"
        />
      </div>
    </section>

    <!-- Reviews: a masonry bento of parents' Facebook comments, opened by a brand card -->
    <section id="reviews" class="wrap scroll-mt-24 pb-12 md:pb-[104px]">
      <SectionHead
        v-reveal
        :count="`${reviews.length} รีวิว`"
        class="mb-5 md:mb-10"
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
          class="relative mb-3 flex break-inside-avoid flex-col gap-5 overflow-hidden rounded-[28px] bg-brand p-5 text-white md:mb-4 md:gap-6 md:p-7"
        >
          <div
            aria-hidden="true"
            class="absolute -right-10 -top-10 grid grid-cols-[60px_60px] gap-2.5 opacity-[.14]"
          >
            <div v-for="n in 4" :key="n" class="h-[60px] border-[7px] border-white"></div>
          </div>
          <span class="flex items-baseline gap-2">
            <span class="font-condensed text-[64px] font-bold leading-none text-sun"
              ><CountUp :delay="250" :value="years"
            /></span>
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
        <!-- phones show the first few and load more on request; from md every review shows.
             Hidden ones stay in the page (pre-rendered for search), only out of sight. -->
        <figure
          v-for="(r, i) in reviews"
          :key="r.name"
          :class="i >= reviewsShown && 'hidden md:block'"
          class="lift mb-3 break-inside-avoid rounded-[28px] border border-line bg-white p-5 text-ink md:mb-4 md:p-6"
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
                <span class="stamp flex gap-0.5 text-sun">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    :style="{ '--i': n - 1 }"
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
      <button
        v-if="reviewsShown < reviews.length"
        class="btn-outline mt-5 h-12 w-full text-[15px] md:hidden"
        type="button"
        @click="reviewsShown += reviewStep"
      >
        ดูรีวิวเพิ่มเติม · อีก {{ reviews.length - reviewsShown }} รีวิว
      </button>
    </section>
  </main>
</template>

<script>
import { useHead } from '@vueuse/head'
import BentoCard from '@/components/BentoCard.vue'
import BentoIcon from '@/components/BentoIcon.vue'
import LevelLadder from '@/components/LevelLadder.vue'
import ChatDemo from '@/components/ChatDemo.vue'
import CountUp from '@/components/CountUp.vue'
import CourseCard from '@/components/CourseCard.vue'
import LessonSteps from '@/components/LessonSteps.vue'
import CheckSteps from '@/components/CheckSteps.vue'
import SectionHead from '@/components/SectionHead.vue'
import SkillRadar from '@/components/SkillRadar.vue'
import PhotoBox from '@/components/PhotoBox.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import { useRandomPhotos } from '@/composables/useRandomPhotos'
import { contact, team, yearsLabel } from '@/data/site'
import { founderStory, studentsLabel, teacherStandards } from '@/data/about'
import reviewList from '@/data/reviews.json'
import { courses, lessonSteps, stages } from '@/data/courses'
import { bookingLink } from '@/data/pages'
import { homePhotos } from '@/data/photos'
import { programBySlug } from '@/data/programs'
import { appFeatures, radar, sampleChild } from '@/data/parentReport'
import { ieltsStudents } from '@/data/hallOfFame'

export default {
  name: 'HomeView',
  components: {
    BentoCard,
    BentoIcon,
    LevelLadder,
    ChatDemo,
    CountUp,
    CourseCard,
    CheckSteps,
    LessonSteps,
    SectionHead,
    SkillRadar,
    PhotoBox,
    IconFacebook
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
      // reviews shown on phones before 'load more', and how many each tap adds
      reviewsShown: 5,
      reviewStep: 5,
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
      // the numbered strip under the hero, from first visit to seeing results
      journey: [
        { label: 'วัดระดับฟรี', to: { hash: '#why' } },
        { label: 'เลือกหลักสูตรตามวัย', to: { hash: '#courses' } },
        { label: 'เรียนกับ teacher เจ้าของภาษา', to: { hash: '#programs' } },
        { label: 'ดูพัฒนาการใน LINE', to: { hash: '#parent-app' } }
      ],
      courses,
      stages,
      bookingLink,
      // the school stage picked above the course cards ('' = all)
      stage: '',
      prog: programBySlug,
      campWeeks: programBySlug.camp.camp.weeks.map((w) => w.name.replace(/^Week \d+ · /, '')),
      efSkills: programBySlug.ef.sections[0].items.map(([skill]) => skill),
      // the "กล้าพูด ไม่กลัวผิด" card: a sample exchange, labelled as one on the card
      chat: [
        ['teacher', 'What animal has four legs?'],
        ['child', 'A cat!', 'Mint'],
        ['teacher', 'Hmm… it has long ears.'],
        ['child', 'A dog?', 'Mint'],
        ['teacher', 'Nice try! Some dogs have long ears, but not this one. Can anyone help?'],
        ['child', 'A rabbit!', 'Ploy'],
        ['teacher', 'Yes, correct! Now it’s your turn to ask me a question.']
      ],
      // the progress card: the sample child's radar from the /results demo
      radar,
      sampleChild,
      appFeatures,
      topIelts: ieltsStudents[0]
    }
  }
}
</script>
