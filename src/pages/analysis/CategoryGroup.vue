<template>
  <div class="w-100 row flex-wrap chartContainer">
    <div class="col d-flex gap-5 flex-column flex-lg-row">
      <div class="content">
        <CategoryCircleChart
          class="foo-chart"
          :width="chartWidth"
          :height="chartHeight"
          :loading="loading"
          :labels="summaryIncomeChart.labels"
          :data="summaryIncomeChart.data"
          title="카테고리 별 수입"
        />
        <div v-if="summaryIncome.length > 0" class="list-group">
          <div v-for="sum in summaryIncome" :key="sum.id" class="list-item">
            <span>{{ findCategoryName(sum) }}</span>
            <span>{{ sum.sumAmount.toLocaleString() }}원</span>
          </div>
        </div>
      </div>

      <div class="content w-100">
        <CategoryCircleChart
          class="foo-chart"
          :width="chartWidth"
          :height="chartHeight"
          :loading="loading"
          :labels="summaryExpenseChart.labels"
          :data="summaryExpenseChart.data"
          title="카테고리 별 지출"
        />
        <div v-if="summaryExpense.length > 0" class="list-group">
          <div v-for="sum in summaryExpense" :key="sum.id" class="list-item">
            <span>{{ findCategoryName(sum) }}</span>
            <span>{{ sum.sumAmount.toLocaleString() }}원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CategoryCircleChart from '@/components/charts/CategoryCircleChart.vue'
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  summary: { type: Array, required: true },
  category: { type: Object, required: true },
})
const chartWidth = 400
const chartHeight = 400
const loading = ref(false)

onMounted(() => {
  summaryIncomeChart.labels = summaryIncome.map((item) => findCategoryName(item))
  summaryIncomeChart.data = summaryIncome.map((item) => Number(item.sumAmount))

  summaryExpenseChart.labels = summaryExpense.map((item) => findCategoryName(item))
  summaryExpenseChart.data = summaryExpense.map((item) => Number(item.sumAmount))
})

const summaryIncome = props.summary
  .filter((item) => item.categoryId >= 20)
  .sort((a, b) => {
    return Number(b.sumAmount) - Number(a.sumAmount)
  })
const summaryIncomeChart = reactive({
  labels: [],
  data: [],
})
const summaryExpense = props.summary
  .filter((item) => item.categoryId < 20)
  .sort((a, b) => {
    return Number(b.sumAmount) - Number(a.sumAmount)
  })
if (summaryExpense.length > 5) {
  summaryExpense.length = 5
}

const summaryExpenseChart = reactive({
  labels: [],
  data: [],
})

const findCategoryName = (sum) => {
  const categoryId = sum.categoryId
  if (categoryId === undefined) return '알 수 없음'

  let name = ''
  if (categoryId < 20) {
    name = props.category.expense.find((category) => category.categoryId === categoryId)
  } else {
    name = props.category.income.find((category) => category.categoryId === categoryId)
  }

  return name?.categoryName ?? '알 수 없음'
}
</script>
<style scoped>
.list-group {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.list-item:last-child {
  border-bottom: none;
}

.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 40px;
  padding: 0 30px;
}

@media (max-width: 1200px) {
  .chartContainer {
    gap: 10px;
  }
}

@media (max-width: 1060px) {
  .col {
    flex-direction: column !important;
    gap: 20px;
  }
  .content {
    gap: 20px;
  }
}
</style>
