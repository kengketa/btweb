import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// The home page ships in the main bundle; every other page loads on first visit.
const AboutView = () => import('../views/AboutView.vue')
const CoursesView = () => import('../views/CoursesView.vue')
const ContactView = () => import('../views/ContactView.vue')
const CourseDetailView = () => import('../views/CourseDetailView.vue')
const NewsView = () => import('../views/NewsView.vue')
const PrivacyPolicyView = () => import('../views/PrivacyPolicyView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView
    },
    {
      path: '/courses/:slug',
      name: 'course',
      component: CourseDetailView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // leave room for the sticky nav when jumping to a section
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    // first page load: already at the top, and scrolling there would force a
    // layout while the page is still rendering
    if (from === START_LOCATION) return false
    return { top: 0 }
  }
})

// A deploy replaces the page chunks, so a tab opened before it can't fetch the
// next page's code. Load that page fresh instead of leaving the click dead.
router.onError((error, to) => {
  if (/dynamically imported module|Importing a module script failed/i.test(error?.message)) {
    window.location.assign(to.fullPath)
  }
})

export default router
