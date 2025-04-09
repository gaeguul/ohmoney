<template>
  <div>
    <h1 class="fw-bold">{{ currentYearMonth }}</h1>
    <div class="d-flex flex-wrap gap-0 gap-md-4">
      <MonthlySpendingChart />
      <MonthlyAnalysisChart />
    </div>

    <WeeklyAnalysisChart />
  </div>
</template>

<script setup>
import MonthlyAnalysisChart from '@/components/charts/MonthlyAnalysisChart.vue'
import MonthlySpendingChart from '@/components/charts/MonthlySpendingChart.vue'
import WeeklyAnalysisChart from '@/components/charts/WeeklyAnalysisChart.vue'

const currentYearMonth = '2025년 4월'
</script>

<style scoped></style>
