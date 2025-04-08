<template>
  <!-- 가계부 내역 헤더 -->
  <div class="header p-4">
    <h5 class="fw-bold">가계부 내역</h5>
    <button type="button" class="btn new-history-btn">가계부 작성</button>
  </div>

  <!-- 필터 -->
  <div class="d-flex gap-3 p-4">
    <!-- 분류 -->
    <select class="form-select w-auto" v-model="type" aria-label="분류 선택">
      <option value="" disabled selected hidden>분류</option>
      <option value="income">수입</option>
      <option value="expense">지출</option>
    </select>

    <!-- 카테고리 -->
    <select
      class="form-select w-auto"
      v-model="category"
      :disabled="!type"
      aria-label="카테고리 선택"
    >
      <option value="" disabled selected hidden>카테고리</option>
      <option v-for="ctg in historyCategories" :key="ctg.id" :value="ctg.value">
        {{ ctg.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const type = ref('')
const category = ref('')

const categoryMap = {
  income: [
    { id: '1', value: 'salary', label: '급여' },
    { id: '2', value: 'interest', label: '이자 수익' },
    { id: '3', value: 'etc', label: '기타 수입' },
  ],
  expense: [
    { id: '1', value: 'food', label: '식비' },
    { id: '2', value: 'transport', label: '교통비' },
    { id: '3', value: 'shopping', label: '쇼핑' },
    { id: '4', value: 'etc', label: '기타 지출' },
  ],
}

const historyCategories = computed(() => {
  return categoryMap[type.value] || []
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.new-history-btn {
  background-color: var(--color-purple-400);
  color: white;
}
.history-filter {
  color: red;
}
</style>
