<template>
  <div class="summary-container">
    <div class="summary-item">
      <span>이번 달 총 지출</span>
      <span>{{ expenseTotal.toLocaleString() }}원</span>
    </div>
    <div class="summary-item">
      <span>이번 달 총 수입</span>
      <span>{{ incomeTotal.toLocaleString() }}원</span>
    </div>
    <div class="summary-item">
      <span>월 순수익</span>
      <span>{{ netIncome.toLocaleString() }}원</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useIncomeExpense } from '@/stores/analysisStore'
import { useUserStore } from '@/stores/userStore'

const incomeExpenseStore = useIncomeExpense()
const userStore = useUserStore()

const props = defineProps({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  incomeExpenseStore.fetchIncomeExpense(userStore.id, props.year, props.month)
})

const incomeTotal = computed(() => incomeExpenseStore.incomeTotal)
const expenseTotal = computed(() => incomeExpenseStore.expenseTotal)
const netIncome = computed(() => incomeTotal.value - expenseTotal.value)
</script>

<style scoped>
.summary-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 10px;
  border-right: 1px solid #e0e0e0;
}

.summary-item:last-child {
  border-right: none;
}
</style>
