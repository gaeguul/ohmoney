<template>
  <div class="container mt-4 d-flex flex-column gap-4">
    <CalendarSummary :year="year" :month="month" />
    <div>
      <!-- 캘린더 헤더 -->
      <CalendarHeader v-model:year="year" v-model:month="month" />

      <!-- 캘린더 테이블 -->
      <div class="calendar-layout" :class="{ 'is-mobile': isMobile }">
        <div
          class="calendar-table-wrapper"
          :class="{ 'full-width': !calendarStore.isOpen && !isMobile }"
        >
          <CalendarTable :year="year" :month="month" />
        </div>

        <!-- 일일 계좌 내역 -->
        <div v-if="calendarStore.isOpen" class="daily-account-wrapper">
          <DailyAccount />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import CalendarHeader from '../components/calendar/CalendarHeader.vue'
import CalendarTable from '../components/calendar/CalendarTable.vue'
import DailyAccount from '../components/calendar/DailyAccount.vue'
import CalendarSummary from '@/components/calendar/CalendarSummary.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'

const calendarStore = useCalendarStore()
const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())

// 반응형: 모바일 여부 감지
const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 640
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)

  // 상태 초기화
  calendarStore.resetState()
  // 가계 목록 로딩
  calendarStore.fetchTransactions()
})

// CalendarHeader의 변경에 따라 year과 month가 업데이트
// 현재 달의 경우 오늘 날짜, 아닐 경우 1일로 설정
watch([year, month], ([newYear, newMonth]) => {
  const today = new Date()

  const isCurrentMonth = newYear === today.getFullYear() && newMonth === today.getMonth()

  const selectedDate = isCurrentMonth ? today : new Date(newYear, newMonth, 1)

  calendarStore.toggleDate(selectedDate, { open: false })
})
</script>

<style scoped>
.calendar-layout {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 1rem;
}

.calendar-table-wrapper {
  flex: 7;
  min-width: 0;
  transition: all 0.3s ease;
}

.calendar-table-wrapper.full-width {
  flex: 1 1 100%;
  width: 100%;
}

.daily-account-wrapper {
  flex: 3;
  min-width: 0;
}

/* 640px 이하일 때: 세로 레이아웃 */
@media (max-width: 940px) {
  .calendar-layout {
    flex-direction: column;
  }

  .calendar-table-wrapper,
  .daily-account-wrapper {
    width: 100%;
  }
}
</style>
