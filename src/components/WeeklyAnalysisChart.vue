<template>
  <div class="p-4 weekly-analysis-chart">
    <h4 class="fw-bold">주간별 분석</h4>
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
  return [`${seriesData[idx].toLocaleString()}원`, label]
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
})
</script>

<style>
.weekly-analysis-chart {
  max-width: 500px;
}

.apexcharts-yaxis-texts-g text tspan:nth-child(1) {
  font-size: 16px;
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
