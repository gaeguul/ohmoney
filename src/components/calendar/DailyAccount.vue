<template>
  <transition name="slide-fade">
    <div
      v-if="store.isOpen"
      class="w-25 bg-white border rounded-3 p-4 d-flex flex-column justify-content-between dailyWrapper"
    >
      <!-- 일일 가계 내역 -->
      <div class="d-flex flex-column gap-1">
        <h4>{{ formattedDate }}</h4>
        <ul class="w-100 h-100 mt-3 dailyAccountList">
          <li
            v-for="item in store.accountList"
            :key="item.useId"
            class="mb-2 list-unstyled accountItem"
            @click="handleClickItem(item)"
          >
            <div class="d-flex gap-2">
              <div :class="['iconWrapper', item.type === 'expense' ? 'expenseIcon' : 'incomeIcon']">
                <i
                  v-if="flatCategoryMap[`${item.type}-${item.category}`]"
                  :class="flatCategoryMap[`${item.type}-${item.category}`].icon"
                  class="categoryIcon"
                ></i>
              </div>
              <div>
                <strong>{{ item.vendor }}</strong>
                <br />
                <span class="text-muted small">
                  {{ item.amount.toLocaleString() }}원 |
                  {{ item.type === 'expense' ? '지출' : '수입' }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 일일 합산 금액 (순수익) -->
      <div class="mt-4 d-flex flex-column gap-2">
        <h6 class="fw-bold">오늘의 총 수입</h6>
        <div class="d-flex justify-content-end">
          <h3 class="sumAccount">{{ netIncome }}원</h3>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useCalendarStore } from '@/stores/useCalendarStore'
import { computed } from 'vue'
import categoryData from '@/assets/category.json'
import { useRouter } from 'vue-router'

const store = useCalendarStore()
const router = useRouter()

// 날짜 포맷팅
const formattedDate = computed(() => {
  if (!store.selectedDate) return ''
  const [year, month, day] = store.selectedDate.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  const week = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]})`
})

// 카테고리 매핑
const flatCategoryMap = computed(() => {
  const map = {}
  const raw = categoryData.category[0] // 배열 안에 expense/income 객체 하나

  raw.expense.forEach((item) => {
    map[`expense-${item.categoryId}`] = item
  })
  raw.income.forEach((item) => {
    map[`income-${item.categoryId}`] = item
  })

  return map
})

// item 클릭 시 상세 페이지로 이동
const handleClickItem = (item) => {
  router.push(`/accounts/${item.useId}`)
}

// 순수익 계산
const netIncome = computed(() => {
  const income = store.accountList
    .filter((item) => item.type === 'income')
    .reduce((acc, item) => acc + item.amount, 0)
  const expense = store.accountList
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0)

  return (income - expense).toLocaleString()
})
</script>

<style scoped>
.dailyWrapper {
  height: 540px;
}

.accountItem {
  padding: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
}

.accountItem:hover {
  background-color: var(--color-gray-100);
}

.iconWrapper {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.categoryIcon {
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  color: white;
}

.dailyAccountList {
  max-height: 360px;
  overflow-y: scroll;
}

.incomeIcon {
  background-color: var(--color-income);
}

.expenseIcon {
  background-color: var(--color-expense);
}

.sumAccount {
  color: var(--color-yellow);
  font-weight: bold;
}

/* 슬라이드 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
