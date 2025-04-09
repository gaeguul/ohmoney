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
          <td>{{ item.createdAt }}</td>
          <td>{{ getCategoryLabel(item.categoryId) }}</td>
          <td>{{ item.paymentMethod }}</td>
          <td>{{ item.vendor }}</td>
          <td>
            <span
              :style="{
                color: isExpense(item.categoryId) ? 'var(--color-expense)' : 'var(--color-income)',
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

        <tr
          v-for="n in emptyRowCount"
          :key="'empty-' + n"
          class="detail-history-row no-hover"
          style="height: 50px"
        >
          <td colspan="8"></td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center p-3 gap-2">
      <button class="page-btn btn btn-outline-secondary btn-sm" @click="goToPage(currentPage - 1)">
        ←
      </button>
      <button
        v-for="n in totalPages"
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
      <button class="page-btn btn btn-outline-secondary btn-sm" @click="goToPage(currentPage + 1)">
        →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore.js'
import { useFilterStore } from '@/stores/filterStore.js'
import axios from 'axios'

const BASEURL = 'api/transactions'
const router = useRouter()
const categoryStore = useCategoryStore()
const filterStore = useFilterStore()

const allHistories = ref([])

onMounted(async () => {
  filterStore.resetFilters()
  try {
    const res = await axios.get(BASEURL)
    allHistories.value = res.data
  } catch (err) {
    console.error('내역 불러오기 실패:', err)
  }
  categoryStore.fetchCategories()
})

const deleteHistory = async (id) => {
  try {
    await axios.delete(`${BASEURL}/${id}`)
    allHistories.value = allHistories.value.filter((item) => item.id !== id)
  } catch (err) {
    console.error('삭제 실패:', err)
  }
}

const goToEditForm = (id) => {
  router.push({ name: 'accountDetails', params: { id } })
}

const getCategoryLabel = (id) => {
  const income = categoryStore.categories.income?.find((ctg) => ctg.categoryId === id)
  const expense = categoryStore.categories.expense?.find((ctg) => ctg.categoryId === id)
  return income?.categoryName || expense?.categoryName || id
}

const isExpense = (id) => {
  return categoryStore.categories.expense?.some((ctg) => ctg.categoryId === id)
}

const filteredHistories = computed(() => {
  const { startDate, endDate, type, category } = filterStore
  const isAllEmpty = !startDate && !endDate && !type && !category

  if (isAllEmpty) {
    return allHistories.value
  }

  return allHistories.value.filter((item) => {
    const matchDate =
      (!startDate || item.createdAt >= startDate) && (!endDate || item.createdAt <= endDate)
    const matchType = !type || isExpense(item.categoryId) === (type === 'expense')
    const matchCategory = !category || item.categoryId === category

    return matchDate && matchType && matchCategory
  })
})

const itemsPerPage = 7
const currentPage = ref(1)

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
.detail-history-row.no-hover td {
  cursor: default;
  background-color: inherit !important;
}
.table-wrapper {
  height: 70vh;
}
.table-wrapper table {
  height: 100%;
  width: 100%;
}
.table-wrapper td {
  height: 50px;
}
.table-wrapper th,
.table-wrapper td {
  padding: 0.4rem;
  vertical-align: middle;
  background-color: #fafafa;
}
.delete-btn {
  border: none;
}
.delete-btn:hover,
.delete-btn:active {
  color: var(--color-purple-400);
}
</style>
