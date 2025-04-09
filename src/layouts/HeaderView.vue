<template>
  <header class="header">
    <!-- 데스크탑: 텍스트 로고 -->
    <template v-if="isDesktop">
      <img src="@/assets/logo.png" class="logo" @click="goToCalendar" />
    </template>

    <!-- 모바일: 이미지 로고만 -->
    <template v-else>
      <img src="@/assets/logo.png" class="mobile-logo" @click="goToCalendar" />
    </template>

    <!-- 햄버거 메뉴 (모바일 전용) -->
    <button v-if="!isDesktop && !isMenuOpen" class="hamburger" @click="$emit('toggle-menu')">
      ☰
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToCalendar = () => {
  router.push('/home')
}

defineProps({
  isDesktop: Boolean,
  isMenuOpen: Boolean,
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12vh;
  position: relative;
}

.logo {
  height: 11vh;
  width: auto;
  margin-right: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.mobile-logo {
  height: 70px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover,
.mobile-logo:hover {
  transform: scale(1.03); /* 클릭 느낌 살짝 */
}

.title {
  font-size: 32px;
  color: #673ab7;
}

.hamburger {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
}
</style>
