import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  const fetchCategories = async () => {
    if (categories.value.length) return
    const res = await axios.get('http://localhost:3000/category')
    const data = res.data[0]
    categories.value = [...data.income, ...data.expense]
  }

  return {
    categories,
    fetchCategories,
  }
})
