import { defineStore } from 'pinia'
import { getMonthlySpending, getWeeklyAnalysis } from '../api/analysis'

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
