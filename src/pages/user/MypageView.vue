<template>
  <div class="mypage-container">
    <div class="profile-header-container">
      <div class="profile-info">
        <div class="avatar">
          <img src="@/assets/profile.png" alt="기본 프로필" class="avatar" />
        </div>
        <div class="name-section">
          <h2 class="username">{{ userStore.userName }} ({{ userStore.userId }})</h2>
        </div>
      </div>
    </div>

    <!-- 프로필 수정 모드에 따라 표시되는 내용 -->
    <div class="profile-body">
      <div v-if="editMode" class="left">
        <h2>프로필 수정</h2>
        <p>당신의 프로필을 수정하세요!</p>
      </div>

      <!-- 프로필 수정 폼이 나타날 때 -->
      <div v-if="editMode" class="right">
        <div class="form-group">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" v-model="password" />
        </div>
        <div class="form-group">
          <label>이름</label>
          <input type="text" placeholder="이름 입력" v-model="nickname" />
        </div>
        <div class="btn-group">
          <button class="cancel-btn" @click="cancelEdit">초기화</button>
          <button class="save-btn" @click="handleSave">수정하기</button>
        </div>
      </div>
    </div>
    <!-- 공란으로 수정하려 할 경우 알림 모달 -->
    <div v-if="showAlert" class="alert-overlay">
      <div class="alert-box">
        <p class="alert-message">{{ alertMessage }}</p>
        <button class="alert-button" @click="showAlert = false">확인</button>
      </div>
    </div>
    <!-- 수정 완료 시 알림 모달 -->
    <div v-if="showToast" class="alert-overlay">
      <div class="toast-box">
        <p class="toast-message">{{ toastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const showAlert = ref(false)
const alertMessage = ref('')
const toastMessage = ref('')

const showToast = ref(false)

const password = ref('')
const nickname = ref('')

// 비밀번호 길이 유효성 검사
const passwordTooShort = computed(() => {
  return password.value.length > 0 && password.value.length < 8
})

// 수정 완료 핸들러
const handleSave = () => {
  if (!password.value || !nickname.value) {
    alertMessage.value = '모든 항목을 입력해주세요.'
    showAlert.value = true
    return
  }
  //비밀번호 최소 8자리 이상
  if (passwordTooShort.value) {
    alertMessage.value = '비밀번호는 최소 8자리 이상이어야 합니다.'
    showAlert.value = true
    return
  }
  // 정상 수정 완료
  toastMessage.value = '수정이 완료되었습니다.'
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 2500)
}

// 수정 모드 상태
const editMode = ref(true)

// 수정 취소
const cancelEdit = () => {
  password.value = ''
  nickname.value = ''
}
</script>

<style scoped>
.mypage-container {
  font-family: sans-serif;
}

.profile-header-container {
  /* background-color: #b197f7; */
  background-color: transparent;
  padding: 40px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 100%;
  margin: 0 auto;
}

.profile-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: transparent;
  margin-right: 16px;
}

.name-section {
  display: flex;
  flex-direction: column;
}

.username {
  margin: 0;
  font-size: 28px;
  color: black;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.edit-btn {
  background-color: #8b5cf6;
  color: white;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* 버튼 클릭 시 */

.edit-btn:active {
  background-color: #7c3aed; /* 클릭했을 때 연보라색 변경 */
  transform: scale(0.98); /* 약간 눌린 효과 */
}

/* 버튼에 마우스를 올렸을 때 */
.logout-btn:hover,
.edit-btn:hover {
  background-color: #7c3aed;
  cursor: pointer;
}

.profile-body {
  display: flex;
  justify-content: flex-end;
  padding: 40px 200px;
  border: 3px solid #a686ef;
}

.left {
  flex: 1;
}

.left h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.right {
  flex: 1;
  max-width: 400px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.form-group small {
  display: block;
  margin-top: 4px;
  color: #888;
  font-size: 12px;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  background-color: white;
  border: 1px solid black;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

/* 취소 버튼 마우스 효과 */
.cancel-btn:hover {
  background-color: #e0c9f7;
  cursor: pointer;
}

.save-btn {
  flex: 1;
  padding: 10px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

/* 수정 버튼 마우스 효과 */
.save-btn:hover {
  background-color: #7c3aed;
  cursor: pointer;
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
  animation: fadeIn 0.5s ease-in-out;
}

.alert-message {
  font-size: 20px;
  color: #333;
}

.alert-button {
  padding: 10px 20px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.toast-box {
  background-color: white;
  padding: 36px 54px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeInOut 2.5s ease-in-out;
}

.toast-message {
  font-size: 20px;
  color: #333;
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

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
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

@media screen and (max-width: 640px) {
  .profile-header-container {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    text-align: center;
  }

  .profile-info {
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }

  .username {
    font-size: 22px;
  }

  .profile-actions {
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .logout-btn,
  .edit-btn {
    font-size: 14px;
    padding: 10px 16px;
  }

  .profile-body {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }

  .left,
  .right {
    max-width: 100%;
    width: 100%;
  }

  .left h2 {
    font-size: 22px;
    text-align: center;
  }

  .left p {
    text-align: center;
    font-size: 14px;
  }

  .form-group input {
    font-size: 14px;
  }

  .btn-group {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  .alert-box,
  .toast-box {
    width: 90%;
    max-width: 300px;
  }

  .alert-message,
  .toast-message {
    font-size: 14px;
  }
}
</style>
