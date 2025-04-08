<template>
  <div>
    <div>
      <div>🔎 {{ currentMonth }}월 총 지출</div>
      <div>{{ totalExpenses }}원</div>
      <div>
        지난 달보다
        <span> -{{ compareToLastMonth }}원 </span>
      </div>
    </div>

    <div id="chart">
      <VueApexCharts type="line" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const currentMonth = 4
const totalExpenses = 746756
const compareToLastMonth = 59400

const categories = ['1일', '', '', '', '', '', '', '', '', '', '', '말일']

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
    categories: categories,
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

<style scoped></style>
