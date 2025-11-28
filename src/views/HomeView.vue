<template>
  <div class="min-h-screen bg-white font-sans text-slate-600 overflow-x-hidden">
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div
              class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md transform -rotate-3"
            >
              <span class="font-bold text-xl">B</span>
            </div>
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-2xl text-red-600 tracking-tight"> BRIGHTON </span>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Language Academy
              </span>
            </div>
          </div>

          <div class="hidden md:flex space-x-8 items-center">
            <a
              v-for="link in navLinks"
              :key="link.name"
              :href="link.href"
              class="text-slate-600 hover:text-red-600 font-bold transition"
            >
              {{ link.name }}
            </a>
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-200 transition transform hover:-translate-y-0.5"
            >
              Contact Us
            </button>
          </div>

          <div class="md:hidden flex items-center">
            <button
              class="text-slate-600 hover:text-red-600 focus:outline-none"
              @click="toggleMenu"
            >
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="!isMobileMenuOpen"
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  v-else
                  d="M6 18L18 6M6 6l12 12"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-red-100">
        <div class="px-4 pt-4 pb-6 space-y-2">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="block px-4 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-red-50 hover:text-red-600"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </nav>

    <header class="relative bg-red-50 pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
      <div
        class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-4xl mx-auto">
          <span
            class="inline-block py-1.5 px-4 rounded-full bg-white text-red-600 text-sm font-bold mb-6 border border-red-100 shadow-sm uppercase tracking-wide"
          >
            Since 2015 • Phayao, Thailand
          </span>
          <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Be More Than <br />
            <span class="text-red-600">A Classroom.</span>
          </h1>
          <p class="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            "Education is preparation for life, not just for exams." <br />
            Join our <strong>Total English Environment</strong> where learning meets happiness.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 transition transform hover:-translate-y-1"
            >
              Find a Course
            </button>
            <button
              class="bg-white hover:bg-red-50 text-red-600 border-2 border-red-100 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </header>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-8 rounded-3xl border border-slate-100 bg-white shadow-lg hover:shadow-xl hover:border-red-200 transition duration-300 group"
          >
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition"
            >
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feature.title }}</h3>
            <p class="text-slate-500 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="programs" class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Programs</h2>
          <p class="text-lg text-slate-500">From Kindy Camps to Corporate Training</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="program in programs"
            :key="program.title"
            class="relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-200 transition transform hover:-translate-y-1"
          >
            <div
              :class="`absolute top-8 right-8 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${program.tagColor}`"
            >
              {{ program.tag }}
            </div>
            <div class="mt-4">
              <h3 class="text-2xl font-bold text-slate-900">{{ program.title }}</h3>
              <p class="text-red-600 font-medium mb-4">{{ program.subtitle }}</p>
              <p class="text-slate-500 mb-8 leading-relaxed">{{ program.desc }}</p>
              <button
                class="px-6 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-red-600 hover:text-white transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Parents & Students Love Us
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(review, index) in testimonials"
            :key="index"
            class="bg-red-50 p-8 rounded-3xl relative"
          >
            <div class="text-6xl text-red-200 absolute top-4 left-6 font-serif leading-none">“</div>
            <p class="text-slate-700 italic mb-6 relative z-10 pt-4">
              {{ review.text }}
            </p>
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-600 font-bold"
              >
                {{ review.author.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-slate-900 text-sm">{{ review.author }}</p>
                <p class="text-xs text-slate-500 uppercase">{{ review.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white border-t border-slate-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-20 rounded-full -mr-16 -mt-16 blur-2xl"
          ></div>

          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Visit Brighton Today
          </h2>
          <p class="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Ready to open your world? Come visit us for a consultation or check out our latest camp
            schedule.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button
              class="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Call Us
            </button>
            <button
              class="bg-transparent border-2 border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-white py-12 border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-500 font-medium mb-2">© 2015 Brighton Education Co., Ltd.</p>
        <p class="text-slate-400 text-sm">Phayao, Thailand</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BrightonLanguageAcademy',
  data() {
    return {
      isMobileMenuOpen: false,

      // NAVIGATION
      navLinks: [
        { name: 'Home', href: '#' },
        { name: 'Programs', href: '#programs' },
        { name: 'Camps', href: '#camps' },
        { name: 'Corporate', href: '#corporate' },
        { name: 'Study Abroad', href: '#abroad' }
      ],

      // FEATURES (Based on your "Mission & Philosophy")
      features: [
        {
          title: 'Total English Environment',
          desc: 'Learn with native speakers in an immersive environment. No translation, just pure communication.',
          icon: '🇬🇧'
        },
        {
          title: 'Game Based Learning',
          desc: 'We use activities, games, and phonics to make English stick without the stress of "cramming".',
          icon: '🎮'
        },
        {
          title: 'Inspiration First',
          desc: 'Our goal is to inspire self-discovery. We prepare students for life, not just for exams.',
          icon: '💡'
        }
      ],

      // COURSES / SERVICES (Based on your website products)
      programs: [
        {
          title: 'ECD & Phonics',
          subtitle: 'English Communicative Development',
          desc: 'Standard phonics curriculum to build strong reading and speaking foundations for young learners.',
          tag: 'Kids',
          tagColor: 'bg-green-100 text-green-700'
        },
        {
          title: 'English Camps',
          subtitle: 'Summer & October Camps',
          desc: 'The famous "Kindy Fun Camp" (Ages 3-8). Full-day activities, arts, cooking, and language immersion.',
          tag: 'Most Popular',
          tagColor: 'bg-red-100 text-red-600'
        },
        {
          title: 'Corporate Training',
          subtitle: 'For Organizations',
          desc: 'Human resource development courses designed to upgrade your team’s business English skills.',
          tag: 'Business',
          tagColor: 'bg-blue-100 text-blue-700'
        },
        {
          title: 'Study Abroad',
          subtitle: 'Consultation Services',
          desc: 'Step out of your comfort zone. We help you find inspiration and education opportunities overseas.',
          tag: 'International',
          tagColor: 'bg-purple-100 text-purple-700'
        }
      ],

      // REAL TESTIMONIALS (Adapted from your site)
      testimonials: [
        {
          text: "The atmosphere is so friendly. My child didn't like grammar before, but after less than 2 months here, the improvement is clear!",
          author: 'Lalita Viwatdecha',
          role: 'Parent'
        },
        {
          text: "My kid loves coming here! They say 'I want to go to Brighton' and rush to the car. Fun activities and great happiness.",
          author: 'Radchadawan Chaiyaso',
          role: 'Parent of Japan'
        },
        {
          text: 'Real native speakers and quality teaching. The environment makes you feel comfortable to speak, not awkward at all.',
          author: 'Pranee Satjawan',
          role: 'Adult Student'
        }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    }
  }
}
</script>
