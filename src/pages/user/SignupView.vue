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
          <span v-if="passwordTooShort" class="error">최소 8자리 이상 입력해주세요.</span>
        </div>

        <div class="form-row">
          <label for="confirmPassword">비밀번호 확인</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" />
          <span v-if="passwordMatchMessage" :class="passwordMatchError ? 'error' : 'success'">
            {{ passwordMatchMessage }}
          </span>
        </div>

        <div class="form-row">
          <label for="name">이름</label>
          <input id="name" v-model="name" type="text" />
        </div>

        <!-- <hr class="divider" /> -->

        <button type="submit" class="signup-button">가입</button>
      </form>

      <p class="login-link">
        이미 계정이 있으신가요?
        <router-link to="/signin">로그인하기</router-link>
      </p>
    </div>
    <!-- 🔔 커스텀 알림 모달 -->
    <div v-if="showAlert" class="alert-overlay">
      <div class="alert-box">
        <p class="alert-message">{{ alertMessage }}</p>
        <button class="alert-button" @click="showAlert = false">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import axios from '@/api/axios'

const router = useRouter()
const id = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const isIdAvailable = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')

//회원 정보 더 입력하라는 알림창
const openAlert = (message) => {
  alertMessage.value = message
  showAlert.value = true
}

//비밀번호 일치하는지 여부 확인
const passwordMatchMessage = computed(() => {
  if (!confirmPassword.value) return ''
  return password.value === confirmPassword.value
    ? '비밀번호가 일치합니다.'
    : '비밀번호가 일치하지 않습니다.'
})

const passwordMatchError = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value
})

//비밀번호 유효성 체크
const passwordTooShort = computed(() => {
  return password.value.length > 0 && password.value.length < 8
})

const handleSignup = async () => {
  if (!id.value || !password.value || !confirmPassword.value || !name.value) {
    openAlert('모든 항목을 입력해주세요!')
    return
  }
  if (!isIdAvailable.value) {
    openAlert('아이디 중복확인을 먼저 해주세요.')
    return
  }
  if (passwordMatchError.value) {
    openAlert('비밀번호가 일치하지 않습니다.')
    return
  }
  //비밀번호가 너무 짧을 경우
  if (passwordTooShort.value) {
    openAlert('비밀번호는 최소 8자리 이상이어야 합니다.')
    return
  }

  const now = new Date().toISOString() //회원가입한 시기 저장
  try {
    const res = await axios.post('/user', {
      userId: id.value,
      password: password.value,
      userName: name.value,
      createdAt: now,
      updatedAt: now,
    })

    if (res) {
      openAlert('회원가입 성공!\n로그인 페이지로 이동합니다.')
      setTimeout(() => {
        router.push('/signin')
      }, 3000)
    }
  } catch (err) {
    console.error(err)
    openAlert('회원가입 실패')
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
    const { data } = await axios.get(`/user?userId=${id.value}`)
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
  padding: 30px 395px 30px 381px;
  box-sizing: border-box;
}

.signup-box {
  width: 80%;
  min-width: 500px;
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
  gap: 12px;
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

.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.alert-box {
  background-color: white;
  padding: 36px 54px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.3s ease;
  max-width: none;
  width: auto;
  min-width: 360px;
}

.alert-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.alert-button {
  padding: 10px 20px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.alert-button:hover {
  background-color: #7c3aed;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-link {
  margin-top: 16px;
  font-size: 14px;
  color: #444;
  text-align: center;
}

.login-link a {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: bold;
  margin-left: 4px;
}

.login-link a:hover {
  text-decoration: underline;
}

/* 반응형 */
@media screen and (max-width: 640px) {
  .signup-container {
    padding: 24px;
  }

  .signup-box {
    width: 100%;
    max-width: 95vw;
    padding: 24px 20px;
    box-shadow: none;
    border-radius: 8px;
    margin: 0 auto;
  }

  .logo {
    width: 120px;
  }

  .subtitle {
    font-size: 18px;
    margin-bottom: 20px;
  }

  form {
    gap: 12px;
  }

  label {
    font-size: 13px;
  }

  input {
    font-size: 13px;
    padding: 8px;
  }

  .check-button {
    font-size: 13px;
    padding: 6px 10px;
  }

  .signup-button {
    font-size: 14px;
    padding: 10px;
  }

  .alert-box {
    width: 90%;
    padding: 20px;
  }

  .alert-message {
    font-size: 14px;
  }

  .alert-button {
    font-size: 13px;
    padding: 8px 16px;
  }

  .login-link {
    font-size: 13px;
  }
}
</style>
