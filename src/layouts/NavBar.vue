<template>
  <div class="sidebar">
    <button v-if="isMobile" class="close-btn" @click="$emit('close-menu')">✕</button>

    <!-- 전체 메뉴 영역 -->
    <div class="sidebar-content">
      <div class="user-box">OOO 님의 가계부</div>

      <nav class="menu">
        <router-link to="/">캘린더</router-link>
        <router-link to="/accounts">내역</router-link>
        <router-link to="/dashboard">분석</router-link>
      </nav>
    </div>

    <!-- 하단 로그아웃 -->
    <router-link to="/signin" class="logout">로그아웃</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
  padding: 12px;
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
</style>
