<template>
  <header class="header">
    <img src="@/assets/logo.png" class="logo" />
    <h1 class="title fw-bold">Oh! 머니</h1>

    <!-- 햄버거 버튼: 모바일일 때만, 메뉴 닫혀있을 때만 -->
    <button v-if="!isDesktop && !isMenuOpen" class="hamburger" @click="$emit('toggle-menu')">
      ☰
    </button>
  </header>
</template>

<script setup>
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
  height: 8vh;
  width: auto;
  margin-right: 8px;
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
