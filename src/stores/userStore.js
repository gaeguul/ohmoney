// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id:'',
    userId: '',
    userName: '',
    password: '',
    createdAt: '',
    updatedAt: '',
    isLoggedIn: false,
  }),
  actions: {
    setUser(user) {
      this.id = user.id
      this.userId = user.userId
      this.userName = user.userName
      this.password = user.password
      this.createdAt = user.createdAt
      this.updatedAt = user.updatedAt
      this.isLoggedIn = true
    },
    clearUser() {
      this.userId = ''
      this.userName = ''
      this.password = ''
      this.id=''
      this.createdAt=''
      this.updatedAt=''
      this.isLoggedIn = false
      localStorage.removeItem('user')
    },
  },
  // persist: true, // 로그인 상태 유지 추가!
})
