<template>
  <div class="container mt-4">
    <!-- 캘린더 헤더 -->
    <div class="d-flex justify-content-center align-items-center gap-4 mb-3 position-relative">
      <div class="d-flex justify-content-center align-items-center gap-4">
        <button class="btn" @click="prevMonth">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <h3>{{ month + 1 }}월</h3>
        <button class="btn" @click="nextMonth">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <button class="btn position-absolute" id="writeBtn" @click="handleClickWrite">
        가계부 작성하기
      </button>
    </div>

    <!-- 캘린더 테이블 -->
    <div class="d-flex gap-4 justify-content-center align-items-center mt-4">
      <CalendarTable :year="year" :month="month" />
      <DailyAccount />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CalendarTable from './CalendarTable.vue'
import DailyAccount from '@/components/calendar/DailyAccount.vue'

const router = useRouter()

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())

const handleClickWrite = () => {
  router.push('/accounts/new')
}

const prevMonth = () => {
  if (month.value === 0) {
    year.value--
    month.value = 11
  } else {
    month.value--
  }
}

const nextMonth = () => {
  if (month.value == 11) {
    year.value++
    month.value = 0
  } else {
    month.value++
  }
}
</script>

<style scoped>
button {
  color: var(--color-purple-400);
  border: 1px solid var(--color-purple-400);
}

button:hover {
  background-color: var(--color-purple-400);
  color: white;
}

#writeBtn {
  right: 0;
  background-color: var(--color-purple-400);
  color: white;
}

#writeBtn:hover {
  background-color: var(--color-purple-200);
}
</style>
