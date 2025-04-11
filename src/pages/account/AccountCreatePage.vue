<template>
  <div class="account-form">
    <AccountForm
      v-model:newTransaction="newTransaction"
      v-model:tempDate="tempDate"
      v-model:isExpense="state.isExpense"
      :submitForm="submitForm"
      :updateSum="updateSum"
    />
  </div>
</template>

<script setup>
import AccountForm from '@/components/accounts/AccountForm.vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import db from '/db.json'
import axios from 'axios'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const BASEurlT = '/api/transactions'
const BASEurlS = '/api/localhost:3000/summary'
const tempDate = ref('')
const router = useRouter()
const state = reactive({ isExpense: true })

const newTransaction = reactive({
  categoryId: '',
  memo: '',
  paymentMethod: '',
  amount: '',
  vendor: '',
  transactionType: 'expense',
  createdAt: '',
  updatedAt: '',
  userId: userStore.id,
})

const submitForm = async () => {
  const date = new Date(tempDate.value)
  newTransaction.createdAt = date
  newTransaction.updatedAt = date

  const duration = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')
  await axios.post(`${BASEurlT}`, { ...newTransaction, amount: Number(newTransaction.amount) })
  console.log('Transaction updated:', newTransaction)
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
    const tempSummary = reactive({
      duration,
      userId: newTransaction.userId,
      categoryId: newTransaction.categoryId,
      sumAmount: Number(newTransaction.amount),
      createdAt: newTransaction.createdAt,
      updatedAt: newTransaction.updatedAt,
    })
    await axios.post(`${BASEurlS}`, tempSummary)
  } else {
    await axios.patch(`${BASEurlS}/${target.id}`, {
      sumAmount: Number(target.sumAmount) + Number(newTransaction.amount),
      updatedAt: newTransaction.updatedAt,
    })
  }

  router.push('/accounts')
}
</script>
