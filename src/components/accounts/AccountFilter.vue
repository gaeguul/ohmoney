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
      <!-- 기간 드롭다운 -->
      <div
        class="dropdown-menu p-3 shadow"
        v-if="isDropdownOpen"
        style="display: block; min-width: 250px"
      >
        <button
          class="btn btn-sm position-absolute"
          :style="{ top: '8px', right: '8px', color: 'var(--color-gray-500)' }"
          @click.stop="clearDateFilter"
        >
          초기화
        </button>
        <div class="mb-2">
          <label class="form-label">시작일</label>
          <input
            type="date"
            class="form-control"
            v-model="filterStore.startDate"
            :max="filterStore.endDate"
          />
        </div>
        <div>
          <label class="form-label">종료일</label>
          <input
            type="date"
            class="form-control"
            v-model="filterStore.endDate"
            :min="filterStore.startDate"
          />
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
      <!-- 분류 드롭다운 -->
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="clearType">분류</a>
        </li>
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
        :disabled="!filterStore.type"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ categoryLabel }}
      </button>
      <!-- 카테고리 드롭다운 -->
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="clearCategory">카테고리</a>
        </li>
        <li v-for="ctg in historyCategories" :key="ctg.categoryId">
          <a class="dropdown-item" href="#" @click.prevent="setCategory(ctg.value)">
            <i
              v-if="ctg.icon"
              :class="['category-icon-tag', 'me-2', ctg.icon]"
              :style="{ color: 'var(--color-purple-400)' }"
            ></i>
            {{ ctg.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useFilterStore } from '@/stores/filterStore'

const categoryStore = useCategoryStore()
const filterStore = useFilterStore()

const dropdownRef = ref(null)
const isDropdownOpen = ref(false)

//기간 필터
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  categoryStore.fetchCategories()
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const dateLabel = computed(() => {
  const { startDate, endDate } = filterStore
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`
  }
  return '기간'
})

const clearDateFilter = () => {
  filterStore.startDate = ''
  filterStore.endDate = ''
}

//분류 필터
const setType = (val) => {
  filterStore.type = val
  filterStore.category = ''
}

const typeLabel = computed(() => {
  return filterStore.type === 'income' ? '수입' : filterStore.type === 'expense' ? '지출' : '분류'
})

const clearType = () => {
  filterStore.type = ''
  filterStore.category = ''
}

//카테고리 필터
const setCategory = (val) => {
  filterStore.category = val
}

const categoryLabel = computed(() => {
  if (!filterStore.type) return '카테고리'
  const match = historyCategories.value.find((ctg) => ctg.value === filterStore.category)
  return match ? match.label : '카테고리'
})

const categoryMap = computed(() => ({
  income:
    categoryStore.categories.income?.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
      icon: item.categoryIcon,
    })) || [],
  expense:
    categoryStore.categories.expense?.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
      icon: item.categoryIcon,
    })) || [],
}))

const historyCategories = computed(() => {
  return categoryMap.value[filterStore.type] || []
})

const clearCategory = () => {
  filterStore.category = ''
}
</script>

<style scoped>
.filter-btn:hover,
.filter-btn:focus,
.filter-btn:active,
.filter-btn.show {
  background-color: white !important;
  color: gray !important;
}
.dropdown-menu {
  margin-top: 5px;
  max-height: 25vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-300) transparent;
}
.dropdown-item:hover {
  background-color: var(--color-purple-100);
  color: var(--color-purple-400);
  font-weight: bold !important;
}
.dropdown-item:active {
  background-color: var(--color-purple-400);
  color: white;
  font-weight: bold !important;
}
.dropdown-item:active .category-icon-tag {
  color: var(--color-purple-100) !important;
}
</style>
