<template>
  <div id="chart">
    <VueApexCharts type="bar" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const rawLabels = ['수입', '지출']
const seriesData = [45, 100]

const series = ref([
  {
    name: 'Income and Expenses',
    data: seriesData,
  },
])

const categoriesWithData = rawLabels.map((label, idx) => {
  return `${label} - ${seriesData[idx].toLocaleString()}원`
})

const chartOptions = ref({
  chart: {
    type: 'line',
    toolbar: { show: false },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 60,
      borderRadius: 10,
      distributed: true,
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
    axisBorder: { show: false }, // 축 선 제거
    axisTicks: { show: false }, // 축 눈금 제거
  },
  yaxis: {
    show: false, // 전체 축 제거
    labels: { show: false }, // 축 글자 제거
    axisBorder: { show: false }, // 축 선 제거
    axisTicks: { show: false }, // 축 눈금 제거
  },
  colors: ['#D9D9D9', '#D9D9D9'],
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
})
</script>

<style scoped></style>
