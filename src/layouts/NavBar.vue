<template>
  <div class="sidebar">
    <button v-if="isMobile" class="close-btn" @click="$emit('close-menu')">✕</button>

    <!-- 전체 메뉴 영역 -->
    <div class="sidebar-content">
      <div class="user-box">{{ userStore.userName }} 님의 가계부</div>

      <nav class="menu">
        <router-link to="/home">캘린더</router-link>
        <router-link to="/accounts">내역</router-link>
        <div class="analysis-menu">
          <div class="menu-link" @click="toggleAnalysis">
            <span :class="{ active: showAnalysisSubMenu }">분석</span>
          </div>
          <div v-show="showAnalysisSubMenu" class="submenu">
            <router-link to="/dashboard/month">월별 분석</router-link>
            <router-link to="/dashboard/category">카테고리별 분석</router-link>
          </div>
        </div>
        <router-link to="/mypage">마이 페이지</router-link>
      </nav>
    </div>

    <!-- 하단 로그아웃 -->
    <router-link to="/signin" class="logout" @click="userStore.clearUser()">로그아웃</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
//현재 로그인 중인 사용자 이름 출력용
import { useUserStore } from '@/stores/userStore.js'
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

//분석 하위 메뉴
const showAnalysisSubMenu = ref(false)
const toggleAnalysis = () => {
  showAnalysisSubMenu.value = !showAnalysisSubMenu.value
}
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
  align-items: center;
  gap: 8px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 4px;
}

.menu a {
  text-decoration: none;
  color: #555;
  font-weight: 400;
}

.menu a:hover {
  font-weight: bold;
  color: #8b5cf6;
}

.menu a.router-link-exact-active {
  color: #8b5cf6;
  font-weight: bold;
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

/* 분석 하위 메뉴 */
.menu-link {
  cursor: pointer;
  color: #555;
  font-weight: 400;
  margin-left: 4px;
  margin-bottom: 20px;
  user-select: none;
  font-size: 16px;
}

.menu-link:hover span {
  font-weight: bold;
  color: #8b5cf6;
}

.menu-link .active {
  color: #8b5cf6;
  font-weight: bold;
}

.submenu {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 16px;
  margin-top: 4px;
}

.submenu a {
  font-size: 14px;
  color: #777;
  text-decoration: none;
}

.submenu a.router-link-exact-active {
  color: #8b5cf6;
  font-weight: bold;
}
</style>
