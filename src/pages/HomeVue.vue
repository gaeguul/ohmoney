<template>
  <div class="page">
    <div class="wrapper">
      <Header :is-desktop="isDesktop" :is-menu-open="isMenuOpen" @toggle-menu="isMenuOpen = true" />

      <div class="body">
        <NavBar
          v-if="isDesktop || (!isDesktop && isMenuOpen)"
          :class="['navbar', { 'mobile-navbar': !isDesktop }]"
          @close-menu="isMenuOpen = false"
        />

        <main class="main-content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@/layouts/HeaderView.vue'
import NavBar from '@/layouts/NavBar.vue'

const isMenuOpen = ref(false)
const isDesktop = ref(window.innerWidth > 640)

const handleResize = () => {
  isDesktop.value = window.innerWidth > 640
  if (isDesktop.value) isMenuOpen.value = false
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
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  background-color: #f6f6f6;
  overflow: hidden;
}

.wrapper {
  width: 95%;
  height: 95%;
  max-width: none;
  max-height: none;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.body {
  height: auto;
  display: flex;
  flex: 1;
}

.navbar {
  width: 15.6vw;
  height: 100%;
  background-color: #fff;
  border-radius: 0 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vh 1vw;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.03);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  width: 76.6vw;
  height: 100%;
  padding: 2vh 2vw;
  background-color: #fafafa;
  overflow-y: auto;
}
</style>

<style>
@media screen and (max-width: 640px) {
  .body {
    /* flex-direction: column; */
    display: block;
  }

  .navbar {
    width: 100%;
    border-radius: 0;
    height: auto;
  }

  .mobile-navbar {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 90vw;
    height: 100vh; /* ✅ 화면 전체 높이로 고정 */
    background-color: white;
    z-index: 999;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .main-content {
    padding: 2vh 5vw;
    width: 100%;
    margin: 0;
    height: auto;
    position: relative;
  }

  .hamburger {
    display: block;
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 28px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000;
  }
}
</style>
