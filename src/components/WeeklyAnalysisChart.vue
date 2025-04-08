<template>
  <div>
    <div>주간별 분석</div>
    <div id="chart">
      <VueApexCharts type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const rawLabels = ['4월 1주', '4월 2주', '4월 3주', '4월 4주']
const seriesData = [0, 61262, 137350, 210644]

const series = ref([
  {
    name: 'Weekly Expenses',
    data: seriesData,
  },
])

const categoriesWithData = rawLabels.map((label, idx) => {
  return `${label} - ${seriesData[idx].toLocaleString()}원`
})

const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 10,
      barHeight: 40,
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
  yaxis: {
    labels: {
      style: {
        fontSize: '13px',
      },
    },
  },
  colors: ['#FDC144'],
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
})
</script>
