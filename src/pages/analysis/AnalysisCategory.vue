<template>
  <div class="analysis-category container-fluid">
    <h2 class="fw-bold mb-5">카테고리 별 분석</h2>
    <div id="body">
      <div id="figure">
        <CategoryGroup v-if="summary.length > 0" :summary="summary" :category="category" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import CategoryGroup from './CategoryGroup.vue'
import axios from 'axios'

const userStore = useUserStore()
const id = userStore.id
const summary = ref([])
const category = ref({ expense: [], income: [] })

onMounted(async () => {
  try {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    const { data } = await axios.get('/api/summary', {
      params: { userId: id },
    })

    summary.value = data.filter((item) => {
      const [year, month] = item.duration.split('-')
      return parseInt(year) === currentYear && parseInt(month) === currentMonth
    })

    const categoryRes = await axios.get('/api/category')
    category.value = categoryRes.data[0]
  } catch (error) {
    console.error('데이터 불러오기 실패:', error)
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
#body {
  width: 100%;
  display: flex;
  align-content: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
