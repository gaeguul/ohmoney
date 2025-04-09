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
          <!-- 분류: 배지 표시 -->
          <td>
            <span :class="item.categoryId >= 19 ? 'badge bg-danger' : 'badge bg-primary'">
              {{ getCategoryLabel(item.categoryId) }}
            </span>
          </td>

          <!-- 날짜 -->
          <td>{{ item.createdAt }}</td>

          <!-- 카테고리명 -->
          <td>{{ getCategoryLabel(item.categoryId) }}</td>

          <!-- 결제수단 -->
          <td>{{ item.paymentMethod }}</td>

          <!-- 거래처 -->
          <td>{{ item.vendor }}</td>

          <!-- 금액: 색상 구분 -->
          <td>
            <span :class="item.type === '지출' ? 'text-danger' : 'text-primary'">
              {{ item.amount.toLocaleString() }} 원
            </span>
          </td>

          <!-- 메모 -->
          <td>{{ item.memo }}</td>

          <!-- 삭제 버튼 -->
          <td class="text-primary">
            <button class="btn text-secondary btn-sm px-0" @click.stop="deleteHistory(item.id)">
              삭제하기
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
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
import { useCategoryStore } from '@/stores/ categoryStore.js'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/api/axios'

const router = useRouter()

/** 소비내역 */
const accountsDetail = ref([])

// 소비내역 불러오기
onMounted(async () => {
  try {
    const res = await axios.get('/transactions')
    accountsDetail.value = res.data
  } catch (err) {
    console.error('내역 불러오기 실패:', err)
  }
})

// 소비내역 삭제하기
const deleteHistory = async (id) => {
  try {
    await axios.delete(`/${id}`)
    // accountsDetail.value = accountsDetail.value.filter((item) => item.id !== id)
  } catch (err) {
    console.error('삭제 실패:', err)
  }
}

// 소비내역 수정하기
const goToEditForm = (id) => {
  router.push({ name: 'accountDetails', params: { id: id } })
}

/** 카테고리 */
const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.fetchCategories()
})

const getCategoryLabel = (id) => {
  const category = categoryStore.categories.find((ctg) => ctg.categoryId === id)
  return category ? category.categoryName : id
}

/** 페이지네이션 */
const itemsPerPage = 7
const currentPage = ref(1)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return accountsDetail.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(accountsDetail.value.length / itemsPerPage))

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<style scoped>
.detail-history-row td {
  cursor: pointer;
}

.detail-history-row:hover td {
  background-color: #f4eeff;
}

.table-wrapper {
  height: 70vh;
}

.table-wrapper table {
  height: 100%;
  width: 100%;
}

.table-wrapper th,
.table-wrapper td {
  padding: 0.4rem;
  vertical-align: middle;
  background-color: #fafafa;
}
</style>
