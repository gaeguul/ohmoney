<template>
  <div class="summary-container border">
    <div class="summary-item">
      <span class="fw-bold text-start text-secondary mx-2">이번 달 총합</span>
      <span class="fs-4">{{ netIncome.toLocaleString() }}원</span>
    </div>
    <div class="divider"></div>
    <div class="summary-item">
      <span class="fw-bold text-start text-secondary mx-2">이번 달 총 지출</span>
      <span class="fs-4">{{ expenseTotal.toLocaleString() }}원</span>
    </div>
    <div class="divider"></div>
    <div class="summary-item">
      <span class="fw-bold text-start text-secondary mx-2">이번 달 총 수입</span>
      <span class="fs-4">{{ incomeTotal.toLocaleString() }}원</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
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
  incomeExpenseStore.fetchIncomeExpense(userStore.id, props.year, props.month + 1)
})

watch(
  () => [props.year, props.month],
  ([newYear, newMonth]) => {
    incomeExpenseStore.fetchIncomeExpense(userStore.id, newYear, newMonth + 1)
  },
)

const incomeTotal = computed(() => incomeExpenseStore.incomeTotal)
const expenseTotal = computed(() => incomeExpenseStore.expenseTotal)
const netIncome = computed(() => incomeTotal.value - expenseTotal.value)
</script>

<style scoped>
.summary-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  gap: 0;
  position: relative;
}

.summary-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 10px;
  text-align: center;
}

.divider {
  width: 1px;
  background-color: var(--color-gray-300);
  align-self: stretch;
}
</style>
