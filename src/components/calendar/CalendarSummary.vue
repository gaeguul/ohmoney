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
  flex-wrap: wrap;
  overflow: auto;
}

.summary-item {
  flex: 1 1 30%;
  min-width: 200px;
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

/* 태블릿 이하: 두 줄 (50%) */
@media (max-width: 992px) {
  .summary-item {
    flex: 1 1 45%;
  }

  /* 두 번째 divider만 가로줄로 변경 */
  .divider:nth-of-type(2) {
    width: 100%;
    height: 1px;
    background-color: var(--color-gray-300);
    margin: 0.5rem 0;
  }

  /* 첫 번째 divider는 여전히 세로선 유지 */
  .divider:nth-of-type(1) {
    width: 1px;
    height: auto;
    background-color: var(--color-gray-300);
    align-self: stretch;
    margin: 0;
  }
}

@media (min-width: 640px) and (max-width: 761px) {
  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--color-gray-300);
    margin: 0.5rem 0;
  }
}

/* 모바일 이하: 한 줄에 하나씩 */
@media (max-width: 576px) {
  .summary-item {
    flex: 1 1 100%;
    padding: 5px;
  }

  .divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-gray-300);
    margin: 0.5rem 0;
  }
}
</style>
