<template>
  <div id="chart" class="p-4 mt-4 flex-grow-1 income-expense-chart">
    <VueApexCharts type="bar" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { useIncomeExpense } from '@/stores/analysisStore'
import { onMounted, ref, watchEffect } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const userId = '7471'

const store = useIncomeExpense()

onMounted(() => {
  store.fetchIncomeExpense(userId, year, month)
})
const series = ref([])
const chartOptions = ref({})

watchEffect(() => {
  const data = [store.incomeTotal, store.expenseTotal]
  const labels = [`${month}월 수입`, `${month}월 지출`]
  const categoriesWithData = data.map((amount, idx) => [
    `${amount.toLocaleString()}원`,
    labels[idx],
  ])

  series.value = [
    {
      name: 'Income and Expenses',
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
    },
    yaxis: {
      show: false,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    colors: ['#1bbf85', '#ef5a5a'],
    grid: { show: false },
    legend: { show: false },
  }
})
</script>

<style scoped>
.income-expense-chart {
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
