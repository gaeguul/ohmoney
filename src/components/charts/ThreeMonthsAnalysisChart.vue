<template>
  <div id="chart" class="mt-4 flex-grow-1 three-months-analysis-chart">
    <VueApexCharts type="bar" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { useThreeMonthsAnalysis } from '@/stores/analysisStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, watchEffect } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const userStore = useUserStore()
const userId = userStore.id
const store = useThreeMonthsAnalysis()

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1

onMounted(() => {
  store.fetchThreeMonths(userId, year, month)
})

// 최근 3개월 key 구하기
const getLastThreeMonthsKeys = () => {
  const keys = []
  for (let i = 2; i >= 0; i--) {
    const date = new Date(year, month - 1 - i, 1)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    keys.push(`${y}-${m}`)
  }
  return keys
}

const series = ref([])
const chartOptions = ref({})

watchEffect(() => {
  const keys = getLastThreeMonthsKeys()
  const data = keys.map((key) => {
    const entry = store.analysis[key]
    return entry ? entry.expenseTotal : 0
  })

  const categoriesWithData = keys.map((key, idx) => {
    const m = Number(key.split('-')[1])
    const value = data[idx] || 0
    return [`${value.toLocaleString()}원`, `${m}월 지출`]
  })

  series.value = [
    {
      name: 'Monthly Expense',
      data,
    },
  ]

  chartOptions.value = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 60,
        borderRadius: 10,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    xaxis: {
      categories: categoriesWithData,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { rotate: 0 },
    },
    yaxis: {
      show: false,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    colors: ['#D9D9D9', '#D9D9D9', '#7999FE'],
    grid: { show: false },
    legend: { show: false },
  }
})
</script>

<style>
.three-months-analysis-chart {
  max-width: 500px;
}

.monthly-spending-chart {
  background-color: #f9f9f9;
  border-radius: 20px;
  max-width: 500px;
}

.apexcharts-xaxis-texts-g text tspan:nth-child(1) {
  font-family: 'Pretendard-Regular';
  font-size: 18px;
  fill: black;
  font-weight: 600;
}

.apexcharts-xaxis-texts-g text tspan:nth-child(2) {
  font-size: 14px;
  font-family: 'Pretendard-Regular';

  fill: #bebebe;
}
</style>
