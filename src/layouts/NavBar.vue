<template>
  <div class="sidebar">
    <button v-if="isMobile" class="close-btn" @click="$emit('close-menu')">✕</button>

    <!-- 전체 메뉴 영역 -->
    <div class="sidebar-content">
      <div class="user-box">
        <div class="top-line">
          <span class="icon">👤</span>
          <span class="username">{{ userStore.userName }}님의</span>
        </div>
        <div class="bottom-line">가계부</div>
      </div>

      <nav class="menu">
        <div class="menu-item" :class="{ active: route.path === '/home' }" @click="goTo('/home')">
          캘린더
        </div>

        <div
          class="menu-item"
          :class="{ active: route.path === '/accounts' }"
          @click="goTo('/accounts')"
        >
          내역
        </div>

        <div class="menu-item" @click="toggleAnalysis">
          <span :class="{ active: isDashboardActive }">분석</span>
        </div>
        <div v-show="showAnalysisSubMenu" class="submenu">
          <div
            class="submenu-item"
            :class="{ active: route.path === '/dashboard/month' }"
            @click="goTo('/dashboard/month')"
          >
            월별 분석
          </div>
          <div
            class="submenu-item"
            :class="{ active: route.path === '/dashboard/category' }"
            @click="goTo('/dashboard/category')"
          >
            카테고리별 분석
          </div>
        </div>

        <div
          class="menu-item"
          :class="{ active: route.path === '/mypage' }"
          @click="goTo('/mypage')"
        >
          마이 페이지
        </div>
      </nav>
    </div>

    <!-- 하단 로그아웃 -->
    <router-link to="/signin" class="logout" @click="userStore.clearUser()">로그아웃</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
//현재 로그인 중인 사용자 이름 출력용
import { useUserStore } from '@/stores/userStore.js'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const goTo = (path) => {
  if (route.path !== path) {
    router.push(path)
  }
  if (!path.startsWith('/dashboard')) {
    showAnalysisSubMenu.value = false
  }
}

const showAnalysisSubMenu = ref(false)
const toggleAnalysis = () => {
  showAnalysisSubMenu.value = !showAnalysisSubMenu.value
}
const isDashboardActive = computed(() => route.path.startsWith('/dashboard'))

const userStore = useUserStore()
const isMobile = ref(window.innerWidth <= 640)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 640
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.sidebar {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-radius: 0 30px 0 0;
}

.sidebar-content {
  /* 위쪽 메뉴 묶음 */
  display: flex;
  flex-direction: column;
}

.user-box {
  background-color: #8b5cf6;
  color: white;
  padding: 15px 20px;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.top-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
}

.bottom-line {
  font-size: 16px;
  font-weight: bold;
  text-align: right; /* ✅ 오른쪽 정렬 */
}

.icon {
  font-size: 18px;
}
.analysis-menu {
  display: inline-block;
  vertical-align: middle;
  /* padding-top: 1px; 또는 2px: 미세하게 위로 올리기 */
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 4px;
}
.menu-item {
  font-size: 16px;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.menu-item:hover {
  font-weight: bold;
  color: #8b5cf6;
}

.menu-item.active {
  font-weight: bold;
  color: #8b5cf6;
}

.logout {
  font-size: 14px;
  color: #555;
  margin-left: 4px;
  text-decoration: none;
}
.logout:hover {
  font-weight: bold;
  color: #8b5cf6;
}
.close-btn {
  position: absolute;
  top: 34px;
  right: 52px;
  transform: translate(100%, -50%);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
}

.submenu {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 16px;
  margin-top: 4px;
}
.submenu-item {
  font-size: 14px;
  color: #777;
  cursor: pointer;
}
.submenu-item:hover {
  font-weight: bold;
  color: #8b5cf6;
}
.submenu-item.active {
  font-weight: bold;
  color: #8b5cf6;
}
</style>
