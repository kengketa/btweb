import { createMemoryHistory, createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { programs } from '../data/programs'

// The home page ships in the main bundle; every other page loads on first visit.
const AboutView = () => import('../views/AboutView.vue')
const CoursesView = () => import('../views/CoursesView.vue')
const ContactView = () => import('../views/ContactView.vue')
const CourseDetailView = () => import('../views/CourseDetailView.vue')
const NewsView = () => import('../views/NewsView.vue')
const PrivacyPolicyView = () => import('../views/PrivacyPolicyView.vue')
const ProgramView = () => import('../views/ProgramView.vue')
const HallOfFameView = () => import('../views/HallOfFameView.vue')
const ResultsView = () => import('../views/ResultsView.vue')

const routes = [
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
  // /teachers, /camp, /ef, /mep: one view, content from src/data/programs.js
  ...programs.map((p) => ({
    path: p.path,
    name: p.slug,
    component: ProgramView,
    props: { slug: p.slug }
  })),
  {
    path: '/hall-of-fame',
    name: 'hall-of-fame',
    component: HallOfFameView
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView
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
]

// The phone page feed changes the address as the visitor scrolls from one page into
// the next; that change must leave the scroll position alone.
let keepScrollFor = null

export function replaceKeepingScroll(router, path) {
  keepScrollFor = path
  return router.replace(path).then((failure) => {
    if (failure) keepScrollFor = null
  })
}

function scrollBehavior(to, from, savedPosition) {
  if (to.path === keepScrollFor) {
    keepScrollFor = null
    return false
  }
  if (savedPosition) return savedPosition
  // leave room for the sticky nav when jumping to a section
  if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
  // first page load: already at the top, and scrolling there would force a
  // layout while the page is still rendering
  if (from === START_LOCATION) return false
  return { top: 0 }
}

// One router per app: the browser gets one, and the build makes one per pre-rendered page.
export function createAppRouter() {
  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior
  })

  // A deploy replaces the page chunks, so a tab opened before it can't fetch the
  // next page's code. Load that page fresh instead of leaving the click dead.
  router.onError((error, to) => {
    if (/dynamically imported module|Importing a module script failed/i.test(error?.message)) {
      window.location.assign(to.fullPath)
    }
  })

  return router
}
