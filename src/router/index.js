import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomeVue.vue'
import SignupView from '@/pages/user/SignupView.vue'
import SigninView from '@/pages/user/SigninView.vue'
import MypageView from '@/pages/user/MypageView.vue'
import AccountListPage from '@/pages/account/AccountListPage.vue'
import AccountEditPage from '@/pages/account/AccountEditPage.vue'
import AccountCreatePage from '@/pages/account/AccountCreatePage.vue'
import AnalysisDashboard from '@/pages/analysis/AnalysisDashboard.vue'
import AnalysisCategory from '@/pages/analysis/AnalysisCategory.vue'

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
      component: SignupView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountListPage,
    },
    {
      path: '/accounts/:id',
      name: 'accountDetails',
      component: AccountEditPage,
    },
    {
      path: '/accounts/new',
      name: 'newAccount',
      component: AccountCreatePage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AnalysisDashboard,
    },
    {
      path: '/category',
      name: 'category',
      component: AnalysisCategory,
    },
  ],
})

export default router
