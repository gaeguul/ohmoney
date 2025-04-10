<template>
  <div class="table-wrapper p-3">
    <table class="table table-borderless text-center align-middle p-5">
      <thead>
        <tr>
          <th>분류</th>
          <th>날짜</th>
          <th>카테고리</th>
          <th>결제수단</th>
          <th>거래처</th>
          <th>금액</th>
          <th>메모</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <!-- 거래 내역이 있을 경우 -->
        <template v-if="paginatedData.length">
          <tr
            v-for="item in paginatedData"
            :key="item.id"
            class="detail-history-row"
            @click="goToEditForm(item.id)"
          >
            <td>
              <span
                class="badge"
                :style="{
                  backgroundColor: isExpense(item.categoryId)
                    ? 'var(--color-expense)'
                    : 'var(--color-income)',
                  color: '#fff',
                }"
              >
                {{ isExpense(item.categoryId) ? '지출' : '수입' }}
              </span>
            </td>
            <td>{{ formatDate(item.createdAt) }}</td>
            <td>{{ getCategoryLabel(item.categoryId) }}</td>
            <td>{{ item.paymentMethod }}</td>
            <td>{{ item.vendor }}</td>
            <td>
              <span
                :style="{
                  color: isExpense(item.categoryId)
                    ? 'var(--color-expense)'
                    : 'var(--color-income)',
                }"
              >
                {{ item.amount.toLocaleString() }} 원
              </span>
            </td>
            <td>{{ item.memo }}</td>
            <td class="text-primary">
              <button class="btn delete-btn btn-sm" @click.stop="deleteHistory(item.id)">
                삭제하기
              </button>
            </td>
          </tr>

          <!-- 남은 칸을 빈 줄로 채우기 -->
          <tr
            v-for="n in emptyRowCount"
            :key="'empty-' + n"
            class="detail-history-row no-hover"
            style="height: 50px"
          >
            <td colspan="8"></td>
          </tr>
        </template>

        <!-- 거래 내역이 없을 경우 -->
        <tr v-else>
          <td colspan="8" class="text-center text-muted" style="height: 200px">
            거래내역이 존재하지 않습니다.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 영역 -->
    <div class="d-flex justify-content-center p-3 gap-2">
      <button
        class="page-btn btn btn-outline-secondary btn-sm"
        :disabled="startPageInGroup === 1"
        @click="goToPage(startPageInGroup - 1)"
      >
        ←
      </button>

      <button
        v-for="n in pageNumbersInGroup"
        :key="n"
        class="page-btn btn btn-sm"
        :class="[
          'page-btn btn btn-sm',
          n === currentPage ? 'text-white border-0' : 'btn-outline-secondary',
        ]"
        :style="n === currentPage ? { backgroundColor: '#8540f5' } : {}"
        @click="goToPage(n)"
      >
        {{ n }}
      </button>

      <button
        class="page-btn btn btn-outline-secondary btn-sm"
        :disabled="endPageInGroup === totalPages"
        @click="goToPage(endPageInGroup + 1)"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/categoryStore.js'
import { useFilterStore } from '@/stores/filterStore.js'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const BASEURL = 'api/transactions'
const router = useRouter()
const categoryStore = useCategoryStore()
const filterStore = useFilterStore()
const userStore = useUserStore()

const allHistories = ref([]) // 전체 거래 내역

// 초기 데이터 로딩
onMounted(async () => {
  filterStore.resetFilters() // 페이지 진입 시 필터 초기화
  try {
    const res = await axios.get(`${BASEURL}?userId=${userStore.id}`)
    allHistories.value = res.data
  } catch (err) {
    console.error('내역 불러오기 실패:', err)
  }

  categoryStore.fetchCategories()
})

// 내역 삭제
const deleteHistory = async (id) => {
  try {
    await axios.delete(`${BASEURL}/${id}`)
    allHistories.value = allHistories.value.filter((item) => item.id !== id)
  } catch (err) {
    console.error('삭제 실패:', err)
  }
}

// 날짜 포맷 변경 (2024-04-10 (수) 형식)
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const daysKor = ['일', '월', '화', '수', '목', '금', '토']
  return `${year}-${month}-${day} (${daysKor[date.getDay()]})`
}

// 수정 페이지로 이동
const goToEditForm = (id) => {
  router.push({ name: 'accountDetails', params: { id } })
}

// 카테고리 이름 조회
const getCategoryLabel = (id) => {
  const income = categoryStore.categories.income?.find((ctg) => ctg.categoryId === id)
  const expense = categoryStore.categories.expense?.find((ctg) => ctg.categoryId === id)
  return income?.categoryName || expense?.categoryName || id
}

// 해당 카테고리가 지출인지 여부
const isExpense = (id) => {
  return categoryStore.categories.expense?.some((ctg) => ctg.categoryId === id)
}

// 필터 조건에 맞게 거래 내역 필터링
const filteredHistories = computed(() => {
  const { startDate, endDate, type, category } = filterStore
  const isAllEmpty = !startDate && !endDate && !type && !category

  let result = allHistories.value.slice()

  if (!isAllEmpty) {
    result = result.filter((item) => {
      const matchDate =
        (!startDate || item.createdAt >= startDate) && (!endDate || item.createdAt <= endDate)
      const matchType = !type || isExpense(item.categoryId) === (type === 'expense')
      const matchCategory = !category || item.categoryId === category
      return matchDate && matchType && matchCategory
    })
  }

  // 날짜 기준 오름차순 정렬
  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return result
})

// 페이지네이션 관련 계산
const itemsPerPage = 10
const currentPage = ref(1)
const pageGroupSize = 10

const currentPageGroup = computed(() => Math.floor((currentPage.value - 1) / pageGroupSize))
const startPageInGroup = computed(() => currentPageGroup.value * pageGroupSize + 1)
const endPageInGroup = computed(() =>
  Math.min(startPageInGroup.value + pageGroupSize - 1, totalPages.value),
)

const pageNumbersInGroup = computed(() => {
  const pages = []
  for (let i = startPageInGroup.value; i <= endPageInGroup.value; i++) {
    pages.push(i)
  }
  return pages
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredHistories.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredHistories.value.length / itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 남은 칸을 채우기 위한 빈 줄 수
const emptyRowCount = computed(() => {
  const diff = itemsPerPage - paginatedData.value.length
  return diff > 0 ? diff : 0
})
</script>

<style scoped>
.detail-history-row td {
  cursor: pointer;
}
.detail-history-row:not(.no-hover):hover td {
  background-color: #f4eeff;
}
.table-wrapper table {
  height: 60vh;
  overflow-x: auto; /* 👉 가로 스크롤 가능하게 */
  scrollbar-width: none;
  min-width: 768px;
  width: 100%;
}
.table-wrapper td {
  height: 50px;
}
.table-wrapper th,
.table-wrapper td {
  padding: 0.4rem;
  vertical-align: middle;
  background-color: var(--color-gray-100);
}
.delete-btn {
  border: none;
}
.delete-btn:hover,
.delete-btn:active {
  color: var(--color-purple-400);
}
@media (max-width: 640px) {
  .table-wrapper th,
  .table-wrapper td {
    background-color: white;
  }
}
</style>
