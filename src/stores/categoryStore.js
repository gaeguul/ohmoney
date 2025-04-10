import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref({
    income: [],
    expense: [],
  })

  const fetchCategories = async () => {
    if (categories.value.income.length || categories.value.expense.length) return

    const res = await axios.get('api/category')
    const data = res.data[0]

    categories.value.income = data.income
    categories.value.expense = data.expense
  }

  return {
    categories,
    fetchCategories,
  }
})
