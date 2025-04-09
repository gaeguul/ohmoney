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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

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
