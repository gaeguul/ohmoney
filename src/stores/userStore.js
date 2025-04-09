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
<<<<<<< HEAD
      this.id=user.id
=======
      this.id = user.id
>>>>>>> d56f7fa4e3b64fb3ed3352704062746b31b32d73
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
