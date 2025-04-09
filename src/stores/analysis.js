import { defineStore } from 'pinia'
import { getMonthlySpending } from '../api/analysis'

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
