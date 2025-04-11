<template>
  <transition name="slide-fade">
    <div
      v-if="calendarStore.isOpen"
      class="w-100 bg-white border rounded-3 p-4 d-flex flex-column justify-content-between dailyWrapper"
    >
      <!-- 일일 가계 내역 -->
      <div class="d-flex flex-column gap-1">
        <h4>{{ formattedDate }}</h4>
        <ul class="w-100 h-100 mt-3 dailyAccountList d-flex flex-column gap-3">
          <li
            v-for="item in calendarStore.accountList"
            :key="item.useId"
            class="mb-2 list-unstyled accountItem"
            @click="handleClickItem(item)"
          >
            <div class="d-flex gap-2">
              <div
                :class="[
                  'iconWrapper',
                  item.transactionType === 'expense' ? 'expenseIcon' : 'incomeIcon',
                ]"
              >
                <i
                  v-if="flatCategoryMap[`${item.transactionType}-${item.categoryId}`]"
                  :class="flatCategoryMap[`${item.transactionType}-${item.categoryId}`].icon"
                  class="categoryIcon"
                ></i>
              </div>
              <div>
                <strong>{{ item.vendor }}</strong>
                <br />
                <span class="meta-info">
                  <span class="amount">{{ item.amount.toLocaleString() }}원</span>
                  <span class="divider"> | </span>
                  <span
                    class="type"
                    :class="item.transactionType === 'expense' ? 'text-expense' : 'text-income'"
                  >
                    {{ item.transactionType === 'expense' ? '지출' : '수입' }}
                  </span>
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
import { useCategoryStore } from '@/stores/categoryStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const calendarStore = useCalendarStore()
const categoryStore = useCategoryStore()
const router = useRouter()

onMounted(() => {
  categoryStore.fetchCategories()
  categoryStore.isOpen = false
})

// 날짜 포맷팅
const formattedDate = computed(() => {
  if (!calendarStore.selectedDate) return ''
  const [year, month, day] = calendarStore.selectedDate.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  const week = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]})`
})

// 카테고리 매핑
const flatCategoryMap = computed(() => {
  const map = {}
  categoryStore.categories.expense.forEach((item) => {
    map[`expense-${item.categoryId}`] = {
      icon: item.categoryIcon,
      name: item.categoryName,
    }
  })
  categoryStore.categories.income.forEach((item) => {
    map[`income-${item.categoryId}`] = {
      icon: item.categoryIcon,
      name: item.categoryName,
    }
  })
  return map
})

// item 클릭 시 상세 페이지로 이동
const handleClickItem = (item) => {
  router.push(`/accounts/${item.id}`)
}

// 순수익 계산
const netIncome = computed(() => {
  const income = calendarStore.accountList
    .filter((item) => item.transactionType === 'income')
    .reduce((acc, item) => acc + item.amount, 0)
  const expense = calendarStore.accountList
    .filter((item) => item.transactionType === 'expense')
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
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.categoryIcon {
  font-size: 1em;
  color: white;
}

.dailyAccountList {
  max-height: 360px;
  overflow-y: auto;
}

.incomeIcon {
  background-color: var(--color-income);
}

.expenseIcon {
  background-color: var(--color-expense);
}

.text-expense {
  color: var(--color-expense);
}

.text-income {
  color: var(--color-income);
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

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  font-size: 0.9rem;
}

@media (max-width: 1074px) {
  .iconWrapper {
    font-size: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
  }

  .categoryIcon {
    font-size: 1em;
  }

  .meta-info {
    flex-direction: column;
    align-items: start;
    gap: 0;
    line-height: 1.2;
  }

  .divider {
    display: none;
  }
}

@media (max-width: 980px) {
  .iconWrapper {
    display: none;
  }

  .categoryIcon {
    display: none;
  }

  .meta-info span {
    white-space: nowrap;
    font-size: 0.8rem;
  }
}

@media (max-width: 940px) {
  .iconWrapper {
    display: inline;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  .categoryIcon {
    display: inline;
    font-size: 1em;
  }

  .meta-info {
    flex-direction: row;
    align-items: start;
    gap: 0.2rem;
    line-height: 1.2;
  }

  .divider {
    display: inline;
  }
}
</style>
