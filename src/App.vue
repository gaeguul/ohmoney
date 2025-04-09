<script setup>
import { RouterView } from 'vue-router'

import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

onMounted(() => {
  const userStore = useUserStore()
  const savedUser = localStorage.getItem('user')

  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser)
      userStore.setUser(parsedUser)
    } catch (error) {
      console.error('로컬스토리지 파싱 오류:', error)
    }
  }
})
</script>
<template>
  <RouterView />
</template>
