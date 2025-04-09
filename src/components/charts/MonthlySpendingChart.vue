<template>
  <div class="monthly-spending-chart mt-4 p-4">
    <div>
      <h5 class="fw-bold">🔎 {{ currentMonth }}월 총 지출</h5>
      <h4 class="fw-bold">{{ totalExpenses }}원</h4>
      <div>
        지난 달보다
        <span class="text-primary"> -{{ compareToLastMonth }}원 </span>
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
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const currentMonth = 4
const totalExpenses = '746,756'
const compareToLastMonth = '59,400'

const series = ref([
  {
    name: 'Daily Expenses',
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
])

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
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const label = w.globals.labels[dataPointIndex]
      const value = series[seriesIndex][dataPointIndex].toLocaleString() + '원'

      return `
            <div class="custom-tooltip">
              <div>${label}</div>
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
