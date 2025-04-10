<template>
  <div class="login-page-background">
    <div class="login-container">
      <div class="login-box">
        <img src="@/assets/logo.png" alt="오머니 로고" class="logo" />
        <h2 class="subtitle">로그인</h2>

        <form @submit.prevent="handleLogin">
          <div class="form-row">
            <label for="id">아이디</label>
            <input id="id" v-model="id" type="text" />
          </div>

          <div class="form-row">
            <label for="password">비밀번호</label>
            <input id="password" v-model="password" type="password" />
          </div>

          <button type="submit" class="signup-button" @click="handleLogin">로그인</button>
          <router-link to="/signup" class="signup-link">
            <p style="color: gray">회원가입</p>
          </router-link>
        </form>
      </div>

      <!-- 알림 경고창 모달 -->
      <div v-if="showAlert" class="alert-overlay">
        <div class="alert-box">
          <p class="alert-message">{{ alertMessage }}</p>
          <button class="alert-button" @click="showAlert = false">확인</button>
        </div>
      </div>

      <!-- 로그인 성공 시 자동으로 사라지는 환영 메시지 -->
      <div v-if="showWelcome" class="alert-overlay">
        <div class="alert-box auto-hide">
          <p class="alert-message">{{ welcomeMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore.js'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

//로그인 성공 시 환영 메시지
const showWelcome = ref(false)
const welcomeMessage = ref('')

const showWelcomeToast = (message) => {
  welcomeMessage.value = message
  showWelcome.value = true
  setTimeout(() => {
    showWelcome.value = false
    router.push('/main')
  }, 3000)
}

const router = useRouter()
const id = ref('')
const password = ref('')

const showAlert = ref(false)
const alertMessage = ref('')

const openAlert = (message) => {
  alertMessage.value = message
  showAlert.value = true
}

const handleLogin = async () => {
  if (!id.value || !password.value) {
    openAlert('아이디와 비밀번호를 입력하세요!')
    return
  }

  try {
    //json-server에서 id, pw가 일치하는 사용자 조회

    const { data } = await axios.get(`/api/user`, {
      params: { userId: id.value, password: password.value },
    })
    console.log('응답 데이터:', data)
    //로그인 성공한 경우
    if (data.length > 0) {
      const user = data[0] // 사용자 가져오기
      console.log('로그인한 사용자 정보:', user)

      // 저장소에 사용자 정보 저장
      userStore.setUser({
        userId: user.userId,
        userName: user.userName,
        password: user.password,
        createdAt: user.createdAt,
        id: user.id,
        updatedAt: user.updatedAt,
      })
      localStorage.setItem('user', JSON.stringify(user))
      showWelcomeToast(`${user.userName}님, 안녕하세요!`)
    } else {
      // 로그인 실패 시 경고창
      openAlert('아이디 또는 비밀번호가 일치하지 않습니다!')
    }
  } catch (error) {
    console.error(error)
    openAlert('로그인 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
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
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.alert-message {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.alert-button {
  padding: 10px 30px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.alert-button:hover {
  background-color: #7c3aed;
}

.signup-link {
  text-decoration: none; /* 기본 상태 밑줄 제거 */
}

.signup-link p {
  color: gray;
  text-decoration: none; /* 기본 상태 밑줄 제거 */
  margin: 0;
  cursor: pointer;
  transition: text-decoration 0.2s;
}

.signup-link p:hover {
  text-decoration: underline; /* 마우스 올렸을 때만 밑줄 */
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

@media screen and (max-width: 640px) {
  .login-container {
    padding: 16px;
  }

  .login-box {
    width: 100%;
    max-width: 95vw;
    padding: 24px 20px;
    box-shadow: none;
    border-radius: 8px;
    margin: 0 auto;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 20px;
  }

  input {
    font-size: 14px;
  }

  .signup-button {
    margin-top: 20px;
    padding: 10px;
    font-size: 14px;
  }

  .alert-box {
    width: 90%;
  }

  /* 로그인 성공 시 환영 */
  .alert-box.auto-hide {
    animation: fadeOut 3s forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
}
</style>
