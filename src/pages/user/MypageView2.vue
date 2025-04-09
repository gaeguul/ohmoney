<template>
  <div class="profile-wrapper">
    <!-- 상단 프로필 배경 영역 -->
    <div class="profile-header">
      <div class="profile-info">
        <div class="avatar">
          <img src="@/assets/profile.png" alt="기본 프로필" class="avatar" />
        </div>
        <div>
          <h2 class="name">{{ userStore.userName }}님 안녕하세요!</h2>
          <p class="usage-days">현재 가계부를 {{ usageDays }}일째 이용 중입니다.</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="edit-btn" @click="toggleEdit">프로필 수정</button>
        <button class="logout-btn" @click="logout">로그아웃</button>
        <button class="withdraw-btn" @click="toggleWithdraw">회원 탈퇴</button>
        <button class="home-btn" @click="goHome">홈으로</button>
      </div>
    </div>

    <!-- 사용자 인증 영역 -->
    <div class="profile-main vertical" v-if="(isEditing || isWithdrawing) && !isVerified">
      <div class="form-left">
        <h2 class="center-title">{{ isWithdrawing ? '회원 탈퇴' : '사용자 인증' }}</h2>
        <p class="center-desc">본인 확인을 위해 정보를 입력해주세요.</p>
      </div>

      <div class="form-right">
        <label>아이디</label>
        <input type="text" placeholder="아이디 입력" v-model="inputUserId" />

        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호 입력" v-model="inputPassword" />

        <div class="btn-group">
          <button class="cancel" @click="cancelEdit">취소</button>
          <button class="save" @click="verifyUser">확인</button>
        </div>
      </div>
    </div>

    <!-- 수정 폼 영역 -->
    <div class="profile-main vertical" v-if="isEditing && isVerified">
      <div class="form-left">
        <h2 class="center-title">프로필 수정</h2>
        <p class="center-desc">{{ userStore.userName }}님의 프로필을 수정하세요!</p>
      </div>

      <div class="form-right">
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호 입력" v-model="password" />
        <p v-if="passwordTooShort" class="warning">8자리 이상 입력하세요!</p>

        <label>이름</label>
        <input type="text" placeholder="이름 입력" v-model="nickname" />

        <div class="btn-group">
          <button class="cancel" @click="cancelEdit">취소</button>
          <button class="save" @click="handleSave">수정하기</button>
        </div>
      </div>
    </div>

    <!-- 알림 모달 -->
    <div v-if="showAlert" class="alert-overlay">
      <div class="alert-box">
        <p class="alert-message">{{ alertMessage }}</p>
        <button class="alert-button" @click="showAlert = false">확인</button>
      </div>
    </div>
    <div v-if="showToast" class="alert-overlay">
      <div class="toast-box">
        <p class="toast-message">{{ toastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
console.log(window.innerWidth)

import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()

const isEditing = ref(false)
const isWithdrawing = ref(false)
const isVerified = ref(false)

const goHome = () => {
  router.push('/home') // 또는 홈 경로에 맞게 변경
}

const toggleEdit = () => {
  isEditing.value = true
  isWithdrawing.value = false
  isVerified.value = false
}

const toggleWithdraw = () => {
  isWithdrawing.value = true
  isEditing.value = false
  isVerified.value = false
}

const password = ref('')
const nickname = ref('')
const inputUserId = ref('')
const inputPassword = ref('')

const showAlert = ref(false)
const alertMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')

const usageDays = computed(() => {
  const createdAt = userStore.createdAt
  if (!createdAt) return 0
  const createdDate = new Date(createdAt)
  if (isNaN(createdDate)) return 0
  const created = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate())
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor((today - created) / (1000 * 60 * 60 * 24))
})

const logout = () => {
  userStore.clearUser()
  localStorage.removeItem('user')
  router.push('/signin')
}

const cancelEdit = () => {
  password.value = ''
  nickname.value = ''
  inputUserId.value = ''
  inputPassword.value = ''
  isEditing.value = false
  isWithdrawing.value = false
  isVerified.value = false
}

const passwordTooShort = computed(() => password.value.length > 0 && password.value.length < 8)

const verifyUser = () => {
  if (!inputUserId.value || !inputPassword.value) {
    alertMessage.value = '모든 항목을 입력해주세요.'
    showAlert.value = true
    return
  }
  if (inputUserId.value !== userStore.userId || inputPassword.value !== userStore.password) {
    alertMessage.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
    showAlert.value = true
    return
  }

  if (isWithdrawing.value) {
    handleWithdraw()
  } else {
    isVerified.value = true
  }
}

const handleWithdraw = async () => {
  try {
    await axios.delete(`/api/user/${userStore.id}`)
    toastMessage.value = `${userStore.userName}님, 그동안 감사했습니다.`
    showToast.value = true
    userStore.clearUser()
    localStorage.removeItem('user')
    setTimeout(() => {
      showToast.value = false
      router.push('/signin')
    }, 2500)
  } catch (err) {
    console.error(err)
    alertMessage.value = '회원 탈퇴 중 오류가 발생했습니다.'
    showAlert.value = true
  }
}

const handleSave = async () => {
  if (!password.value || !nickname.value) {
    alertMessage.value = '모든 항목을 입력해주세요.'
    showAlert.value = true
    return
  }
  if (passwordTooShort.value) {
    alertMessage.value = '비밀번호는 최소 8자리 이상이어야 합니다.'
    showAlert.value = true
    return
  }
  try {
    const updatedAt = new Date().toISOString()
    await axios.patch(`/api/user/${userStore.id}`, {
      password: password.value,
      userName: nickname.value,
      updatedAt,
    })
    userStore.setUser({
      ...userStore.$state,
      password: password.value,
      userName: nickname.value,
      updatedAt,
    })
    localStorage.setItem('user', JSON.stringify(userStore.$state))
    toastMessage.value = '수정이 완료되었습니다.'
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2500)
    password.value = ''
    nickname.value = ''
    isEditing.value = false
    isVerified.value = false
  } catch (err) {
    console.error(err)
    alertMessage.value = '수정 중 오류가 발생했습니다.'
    showAlert.value = true
  }
}
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.profile-header {
  background: rgba(124, 76, 232, 0.64);
  padding: 50px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  /* 추가 */
  flex-wrap: wrap;
  gap: 24px;
  min-width: 320px;
}
@media screen and (max-width: 1024px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
  }

  .header-actions {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .header-actions button {
    width: 80%;
    margin-bottom: 10px;
  }

  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .name {
    font-size: 24px;
  }

  .usage-days {
    font-size: 16px;
  }

  .avatar {
    width: 120px;
    height: 120px;
  }
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: transparent;
}

.name {
  font-size: 30px;
  font-weight: 600;
}

.usage-days {
  font-size: 18px;
  color: #f0f0f0;
  margin-top: 6px;
}

.header-actions button {
  display: block;
  margin-bottom: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid white;
  color: white;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  min-width: 140px;
  text-align: center;
}

.edit-btn {
  background: #7c4ce8 !important;
  border-color: #7c4ce8 !important;
}

.edit-btn:hover {
  background-color: #6f38e2 !important;
}
.logout-btn {
  border: none !important;
  background-color: #855ee0 !important;
}

.logout-btn:hover {
  background-color: #7853cc !important;
}
.logout-btn:active {
  background-color: #7853cc !important;
}

/* ✅ 중앙 정렬된 인증/수정 섹션 */
.profile-main.vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 40px;
}

/* 설명 텍스트 */
.form-left {
  text-align: center;
  max-width: 600px;
}
.center-title {
  font-size: 28px;
  margin-bottom: 12px;
  color: #7c4ce8;
  font-weight: bold;
}
.center-desc {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

/* 입력 영역 */
.form-right {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-right label {
  font-weight: bold;
  font-size: 18px;
}
.form-right input {
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.warning {
  color: red;
  font-size: 15px;
  margin-top: -6px;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}
.cancel,
.save {
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
}
.cancel {
  background: white;
  border: 1px solid black;
  color: black;
}
.cancel:hover {
  background-color: #f1f1f1;
}
.save {
  background-color: #8b5cf6;
  border: none;
  color: white;
}
.save:hover {
  background-color: #7a49eb;
}

/* 모달 */
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
.alert-box,
.toast-box {
  background-color: white;
  padding: 36px 54px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.4s ease-in-out;
}
.alert-message,
.toast-message {
  font-size: 18px;
  color: #333;
}
.alert-button {
  margin-top: 16px;
  padding: 10px 24px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
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

.header-actions .withdraw-btn {
  background-color: #8c6ee6;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
}

.header-actions .withdraw-btn:hover {
  background-color: #795ad4;
}

.header-actions .home-btn {
  background-color: #a084f6;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
}
.header-actions .home-btn:hover {
  background-color: #9370e0;
}

@media screen and (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 24px;
  }

  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .header-actions button {
    width: 100%;
    margin-bottom: 12px;
  }

  .profile-main.vertical {
    padding: 40px 16px;
    gap: 32px;
  }

  .form-right {
    width: 100%;
    max-width: 100%;
  }

  .form-left {
    padding: 0 16px;
  }

  .btn-group {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-group button {
    width: 100%;
  }
}
</style>
