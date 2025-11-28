<template>
  <main>
    <!-- Hero Section -->
    <header class="relative bg-red-50 pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
      <div
        class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            class="text-4xl md:text-6xl font-extrabold text-red-700 tracking-tight mb-4 uppercase"
          >
            BRIGHTON
          </h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Brighton Language Academy สถาบันสอนภาษามาตรฐานสากล ใจกลางเมืองพะเยา เน้นการเรียนรู้อย่าง
          </p>
          <p class="font-bold mb-10">มีความสุขและใช้งานได้จริง</p>
          <div class="flex justify-center">
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 transition transform hover:-translate-y-1"
            >
              นัดหมายวัดระดับภาษาฟรี
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Welcome Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Welcome to Our Family</h2>
        <p class="text-xl text-red-600 font-semibold mb-6">
          "เพราะเราเชื่อว่า... ความสุขคือจุดเริ่มต้นของการเรียนรู้ที่ดีที่สุด"
        </p>
        <p class="text-slate-600 leading-relaxed">
          ที่ Brighton เราไม่ได้เป็นเพียงแค่โรงเรียนสอนภาษา
          แต่เราเป็นพื้นที่แห่งการเรียนรู้ที่ให้ความสำคัญกับ "ความรู้สึก" ของผู้เรียน
          เราคัดสรรหลักสูตรระดับโลก (Oxford & Jolly Phonics) และทีมครูคุณภาพ
          เพื่อให้มั่นใจว่าบุตรหลานของท่านจะเติบโตอย่างมั่นคงทั้งทักษะภาษาและทัศนคติ
        </p>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            ทำไมผู้ปกครองในพะเยาถึงไว้วางใจ Brighton?
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="reason in whyChooseUs"
            :key="reason.title"
            class="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl hover:border-red-200 border border-transparent transition duration-300 group"
          >
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition"
            >
              {{ reason.icon }}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">{{ reason.title }}</h3>
            <p class="text-slate-500 leading-relaxed">{{ reason.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Signature Courses Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Signature Courses</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            v-for="course in signatureCourses"
            :key="course.title"
            class="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-xl transition"
          >
            <h3 class="text-2xl font-bold text-slate-900">{{ course.title }}</h3>
            <p class="text-red-600 font-medium mb-4">{{ course.age }}</p>
            <p class="text-slate-500 mb-8 leading-relaxed">{{ course.desc }}</p>
            <router-link
              v-if="course.details"
              class="px-6 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
              to="/courses"
            >
              ดูรายละเอียดเพิ่มเติม
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      whyChooseUs: [
        {
          title: 'World-Class Curriculum',
          desc: 'หลักสูตรมาตรฐานสากลจาก Oxford และ Jolly Phonics พร้อมแนวทางพัฒนาภาษาตามกรอบ CEFR เพื่อให้เรียนแล้วใช้ได้จริง',
          icon: '🌍'
        },
        {
          title: 'Qualified Native Teachers',
          desc: 'ครูเจ้าของภาษาและครูผู้เชี่ยวชาญ ช่วยพัฒนาทักษะฟัง–พูด–อ่าน–เขียน ให้ก้าวหน้าอย่างเป็นระบบตามระดับ CEFR',
          icon: '👩‍🏫'
        },
        {
          title: 'Warm & Caring Environment',
          desc: 'บรรยากาศการเรียนรู้ที่อบอุ่น ใส่ใจ และเป็นมิตร ทำให้เด็กมีความสุขกับการเรียน และพร้อมเติบโตอย่างมั่นใจ',
          icon: '🏡'
        },
        {
          title: 'Personalized Placement Test',
          desc: 'ประเมินระดับภาษาแบบละเอียดตามมาตรฐาน CEFR เพื่อตั้งต้นในระดับที่เหมาะสมที่สุด และเห็นพัฒนาการได้อย่างชัดเจน',
          icon: '✅'
        }
      ],
      signatureCourses: [
        {
          title: 'English Level (3-12 ปี)',
          age: 'พัฒนาทักษะรอบด้าน ฟัง-พูด-อ่าน-เขียน ด้วยหลักสูตร Oxford',
          desc: 'คอร์สเรียนที่เน้นการพัฒนาทักษะภาษาอังกฤษอย่างสมดุล ผ่านกิจกรรมที่สนุกสนานและสื่อการสอนที่ทันสมัยจาก Oxford University Press',
          details: false
        },
        {
          title: 'Brighton Phonics (5-12 ปี)',
          age: 'ปูพื้นฐานการอ่านออกเสียงให้เป๊ะ ด้วยหลักสูตร Jolly Phonics',
          desc: 'หลักสูตรที่ช่วยให้น้องๆ อ่านออกเสียงได้อย่างถูกต้องและมั่นใจ ด้วยการเรียนรู้ผ่านระบบ Jolly Phonics ที่ได้รับการยอมรับในระดับสากล',
          details: true
        }
      ]
    }
  }
}
</script>
