<template>
  <div class="account-form">
    <AccountForm
      v-model:newTransaction="newTransaction"
      :originTransaction="originTransaction"
      v-model:tempDate="tempDate"
      v-model:isExpense="state.isExpense"
      :submitForm="submitForm"
      :updateSum="updateSum"
    />
  </div>
</template>

<script setup>
import AccountForm from '@/components/accounts/AccountForm.vue'
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const BASEurlT = '/api/transactions'
const BASEurlS = '/api/summary'
const tempDate = ref('')
const router = useRouter()
const route = useRoute()
const categoryId = route.params.id
const state = reactive({ isExpense: true })

const newTransaction = reactive({
  date: '',
  amount: '',
  categoryId: '',
  memo: '',
  paymentMethod: '',
  transactionType: '',
  createdAt: '',
  updatedAt: '',
  userId: '',
})

const originTransaction = reactive({
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

const fetchTransaction = async (categoryId) => {
  const res = await axios.get(`${BASEurlT}/${categoryId}`)
  Object.assign(originTransaction, res.data)
  Object.assign(newTransaction, JSON.parse(JSON.stringify(originTransaction)))
  newTransaction.amount = Number(newTransaction.amount)

  const transactionDate = new Date(newTransaction.createdAt)
  tempDate.value =
    transactionDate.getFullYear() +
    '-' +
    String(transactionDate.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(transactionDate.getDate()).padStart(2, '0')

  if (originTransaction.transactionType === 'expense') {
    state.isExpense = true
  } else {
    state.isExpense = false
  }
}

onMounted(() => {
  if (categoryId) {
    fetchTransaction(categoryId)
  }
})

const submitForm = async () => {
  const date = new Date(tempDate.value)
  newTransaction.createdAt = date
  newTransaction.updatedAt = new Date()

  console.log(originTransaction)
  console.log(newTransaction)

  if (Number(originTransaction.amount) !== Number(newTransaction.amount)) {
    updateSum(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0'))
  }
  await axios.patch(`${BASEurlT}/${categoryId}`, {
    ...newTransaction,
    amount: Number(newTransaction.amount),
  })

  router.push('/accounts')
}

const updateSum = async (duration) => {
  const summaryData = await axios.get(`${BASEurlS}`)
  const target = summaryData.data.find(
    (item) =>
      item.duration === duration &&
      item.userId === newTransaction.userId &&
      item.categoryId === newTransaction.categoryId,
  )

  console.log('Summary created:', target)
  if (!target) {
    console.error('해당 summary 항목을 찾을 수 없습니다.')
    return
  }

  await axios.patch(`${BASEurlS}/${target.id}`, {
    sumAmount:
      Number(target.sumAmount) - Number(originTransaction.amount) + Number(newTransaction.amount),
    updatedAt: newTransaction.updatedAt,
  })
}
</script>
