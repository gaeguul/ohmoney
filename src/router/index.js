import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SigninView from '@/pages/user/SigninView.vue'
import SignupView from '@/pages/user/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomeVue.vue'

import MonthlyAnalysisChart from '@/components/charts/MonthlyAnalysisChart.vue'
import AccountCreatePage from '@/pages/account/AccountCreatePage.vue'
import AccountEditPage from '@/pages/account/AccountEditPage.vue'
import AccountListPage from '@/pages/account/AccountListPage.vue'
import AnalysisCategory from '@/pages/analysis/AnalysisCategory.vue'
import AnalysisDashboard from '@/pages/analysis/AnalysisDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/signin',
    },
    {
      path: '/main',
      name: 'defaultlayout',
      component: DefaultLayout,
      children: [
        {
          path: '',
          redirect: '/home', // ✅ 기본 자식 라우트는 /home으로 이동
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true },
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
          path: '/dashboard/month',
          name: 'dashboard',
          component: AnalysisDashboard,
          children: [
            {
              path: 'month', // /dashboard/month
              name: 'dashboard-month',
              component: MonthlyAnalysisChart,
            },
            {
              path: 'category', // /dashboard/category
              name: 'dashboard-category',
              component: AnalysisCategory,
            },
          ],
        },
        {
          path: '/dashboard/category',
          name: 'category',
          component: AnalysisCategory,
        },
      ],
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
  ],
})

export default router
