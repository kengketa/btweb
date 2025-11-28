<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  name: 'KidsLanguageSchool',
  data() {
    return {
      isMobileMenuOpen: false,
      // Data for Navigation
      navLinks: [
        { name: 'Home', href: '#' },
        { name: 'Our Teachers', href: '#' },
        { name: 'Programs', href: '#' },
        { name: 'Parents Area', href: '#' }
      ],
      // Data for Features Section
      features: [
        {
          title: 'Playful Learning',
          desc: 'We use games, songs, and stories to make English stick.',
          icon: '🎨',
          color: 'bg-yellow-100 text-yellow-600'
        },
        {
          title: 'Native Speakers',
          desc: 'Qualified teachers who know how to make kids smile.',
          icon: '🗣️',
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Safe Environment',
          desc: 'Small class sizes and a cozy, colorful atmosphere.',
          icon: '🛡️',
          color: 'bg-green-100 text-green-600'
        }
      ],
      // Data for Courses
      courses: [
        {
          title: 'Tiny Talkers',
          age: 'Ages 3-5',
          desc: 'First steps in language through puppets and play.',
          bgColor: 'bg-rose-50 border-rose-200',
          btnColor: 'bg-rose-500 hover:bg-rose-600'
        },
        {
          title: 'Junior Explorers',
          age: 'Ages 6-9',
          desc: 'Reading, writing, and speaking adventures.',
          bgColor: 'bg-indigo-50 border-indigo-200',
          btnColor: 'bg-indigo-500 hover:bg-indigo-600'
        },
        {
          title: 'Global Teens',
          age: 'Ages 10-14',
          desc: 'Real-world conversation and exam preparation.',
          bgColor: 'bg-teal-50 border-teal-200',
          btnColor: 'bg-teal-500 hover:bg-teal-600'
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
