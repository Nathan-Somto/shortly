import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardHomeView from '@/views/DashboardHomeView.vue'
import Layout from '@/components/dashboard/layout.vue'
import RedirectView from '@/views/RedirectView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import { BASE_API_URL } from '@/constants'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:shortUrl',
      component: RedirectView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout,
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: DashboardHomeView
        },
        {
          path: 'link-history',
          name: 'dashboard-history',
          component: () => import('@/views/DashboardLinkHistoryView.vue')
        },
        {
          path: 'link/:id',
          name: 'dashboard-link',
          component: () => import('@/views/DashboardLinkView.vue')
        },
        {
          path: 'qr-codes',
          name: 'dashboard-qr-codes',
          component: () => import('@/views/DashboardQrCodesView.vue')
        },
        {
          path: 'analytics/:id',
          name: 'dashboard-analytics',
          component: () => import('@/views/DashboardLinkAnalyticsView.vue')
        }
      ]

    },
  ],
})
router.beforeEach(async (to, from, next) => {
  // if it is a dashboard route, check if the user is authenticated
  // if the name starts with dashboard, check if the user is authenticated
  console.log("to.path: ", to.path)
  if (to.path.startsWith('/dashboard')) {
    try {
      const userStore = useUserStore();
      const user = userStore.user;
      console.log("the user: ", user)
      if (user === null) {
        const res = await userStore.fetchUser();
        if (!res) return next({ name: 'login' });
      }
      return next();
    }
    catch (err) {
      console.log("failed to fetch")
      return next({ name: 'login' })
    }
  }
  next();
})
export default router
