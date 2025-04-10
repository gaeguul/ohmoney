<template>
  <div class="account-form">
    <header>
      <h3>가계부 작성</h3>
      <div class="submit-section">
        <input type="submit" value="작성 완료" class="submit-button" @click="submit" />
      </div>
    </header>

    <div class="container">
      <div class="col">
        <div class="row">
          <div class="label">날짜</div>
          <input type="date" class="input-field" v-model="tempDate" />
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
              inputmode="numeric"
              autocomplete="off"
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
                name="paymentMethod"
                id="카드"
                value="카드"
                v-model="newTransaction.paymentMethod"
              />
              <span>카드</span>
            </label>
            <label class="submit">
              <input
                type="radio"
                name="paymentMethod"
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
import { computed, reactive } from 'vue'
import AccountIconGroup from './accountAssets/AccountIconGroup.vue'
import accountFormIcon from '/db.json'
import { useRoute } from 'vue-router'
const props = defineProps({
  submitForm: {
    type: Function,
    required: true,
  },
  updateSummary: {
    type: Function,
    required: true,
  },
  originTransaction: {
    type: Object,
    required: false,
  },
})
const route = useRoute()
const categoryId = route.params.id
const tempDate = defineModel('tempDate')
const newTransaction = defineModel('newTransaction')
const state = reactive({ isExpense: true })

const submit = () => {
  if (!validateForm()) return
  props.submitForm()
}

const formattedAmount = computed(() => {
  const num = Number(newTransaction.value.amount)
  return isNaN(num) ? '' : num.toLocaleString()
})

const handleAmountInput = (e) => {
  // 한글 및 자모 범위를 포함한 필터
  const onlyDigits = e.target.value.replace(/[^\d]/g, '') // 숫자 외 제거
  newTransaction.value.amount = onlyDigits
  e.target.value = Number(onlyDigits).toLocaleString()
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
  // 금액 확인
  const amount = Number(newTransaction.value.amount)
  if (!amount || isNaN(amount) || amount <= 0) {
    alert('올바른 금액을 입력해주세요.')
    return false
  }

  // 필수 항목 확인
  if (!newTransaction.value.vendor.trim()) {
    alert('사용처를 입력해주세요.')
    return false
  }

  if (!newTransaction.value.paymentMethod) {
    alert('결제수단을 선택해주세요.')
    return false
  }

  if (!newTransaction.value.transactionType) {
    alert('지출/수입을 선택해주세요.')
    return false
  }

  if (!newTransaction.value.categoryId) {
    alert('카테고리를 선택해주세요.')
    return false
  }

  return true
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

.input-field {
  ime-mode: disabled; /* IME 입력기 비활성화 */
}
</style>
