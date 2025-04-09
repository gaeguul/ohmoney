// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    userName: '',
    password: '',
    isLoggedIn: false,
  }),
  actions: {
    setUser(user) {
      this.id=user.id
      this.userId = user.userId
      this.userName = user.userName
      this.password = user.password
      this.isLoggedIn = true
    },
    clearUser() {
      this.userId = ''
      this.userName = ''
      this.password = ''
      this.isLoggedIn = false
    },
  },
  // persist: true, // 로그인 상태 유지 추가!
})
