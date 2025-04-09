<template>
  <div class="monthly-spending-chart mt-4 p-4">
    <div>
      <h5 class="fw-bold">🔎 {{ currentMonth }}월 총 지출</h5>
      <h4 class="fw-bold">{{ totalExpenses }}원</h4>
      <div>
        지난 달보다
        <span class="text-primary"> {{ compareToLastMonth }}원 </span>
      </div>
    </div>

    <div id="chart">
      <VueApexCharts type="line" :options="chartOptions" :series="series" />
      <div class="d-flex justify-content-between text-subtitle">
        <div>1일</div>
        <div>말일</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMonthlySpending } from '@/stores/analysis'
import { computed, onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const userId = '7471'
const currentMonth = 4
const year = 2025

const store = useMonthlySpending()

onMounted(() => {
  store.fetchSpending(userId, year, currentMonth)
})

// 총 지출
const totalExpenses = computed(() => store.thisMonthTotal.toLocaleString())

// 전달과 비교
const compareToLastMonth = computed(() => {
  const diff = store.thisMonthTotal - store.lastMonthTotal
  const abs = Math.abs(diff)
  const sign = diff >= 0 ? '+' : '-'
  return `${sign}${abs.toLocaleString()}`
})

const series = computed(() => {
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
  const data = days.map((day) => store.dailyExpenses[day] || 0)
  return [
    {
      name: 'Daily Expenses',
      data,
    },
  ]
})

const chartOptions = ref({
  chart: {
    type: 'line',
    toolbar: { show: false },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 8,
    },
  },
  xaxis: {
    labels: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex }) {
      const day = dataPointIndex + 1 // 0-based index → 1일부터 시작
      const dateLabel = `${currentMonth}월 ${day}일`
      const value = series[seriesIndex][dataPointIndex].toLocaleString() + '원'

      return `
            <div class="custom-tooltip">
              <div>${dateLabel}</div>
              <div>${value}</div>
            </div>
          `
    },
  },
  colors: ['#EB3731'],
  grid: {
    borderColor: '#f1f1f1',
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
})
</script>

<style scoped>
.monthly-spending-chart {
  max-width: 500px;
}

@media (min-width: 641px) {
  .monthly-spending-chart {
    background-color: white;
  }
}
</style>
