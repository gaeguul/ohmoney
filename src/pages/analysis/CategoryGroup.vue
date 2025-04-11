<template>
  <div class="w-100 row flex-wrap chartContainer" v-if="isReady">
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
import { onMounted, reactive, ref, computed } from 'vue'
import { watchEffect } from 'vue'

const props = defineProps({
  summary: { type: Array, required: true },
  category: { type: Object, required: true },
})

const chartWidth = 400
const chartHeight = 400
const loading = ref(false)

const isReady = computed(() => {
  return (
    props.category && Array.isArray(props.category.expense) && Array.isArray(props.category.income)
  )
})

const summaryIncome = ref([])

const summaryExpense = ref([])

const summaryIncomeChart = reactive({
  labels: [],
  data: [],
})

const summaryExpenseChart = reactive({
  labels: [],
  data: [],
})

const findCategoryName = (sum) => {
  const categoryId = Number(sum?.categoryId)
  if (isNaN(categoryId) || !isReady.value) return '알 수 없음'

  const list = categoryId < 20 ? props.category.expense : props.category.income

  if (!Array.isArray(list)) return '알 수 없음'

  // 문자열/숫자 타입 불일치 방지
  const found = list.find((category) => Number(category.categoryId) === categoryId)

  return found?.categoryName ?? `카테고리(${categoryId}) 없음`
}

watchEffect(() => {
  if (!isReady.value) return
  summaryIncome.value = props.summary
    .filter((item) => Number(item.categoryId) >= 20)
    .sort((a, b) => Number(b.sumAmount) - Number(a.sumAmount))

  summaryExpense.value = props.summary
    .filter((item) => Number(item.categoryId) < 20)
    .sort((a, b) => Number(b.sumAmount) - Number(a.sumAmount))
    .slice(0, 5)

  summaryIncomeChart.labels = summaryIncome.value.map((item) => findCategoryName(item))
  summaryIncomeChart.data = summaryIncome.value.map((item) => Number(item.sumAmount))

  summaryExpenseChart.labels = summaryExpense.value.map((item) => findCategoryName(item))
  summaryExpenseChart.data = summaryExpense.value.map((item) => Number(item.sumAmount))
})
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
