<template>
  <div class="p-4 mt-4 monthly-analysis-container">
    <div class="title">
      <h4 class="fw-bold">{{ currentMonth }}월 분석</h4>
      <div class="text-subtitle">
        이번 달에는 지난 달보다 {{ compareToLastMonth }}원 덜 쓰셨어요!
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

const currentMonth = 4
const compareToLastMonth = '59,400'
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
