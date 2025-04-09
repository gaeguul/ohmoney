<template>
  <div class="content">
    <div class="card-group">
      <div v-for="sum in summaryIncome" :key="sum.id" class="card">
        <div class="card-body">
          <div>{{ findCategoryName(sum) }}</div>
          <i>${{ sum.sumAmount }}</i>
        </div>
      </div>
    </div>
    <CategoryCircleChart
      class="foo-chart"
      :width="chartWidth"
      :height="chartHeight"
      :loading="loading"
      :labels="summaryIncomeChart.labels"
      :data="summaryIncomeChart.data"
      title="카테고리 별 수입"
    />
  </div>

  <div class="content">
    <div class="card-group">
      <div v-for="sum in summaryExpense" :key="sum.id" class="card">
        <div class="card-body">
          <div>{{ findCategoryName(sum) }}</div>
          <i>${{ sum.sumAmount }}</i>
        </div>
      </div>
    </div>
    <CategoryCircleChart
      class="foo-chart"
      :width="chartWidth"
      :height="chartHeight"
      :loading="loading"
      :labels="summaryExpenseChart.labels"
      :data="summaryExpenseChart.data"
      title="카테고리 별 지출"
    />
  </div>
</template>
<script setup>
import CategoryCircleChart from '@/components/charts/CategoryCircleChart.vue'
import { onMounted, reactive } from 'vue'

const props = defineProps({
  summary: { type: Array, required: true },
  category: { type: Array, required: true },
})

onMounted(() => {
  summaryIncomeChart.labels = summaryIncome.map((item) => findCategoryName(item))
  summaryIncomeChart.data = summaryIncome.map((item) => item.sumAmount)

  summaryExpenseChart.labels = summaryExpense.map((item) => findCategoryName(item))
  summaryExpenseChart.data = summaryExpense.map((item) => item.sumAmount)
})

const summaryIncome = props.summary.filter((item) => item.categoryId > 20)
const summaryIncomeChart = reactive({
  labels: [],
  data: [],
})
const summaryExpense = props.summary.filter((item) => item.categoryId < 20)

const summaryExpenseChart = reactive({
  labels: [],
  data: [],
})

const findCategoryName = (sum) => {
  // console.log(summaryExpense.sort((a, b) =>{ b.sumAmount - a.sumAmount}))

  let name = ''
  const categoryId = sum.categoryId

  if (categoryId === undefined) {
    return
  }
  if (categoryId < 20) {
    name = props.category.expense.find((category) => category.categoryId === categoryId)
  } else {
    name = props.category.income.find((category) => category.categoryId === categoryId)
  }

  // console.log(summaryExpenseChart)
  // const name = props.category.expense.find((category) => category.categoryId === sum).categoryName
  return name.categoryName
}
</script>
<style scoped>
.card-body > div {
  width: 80px;
  font-size: 20px;
  font-size: smaller;
  font-weight: lighter;
}
.card-body > i {
  width: 80px;
  color: #7c4ce8;
  font-weight: bold;
  font-style: normal;
}

.content {
  display: flex;
  flex-direction: column; /* 카드 그룹과 차트를 세로로 배치 */
  gap: 10px;
  margin-bottom: 20px;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
  margin-top: 100px;
  gap: 8px;
}

.card {
  width: 130px;
  height: 100px;
  flex: 0 0 auto;
  border-radius: 10%;
  background-color: white;
  margin: 4px;
}
</style>
