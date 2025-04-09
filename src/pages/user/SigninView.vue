<template>
  <div class="login-container">
    <div class="login-box">
      <!-- <img src="@/assets/logo.png" alt="오머니 로고" class="logo" /> -->
      <h1 class="title">오머니</h1>
      <h2 class="subtitle">로그인</h2>

      <form @submit.prevent="handleLogin">
        <label for="id">아이디</label>
        <input id="id" v-model="id" type="text" />

        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" />

        <button type="submit" class="signup-button" @click="handleLogin">로그인</button>
        <router-link to="/signup" style="text-decoration: none"
          ><p style="color: gray">회원가입</p></router-link
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const id = ref('')
const password = ref('')

const handleLogin = () => {
  if (id.value && password.value) {
    router.push('/')
  } else {
    alert('아이디와 비밀번호를 입력하세요!')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;

  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 61px 395px 70px 381px;
  box-sizing: border-box;
}

.login-box {
  width: 700px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 10px;
}

.title {
  font-size: 32px;
  color: #673ab7; /* 보라색 */
  margin-bottom: 20px;
  font-weight: bold;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.signup-button {
  margin-top: 30px;
  padding: 12px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #7c3aed;
}
</style>
