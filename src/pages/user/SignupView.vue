<template>
  <div class="signup-container">
    <div class="signup-box">
      <img src="@/assets/logo.png" alt="오머니 로고" class="logo" />
      <h2 class="subtitle">회원가입</h2>

      <form @submit.prevent="handleSignup">
        <div class="form-row">
          <label for="id">아이디</label>
          <div class="id-input-wrapper">
            <input id="id" v-model="id" type="text" />
            <button type="button" class="check-button" @click="checkDuplicate">중복확인</button>
          </div>
          <span v-if="idError" class="error">{{ idError }}</span>
          <span v-else-if="idSuccess" class="success">{{ idSuccess }}</span>
        </div>

        <div class="form-row">
          <label for="password">비밀번호</label>
          <input id="password" v-model="password" type="password" />
        </div>

        <div class="form-row">
          <label for="confirmPassword">비밀번호 확인</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" />
        </div>

        <div class="form-row">
          <label for="name">이름</label>
          <input id="name" v-model="name" type="text" />
        </div>

        <hr class="divider" />

        <button type="submit" class="signup-button">가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/api/axios'

const router = useRouter()
const id = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const isIdAvailable = ref(false)

const handleSignup = async () => {
  if (!id.value || !password.value || !confirmPassword.value || !name.value) {
    alert('모든 항목을 입력해주세요!')
    return
  }
  if (!isIdAvailable.value) {
    alert('아이디 중복확인을 먼저 해주세요.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  try {
    await axios.post('/user', {
      id: id.value,
      pw: password.value,
      name: name.value,
    })
    alert('회원가입 성공!')
    router.push('/signin')
  } catch (err) {
    console.error(err)
    alert('회원가입 실패')
  }
}

const idError = ref('')
const idSuccess = ref('')

// 중복 확인
const checkDuplicate = async () => {
  idError.value = ''
  idSuccess.value = ''

  if (!id.value) {
    idError.value = '아이디를 입력해주세요.'
    return
  }

  try {
    const { data } = await axios.get(`/user?id=${id.value}`)
    if (data.length > 0) {
      idError.value = '이미 존재하는 아이디입니다.'
      isIdAvailable.value = false
    } else {
      idSuccess.value = '사용할 수 있는 아이디입니다.'
      isIdAvailable.value = true
    }
  } catch (err) {
    console.error(err)
    idError.value = '중복 확인 중 오류 발생'
  }
}
</script>

<style scoped>
.signup-container {
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

.signup-box {
  width: 700px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
  text-align: center;
}

.logo {
  width: 170px;
  height: auto;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.id-input-wrapper {
  display: flex;
  gap: 8px;
  width: 100%;
}

.id-input-wrapper input {
  flex: 1;
}

.check-button {
  padding: 8px 14px;
  background-color: white;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.check-button:hover {
  background-color: #f5edff;
}

.signup-button {
  margin-top: 20px;
  padding: 12px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #7c3aed;
}

.divider {
  margin-top: 20px;
  border: none;
  height: 1px;
  background-color: #ddd;
}

.success {
  color: green;
  font-size: 12px;
  margin-top: 4px;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
