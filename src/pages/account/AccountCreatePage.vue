<template>
  <div class="account-form">
    <header>
      <h3>가계부 작성</h3>
      <div class="submit-section">
        <input type="submit" value="작성 완료" class="submit-button" @click="submitForm" />
      </div>
    </header>

    <div class="container">
      <div class="col">
        <div class="row">
          <div class="label">날짜</div>
          <input type="date" class="input-field" v-model.trim="tempDate" />
        </div>
        <div class="row">
          <div class="label">분류</div>
          <div class="radio-group">
            <label class="submit">
              <input
                type="radio"
                name="uses"
                id="지출"
                value="expense"
                checked="checked"
                @change="changeCategoryExpense"
                v-model="newTransaction.transactionType"
              />
              <span>지출</span>
            </label>
            <label class="submit">
              <input
                type="radio"
                name="uses"
                id="수입"
                value="income"
                @change="changeCategoryIncome"
                v-model="newTransaction.transactionType"
              />
              <span>수입</span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="label">금액</div>
          <div class="amount-field">
            <input
              type="text"
              class="input-field"
              :value="formattedAmount"
              @input="handleAmountInput"
              @keydown="blockNonNumeric"
              @paste.prevent
              @compositionstart.prevent
              @compositionupdate.prevent
              @compositionend.prevent
              inputmode="numeric"
            />
            <span>원</span>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <div class="label">사용처</div>
          <input type="text" class="input-field" v-model.trim="newTransaction.vendor" />
        </div>
        <div class="row">
          <div class="label">결제수단</div>
          <div class="radio-group">
            <label class="submit">
              <input
                type="radio"
                name="cash"
                id="카드"
                value="카드"
                v-model="newTransaction.paymentMethod"
              />
              <span>카드</span>
            </label>
            <label class="submit">
              <input
                type="radio"
                name="cash"
                id="현금"
                value="현금"
                v-model="newTransaction.paymentMethod"
              />
              <span>현금</span>
            </label>
          </div>
        </div>
        <div class="row memo-row">
          <div class="label">메모</div>
          <textarea
            name="메모"
            id="memo"
            placeholder="메모를 입력하세요"
            class="memo-field"
            v-model="newTransaction.memo"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="category-section">
      <div class="label">카테고리</div>
      <div class="icon-container">
        <AccountIconGroup
          :icons="icons"
          @categoryId="categoryId"
          v-model="newTransaction.categoryId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import AccountIconGroup from './accountAssets/AccountIconGroup.vue'
import accountFormIcon from '/db.json'
import { useUserStore } from '@/stores/userStore'
import db from '/db.json'
import axios from 'axios'
import { useRouter } from 'vue-router'

const state = reactive({ isExpense: true })
const userStore = useUserStore()
const BASEurlT = 'http://localhost:3000/transactions'
const BASEurlS = 'http://localhost:3000/summary'
const tempDate = ref('')
const router = useRouter()

const newTransaction = reactive({
  categoryId: '',
  memo: '',
  paymentMethod: '',
  amount: '',
  vendor: '',
  transactionType: '',
  createdAt: '',
  updatedAt: '',
  userId: userStore.id,
})

const handleAmountInput = (e) => {
  const digitsOnly = e.target.value.replace(/[^0-9]/g, '')
  newTransaction.amount = digitsOnly ? parseInt(digitsOnly, 10) : ''
}

const blockNonNumeric = (e) => {
  const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab']
  const isNumberKey = /^[0-9]$/.test(e.key)
  const isAllowed = allowed.includes(e.key)

  if (!isNumberKey && !isAllowed) {
    e.preventDefault()
  }
}

const validateForm = () => {
  if (!tempDate.value || !/^\d{4}-\d{2}-\d{2}$/.test(tempDate.value)) {
    alert('날짜를 정확히 입력해주세요. (예: 2025-04-01)')
    return false
  }

  const amount = Number(newTransaction.amount)
  if (!amount || isNaN(amount) || amount <= 0) {
    alert('올바른 금액을 입력해주세요.')
    return false
  }

  if (!newTransaction.vendor.trim()) {
    alert('사용처를 입력해주세요.')
    return false
  }

  if (!newTransaction.paymentMethod) {
    alert('결제수단을 선택해주세요.')
    return false
  }

  if (!newTransaction.transactionType) {
    alert('지출/수입을 선택해주세요.')
    return false
  }

  if (!newTransaction.categoryId) {
    alert('카테고리를 선택해주세요.')
    return false
  }

  return true
}

const submitForm = async () => {
  if (!validateForm()) return

  const date = new Date(tempDate.value)
  newTransaction.createdAt = date
  newTransaction.updatedAt = date

  const duration = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')

  await axios.post(BASEurlT, { ...newTransaction })

  updateSum(duration)
  router.push('/home')
}

const updateSum = async (duration) => {
  const target = db.summary.find(
    (item) =>
      item.duration === duration &&
      item.userId === newTransaction.userId &&
      item.categoryId === newTransaction.categoryId,
  )

  if (!target) {
    console.error('해당 summary 항목을 찾을 수 없습니다.')
    return
  }

  await axios.patch(`${BASEurlS}/${target.id}`, {
    sumAmount: Number(target.sumAmount) + Number(newTransaction.amount),
    updatedAt: newTransaction.updatedAt,
  })

  router.push('/home')
}

const icons = computed(() =>
  state.isExpense ? accountFormIcon.category[0].expense : accountFormIcon.category[0].income,
)

const changeCategoryExpense = () => {
  state.isExpense = true
}

const changeCategoryIncome = () => {
  state.isExpense = false
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.account-form {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.col {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  min-width: 80px;
}

.input-field {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  min-width: 150px;
  max-width: 300px;
}

.radio-group {
  display: flex;
  gap: 10px;
}

.submit input[type='radio'] {
  display: none;
}

.submit input[type='radio'] + span {
  display: inline-block;
  font-weight: bold;
  border-radius: 5px;
  padding: 6px 12px;
  border: 1px solid #dfdfdf;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
}

.submit input[type='radio']:checked + span {
  background-color: #ece3ff;
  color: #5227cc;
}

.memo-row {
  width: 100%;
}

.memo-field {
  width: 100%;
  height: 80px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  resize: vertical;
}

.category-section {
  width: 100%;
  margin: 20px 0;
}

.icon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.submit-section {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button {
  background-color: #7c4ce8;
  color: #ffffff;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #6a3fc5;
}

.amount-field {
  display: flex;
  align-items: center;
  gap: 5px;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>