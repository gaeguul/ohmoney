<template>
  <!-- 캘린더 테이블 -->
  <div class="w-100 table-responsive calendar-wrapper">
    <table class="w-100 table table-bordered">
      <thead>
        <tr>
          <th v-for="(day, index) in weekDays" :key="index" style="width: 14.28%">
            {{ day }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(week, wIndex) in calendar" :key="wIndex">
          <td
            v-for="(date, dIndex) in week"
            :key="dIndex"
            :class="[{ 'selected-date': formatDate(date) === calendarStore.selectedDate }]"
            style="width: 14.28%"
            @click="calendarStore.toggleDate(date, { open: true })"
          >
            <div class="d-flex flex-column h-100 w-100 justify-content-between">
              <p
                :class="{
                  'text-primary': date?.getDay() === 6,
                  'text-danger': date?.getDay() === 0,
                  'text-muted': !isCurrentMonth(date),
                  'today-circle': isToday(date),
                }"
              >
                {{ date?.getDate() || '' }}
              </p>

              <div class="d-flex flex-column align-items-end">
                <!-- 수입/지출 합계 숫자 -->
                <p class="textIncome small mb-0" v-if="dailySummaryMap[formatDate(date)]?.income">
                  +{{ dailySummaryMap[formatDate(date)].income.toLocaleString() }}
                </p>
                <p class="textExpense small mb-0" v-if="dailySummaryMap[formatDate(date)]?.expense">
                  -{{ dailySummaryMap[formatDate(date)].expense.toLocaleString() }}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCalendarStore } from '@/stores/useCalendarStore'
import { computed } from 'vue'

const calendarStore = useCalendarStore()

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

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const today = new Date()

// 캘린더 생성 매서드
const calendar = computed(() => {
  const firstDay = new Date(props.year, props.month, 1)
  const lastDay = new Date(props.year, props.month + 1, 0)

  const startDate = new Date(firstDay)
  startDate.setDate(firstDay.getDate() - firstDay.getDay())

  const endDate = new Date(lastDay)
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()))

  const dateMatrix = []
  let current = new Date(startDate)

  while (current <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    dateMatrix.push(week)
  }

  return dateMatrix
})

const isToday = (date) => {
  return (
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// 일일 income/expense 합계 저장
const dailySummaryMap = computed(() => {
  const summary = {}
  calendarStore.transactionList.forEach((item) => {
    const date = item.date
    if (!summary[date]) {
      summary[date] = { income: 0, expense: 0 }
    }
    summary[date][item.transactionType] += item.amount
  })

  return summary
})

// 날짜 포맷팅
function formatDate(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// 현재 달의 날짜인지 확인
const isCurrentMonth = (date) => {
  return date?.getMonth() === props.month
}
</script>

<style scoped>
table {
  min-width: 313px;
  width: 100%;
}

td {
  height: 100px;
  vertical-align: middle;
}

thead th {
  background-color: var(--color-purple-200);
  color: white;
}

tbody td:hover {
  background-color: var(--color-gray-100);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.calendar-wrapper {
  border-radius: 12px;
  overflow: hidden;
  overflow-x: auto;
}

.selected-date {
  width: 14.28%;
  background-color: var(--color-gray-100);
}

.today-circle {
  background-color: var(--color-purple-400);
  color: white !important;
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  text-align: center;
  line-height: 1.6rem;
  font-weight: bold;
}

.textIncome {
  color: var(--color-income);
}

.textExpense {
  color: var(--color-expense);
}

.text-muted {
  opacity: 0.4;
}

@media (max-width: 866px) {
  .textIncome,
  .textExpense {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .textIncome,
  .textExpense {
    font-size: 0.7rem;
    white-space: nowrap;
  }

  td {
    padding: 0.25rem;
  }
}

@media (max-width: 478px) {
  .textIncome,
  .textExpense {
    font-size: 0.6rem;
  }
}
</style>
