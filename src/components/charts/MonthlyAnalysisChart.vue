<template>
  <div class="p-4 mt-4 monthly-analysis-container">
    <div class="title">
      <h4 class="fw-bold">{{ currentMonth }}월 분석</h4>
      <div class="text-subtitle">
        이번 달에는 지난 달보다
        <span class="fw-bold">{{ Math.abs(gap).toLocaleString() }}원</span>
        {{ gap > 0 ? '더' : '덜' }} 쓰셨어요!
      </div>
    </div>
    <div class="analysis-container d-flex flex-col gap-4 w-100 flex-wrap">
      <ThreeMonthsAnalysisChart />
      <IncomeExpenseChart />
    </div>
  </div>
</template>

<script setup>
import IncomeExpenseChart from '@/components/charts/IncomeExpenseChart.vue'
import ThreeMonthsAnalysisChart from '@/components/charts/ThreeMonthsAnalysisChart.vue'
import { useThreeMonthsAnalysis } from '@/stores/analysisStore'
import { computed, onMounted } from 'vue'

const userId = '7471'
const store = useThreeMonthsAnalysis()

const now = new Date()
const currentMonth = now.getMonth() + 1
const currentKey = `${now.getFullYear()}-${String(currentMonth).padStart(2, '0')}`
const lastMonthDate = new Date(now.getFullYear(), currentMonth - 2, 1)
const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`

onMounted(() => {
  store.fetchThreeMonths(userId, now.getFullYear(), currentMonth)
})

// 이번 달과 지난 달 비교
const currentExpense = computed(() => store.analysis[currentKey]?.expenseTotal || 0)
const lastMonthExpense = computed(() => store.analysis[lastMonthKey]?.expenseTotal || 0)
const gap = computed(() => currentExpense.value - lastMonthExpense.value)
</script>

<style scoped>
/* 641px 이상이면 가로로 배치하고, 공간을 균등 분할 */
@media (min-width: 641px) {
  .chart-wrapper {
    flex: 1;
  }

  .monthly-analysis-container {
    background-color: white;
    border-radius: 20px;
  }
}

@media (max-width: 640px) {
  .monthly-analysis-container {
    max-width: 500px;
  }
}
</style>
