<template>
  <div>
    <h1 class="fw-bold">{{ currentYearMonth }}</h1>
    <MonthlySpendingChart />
    <MonthlyAnalysisChart />
    <WeeklyAnalysisChart />
  </div>
</template>

<script setup>
import MonthlyAnalysisChart from '@/components/MonthlyAnalysisChart.vue'
import MonthlySpendingChart from '@/components/MonthlySpendingChart.vue'
import WeeklyAnalysisChart from '@/components/WeeklyAnalysisChart.vue'

const currentYearMonth = '2025년 4월'
</script>

<style scoped></style>
