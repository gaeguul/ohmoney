<template>
  <div class="filter-content d-flex gap-4 px-3 pt-3">
    <!-- 기간 토글 -->
    <div class="dropdown" ref="dropdownRef">
      <button
        class="btn filter-btn btn-outline-secondary dropdown-toggle"
        type="button"
        @click="toggleDropdown"
      >
        {{ dateLabel }}
      </button>

      <!-- 날짜 선택 -->
      <div
        class="dropdown-menu p-3 shadow"
        v-if="isDropdownOpen"
        style="display: block; min-width: 250px"
      >
        <div class="mb-2">
          <label class="form-label">시작일</label>
          <input type="date" class="form-control" v-model="startDate" />
        </div>
        <div>
          <label class="form-label">종료일</label>
          <input type="date" class="form-control" v-model="endDate" />
        </div>
      </div>
    </div>

    <!-- 분류 토글 -->
    <div class="dropdown">
      <button
        class="btn filter-btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ typeLabel }}
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="setType('income')">수입</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click.prevent="setType('expense')">지출</a>
        </li>
      </ul>
    </div>

    <!-- 카테고리 토글 -->
    <div class="dropdown">
      <button
        class="filter-btn btn btn-outline-secondary dropdown-toggle"
        type="button"
        :disabled="!type"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ categoryLabel }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="ctg in historyCategories" :key="ctg.categoryId">
          <a class="dropdown-item" href="#" @click.prevent="setCategory(ctg.value)">
            {{ ctg.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 필터 상태
const type = ref('') //수입,지출 분류
const category = ref('') //카테고리

// 필터 값 세팅
const setType = (val) => {
  type.value = val
  category.value = ''
}
//카테고리 값 세팅
const setCategory = (val) => {
  category.value = val
}

// 분류 값 계산
const typeLabel = computed(() => {
  return type.value === 'income' ? '수입' : type.value === 'expense' ? '지출' : '분류'
})
const categoryLabel = computed(() => {
  if (!type.value) return '카테고리'
  const match = historyCategories.value.find((ctg) => ctg.value === category.value)
  return match ? match.label : '카테고리'
})

// 카테고리 목록
const categoryMap = {
  income: [],
  expense: [],
}
const historyCategories = computed(() => {
  return categoryMap[type.value] || []
})

// 카테고리 데이터 불러오기
onMounted(async () => {})

// 기간 필터
const isDropdownOpen = ref(false)
const startDate = ref('')
const endDate = ref('')
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const dateLabel = computed(() => {
  if (startDate.value && endDate.value) {
    return `${startDate.value} ~ ${endDate.value}`
  }
  return '기간'
})
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.filter-btn:hover,
.filter-btn:focus,
.filter-btn:active,
.filter-btn.show {
  background-color: white !important;
  color: gray !important;
}
</style>
