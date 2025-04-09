import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filterStore', () => {
  const type = ref('')
  const category = ref('')
  const startDate = ref('')
  const endDate = ref('')

  const resetFilters = () => {
    type.value = ''
    category.value = ''
    startDate.value = ''
    endDate.value = ''
  }

  return {
    type,
    category,
    startDate,
    endDate,
    resetFilters,
  }
})
