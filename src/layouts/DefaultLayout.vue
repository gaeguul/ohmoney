<template>
  <div class="page">
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
</template>

<script setup>
import Header from '@/layouts/HeaderView.vue'
import NavBar from '@/layouts/NavBar.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

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
@media screen and (min-width: 641px) {
  .page {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    overflow: hidden;
  }

  /* Header는 상단 전체 */
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    min-height: 64px;
    background-color: transparent;
    position: relative;
  }

  /* Header 아래의 본문 */
  .body {
    flex: 1;
    display: flex;
    min-height: 0;
    overflow: hidden;
  }

  .navbar {
    width: 220px;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2vh 1vw;
    padding: 2vh 24px;
  }

  .main-content {
    flex: 1;
    padding: 40px;
    background-color: #fafafa;
    overflow-y: auto;
    min-height: 0;
    border-radius: 24px;
  }
}
</style>

<style>
@media screen and (max-width: 640px) {
  .body {
    display: block;
  }

  .navbar {
    display: none;
  }

  .mobile-navbar {
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    position: fixed !important;
    top: 0;
    left: 0;
    width: 75vw;
    height: 100vh;
    background-color: white;
    z-index: 999;
    overflow-y: auto;
    padding: 24px 24px;
    box-sizing: border-box;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  }

  .main-content {
    width: 100%;
    padding: 2vh 5vw;
    height: auto;
    margin: 0;
    position: relative;
    background-color: #ffffff;
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
