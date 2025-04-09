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
            <span :class="item.type === '지출' ? 'badge bg-danger' : 'badge bg-primary'">
              {{ item.type }}
            </span>
          </td>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.payment }}</td>
          <td>{{ item.vendor }}</td>
          <td>
            <span :class="item.type === '지출' ? 'text-danger' : 'text-primary'">
              {{ item.amount.toLocaleString() }} 원
            </span>
          </td>
          <td>{{ item.memo }}</td>
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
        &#8592;
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
        &#8594;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/** 소비내역 */
const accountsDetail = ref([])
//소비내역 불러오기
onMounted(async () => {})
//소비내역 삭제하기
const deleteHistory = async (id) => {}
//소비내역 수정하기
const goToEditForm = (id) => {
  router.push({ name: 'accountDetails', params: { id: id } })
}

/** 페이지네이션 */
const itemsPerPage = 7 //한 페이지당 보여줄 요소 개수
const currentPage = ref(1)

// 페이지네이션된 데이터 계산
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return accountsDetail.value.slice(start, end)
})

// 전체 페이지 수 계산
const totalPages = computed(() => Math.ceil(accountsDetail.value.length / itemsPerPage))

// 페이지 이동 함수
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

.table-wrapper th,
.table-wrapper td {
  padding: 0.4rem;
  vertical-align: middle;
  background-color: #fafafa;
}
</style>
