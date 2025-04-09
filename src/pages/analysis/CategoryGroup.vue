<template>
  <div class="content">
    <div class="card-group">
      <div v-for="sum in summaryIncome" :key="sum.id" class="card">
        <div class="card-body">
          <div>{{ findCategoryName(sum.categoryId) }}</div>
          <i>${{ sum.sumAmount }}</i>
        </div>
      </div>
    </div>
    <WeeklyAnalysisChart />
  </div>

  <div class="content">
    <div class="card-group">
      <div v-for="sum in summaryExpense" :key="sum.id" class="card">
        <div class="card-body">
          <div>{{ findCategoryName(sum.categoryId) }}</div>
          <i>${{ sum.sumAmount }}</i>
        </div>
      </div>
    </div>
    <WeeklyAnalysisChart />
  </div>
</template>
<script setup>
import WeeklyAnalysisChart from '@/components/charts/WeeklyAnalysisChart.vue'

const props = defineProps({
  summary: { type: Array, required: true },
  category: { type: Array, required: true },
})

const summaryIncome = props.summary.filter((item) => item.categoryId > 20)
const summaryExpense = props.summary.filter((item) => item.categoryId < 20)
const findCategoryName = (sum) => {
  console.log(props.category.expense)

  let name = ''
  if (sum < 20) {
    name = props.category.expense.find((category) => category.categoryId === sum).categoryName
  } else {
    name = props.category.income.find((category) => category.categoryId === sum).categoryName
  }

  // const name = props.category.expense.find((category) => category.categoryId === sum).categoryName
  return name
}
</script>
<style scoped>
.card-body > div {
  width: 60px;
  font-size: 20px;
  font-size: smaller;
  font-weight: lighter;
}
.card-body > i {
  width: 60px;
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
  gap: 8px;
}

.card {
  width: 100px;
  height: 70px;
  flex: 0 0 auto;
  border-radius: 10px;
  background-color: white;
  margin: 4px;
}
</style>
