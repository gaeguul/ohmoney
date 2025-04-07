import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomeVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
    },
    {
      path: '/signin',
      name: 'signin',
    },
    {
      path: '/mypage',
      name: 'mypage',
    },
    {
      path: '/accounts',
      name: 'accounts',
    },
    {
      path: '/accounts/:id',
      name: 'accountDetails',
    },
    {
      path: '/accounts/new',
      name: 'newAccount',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
    },
    {
      path: '/category',
      name: 'category',
    },
  ],
})

export default router
