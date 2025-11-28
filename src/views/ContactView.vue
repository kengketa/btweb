<template>
  <main>
    <!-- Header -->
    <div class="bg-slate-50 py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          มาเป็นครอบครัวเดียวกันที่ <span class="text-red-600">Brighton</span>
        </h1>
        <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          หากคุณพ่อคุณแม่มีข้อสงสัย หรือต้องการปรึกษาเรื่องการวางแผนเรียนภาษาให้ลูกๆ ทางโรงเรียนยินดีให้คำแนะนำด้วยความเต็มใจครับ
        </p>
      </div>
    </div>

    <!-- Contact Info Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Left Column: Details -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">📍 ที่ตั้งโรงเรียน</h2>
              <p class="text-slate-600">
                Brighton Language Academy<br>
                56/6 ถ.ประตูชัย ต.เวียง อ.เมือง<br>
                จ.พะเยา 56000
              </p>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">☎️ ช่องทางการติดต่อ</h2>
              <ul class="space-y-2 text-slate-600">
                <li><strong>โทรศัพท์:</strong> <a href="tel:054070700" class="text-red-600 hover:underline">054-070-700</a></li>
                <li><strong>Facebook:</strong> <a href="#" class="text-red-600 hover:underline">Brighton Language Academy</a></li>
                <li><strong>Line:</strong> <a href="#" class="text-red-600 hover:underline">@brightonphayao</a></li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">🕒 เวลาทำการ</h2>
              <p class="text-slate-600">อังคาร - อาทิตย์<br>09.00 - 18.00 น.</p>
            </div>
          </div>

          <!-- Right Column: Map -->
          <div>
            <div class="aspect-w-16 aspect-h-9 bg-slate-200 rounded-2xl flex items-center justify-center">
              <p class="text-slate-500">Google Maps Embed Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 bg-slate-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">เริ่มต้นก้าวแรกที่มั่นคงทางภาษาไปพร้อมกับเรา</h2>
        <p class="text-lg text-slate-600 mb-8">จองคิววัดระดับภาษาฟรีได้แล้ววันนี้</p>
        <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition transform hover:-translate-y-1">
          ติดต่อสอบถามทาง Line
        </button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ContactView'
}
</script>
