import { defineStore } from 'pinia'
import {
  getIncomeExpense,
  getMonthlySpending,
  getThreeMonthsAnalysis,
  getWeeklyAnalysis,
} from '../api/analysis'

export const useMonthlySpending = defineStore('spending', {
  state: () => ({
    thisMonthTotal: 0,
    lastMonthTotal: 0,
    dailyExpenses: {}, // { '01': 1234, '02': 4321, ... }
  }),

  actions: {
    async fetchSpending(userId, year, month) {
      const result = await getMonthlySpending(userId, year, month)
      this.thisMonthTotal = result.thisMonthTotal
      this.lastMonthTotal = result.lastMonthTotal
      this.dailyExpenses = result.dailyExpenses
    },
  },
})

export const useThreeMonthsAnalysis = defineStore('threeMonthsAnalysis', {
  state: () => ({
    analysis: {}, // { '2025-04': { expenseTotal: ... }, ... }
  }),

  actions: {
    async fetchThreeMonths(userId, year, month) {
      try {
        const result = await getThreeMonthsAnalysis(userId, year, month)
        this.analysis = result
      } catch (error) {
        console.error('Three months analysis fetch error:', error)
      }
    },
  },
})

export const useIncomeExpense = defineStore('incomeExpense', {
  state: () => ({
    incomeTotal: 0,
    expenseTotal: 0,
  }),

  actions: {
    async fetchIncomeExpense(userId, year, month) {
      const result = await getIncomeExpense(userId, year, month)
      this.incomeTotal = result.incomeTotal
      this.expenseTotal = result.expenseTotal
    },
  },
})

export const useWeeklySpending = defineStore('weeklySpending', {
  state: () => ({
    weeklyExpense: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWeeklySpending(userId, year, month) {
      this.loading = true
      this.error = null

      try {
        const result = await getWeeklyAnalysis(userId, year, month)
        this.weeklyExpense = { ...result }
      } catch (err) {
        console.error('주차별 지출 분석 실패:', err)
        this.error = err
        this.weeklyExpense = {}
      } finally {
        this.loading = false
      }
    },
  },
})
