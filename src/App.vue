<template>
  <div class="min-h-screen bg-white font-sans text-slate-600 overflow-x-hidden">
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <router-link to="/" class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-2xl text-red-600 tracking-tight"> BRIGHTON </span>
              <span class="text-xs font-bold text-slate-800 uppercase tracking-widest">
                Language Academy
              </span>
            </div>
          </router-link>

          <div class="hidden md:flex space-x-8 items-center">
            <router-link
              v-for="link in navLinks"
              :key="link.name"
              :to="link.to"
              class="text-slate-600 hover:text-red-600 font-bold transition"
              active-class="text-red-600"
            >
              {{ link.name }}
            </router-link>
            <router-link
              to="/contact"
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-200 transition transform hover:-translate-y-0.5"
            >
              Contact Us
            </router-link>
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
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-red-50 hover:text-red-600"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <RouterView />

    <footer class="bg-white py-12 border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-500 font-medium mb-2">© 2015 Brighton Education Co., Ltd.</p>
        <p class="text-slate-400 text-sm">Phayao, Thailand</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView,
    RouterLink
  },
  data() {
    return {
      isMobileMenuOpen: false,
      navLinks: [
        { name: 'หน้าแรก', to: '/' },
        { name: 'เกี่ยวกับเรา', to: '/about' },
        { name: 'หลักสูตรของเรา', to: '/courses' }
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
