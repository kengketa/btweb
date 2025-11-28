<template>
  <main>
    <!-- Header -->
    <div class="bg-slate-50 py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          หลักสูตรคุณภาพเพื่อการเติบโตที่สมวัย
        </h1>
        <p class="mt-4 text-xl text-slate-600">Young Learners Program</p>
      </div>
    </div>

    <!-- Intro -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-lg text-slate-600 leading-relaxed">
          เราออกแบบเส้นทางการเรียนรู้ให้เหมาะกับเด็กแต่ละช่วงวัย โดยเน้นความเข้าใจ ไม่ใช่การท่องจำ เพื่อผลลัพธ์ที่ยั่งยืน
        </p>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="py-10 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
          <!-- Course 1: English Level Standard -->
          <div class="grid md:grid-cols-2 gap-10 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl font-bold text-slate-900 mb-2">English Level Standard</h2>
              <p class="text-red-600 font-semibold mb-4">เหมาะสำหรับ: น้องๆ อายุ 3-12 ปี ที่ต้องการปูพื้นฐานภาษาอังกฤษให้แน่นครบทุกทักษะ</p>
              <ul class="space-y-4 text-slate-600">
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Oxford Curriculum:</strong> ใช้หนังสือและสื่อการสอนจาก Oxford University Press มาตรฐานระดับโลก</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Total English Environment:</strong> เรียนกับครูเจ้าของภาษา (Native Speaker) ช่วยปรับสำเนียงและสร้างความคุ้นเคย</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Placement Test:</strong> "เรียนถูกที่ ไปได้ไว" เรามีการสอบวัดระดับก่อนเริ่มเรียนเสมอ เพื่อให้น้องๆ ได้อยู่ในชั้นเรียนที่ตรงกับความสามารถ</span>
                </li>
              </ul>
            </div>
            <div class="order-1 md:order-2">
              <img src="https://placehold.co/600x400/FFE4E6/FF0000?text=English+Level" alt="English Level Standard Course" class="rounded-2xl shadow-lg">
            </div>
          </div>

          <!-- Course 2: Phonics Master -->
          <div class="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src="https://placehold.co/600x400/E6F4FF/0000FF?text=Phonics+Master" alt="Phonics Master Course" class="rounded-2xl shadow-lg">
            </div>
            <div>
              <h2 class="text-3xl font-bold text-slate-900 mb-2">Phonics Master</h2>
              <p class="text-red-600 font-semibold mb-4">เหมาะสำหรับ: น้องๆ อายุ 5-12 ปี ที่ต้องการเน้นทักษะการอ่านและการออกเสียง</p>
              <ul class="space-y-4 text-slate-600">
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Jolly Phonics:</strong> หลักสูตรการสอนแบบ Multisensory ที่สนุกและได้ผลจริง ช่วยให้เด็กเข้าใจเสียงของตัวอักษร</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Reading Foundation:</strong> ปูพื้นฐานสำคัญเพื่อให้อ่านออก เขียนได้ และสะกดคำเป็น โดยไม่ต้องอาศัยการจำเพียงอย่างเดียว</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-3 mt-1">✔</span>
                  <span><strong>Building Confidence:</strong> เมื่ออ่านได้คล่อง ความมั่นใจในการเรียนวิชาอื่นๆ ก็จะตามมา</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Services -->
    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">บริการอื่นๆ ของเรา</h2>
          <div class="flex flex-col md:flex-row justify-center gap-8 mt-8 text-lg">
            <p class="bg-white p-6 rounded-xl shadow">คอร์สเตรียมสอบ (Exam Prep)</p>
            <p class="bg-white p-6 rounded-xl shadow">บริการจัดอบรมภาษาอังกฤษสำหรับองค์กร (Corporate Training)</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'CoursesView'
}
</script>
