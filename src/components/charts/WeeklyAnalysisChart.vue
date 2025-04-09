<template>
  <div class="p-4 weekly-analysis-chart mt-4">
    <h4 class="fw-bold">주간별 분석</h4>
    <div id="chart">
      <VueApexCharts type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { useWeeklySpending } from '@/stores/analysisStore'
import { computed, onMounted, ref, watchEffect } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const userId = '7471'

const store = useWeeklySpending()

onMounted(() => {
  store.fetchWeeklySpending(userId, year, month)
})

// 월 텍스트 예: "4월"
const monthLabel = computed(() => `${month}월`)

// 주차 키 배열 정렬
const sortedWeeks = computed(() => {
  return Object.keys(store.weeklyExpense).sort((a, b) => {
    const getNum = (key) => parseInt(key.replace('week', ''), 10)
    return getNum(a) - getNum(b)
  })
})

// 시리즈 데이터와 주차 라벨 (예: "4월 1주")
const series = ref([])
const chartOptions = ref({})

watchEffect(() => {
  const data = sortedWeeks.value.map((weekKey) => store.weeklyExpense[weekKey] || 0)
  const labels = sortedWeeks.value.map((weekKey) => {
    const num = parseInt(weekKey.replace('week', ''), 10)
    return `${monthLabel.value} ${num}주`
  })

  const categoriesWithData = data.map((amount, idx) => [
    `${amount.toLocaleString()}원`,
    labels[idx],
  ])

  series.value = [
    {
      name: 'Weekly Expenses',
      data,
    },
  ]

  chartOptions.value = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 10,
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: categoriesWithData,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    colors: ['#FDC144'],
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
  }
})
</script>

<style>
.weekly-analysis-chart {
  max-width: 500px;
  background-color: white;
  border-radius: 20px;
}

.apexcharts-yaxis-texts-g text tspan:nth-child(1) {
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  font-weight: 600;
  fill: black;
}

.apexcharts-yaxis-texts-g text tspan:nth-child(2) {
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  fill: #bebebe;
}
</style>
