import { computed, reactive, ref } from 'vue'
import accountFormIcon from '/db.json'
import { useUserStore } from '@/stores/userStore'
import db from '/db.json'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('filterStore', () => {
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

  const isValidDateFormat = (dateStr) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
  }

  const submitForm = async () => {
    if (!isValidDateFormat(tempDate.value)) {
      alert('날짜 형식이 올바르지 않습니다. (예: 2025-04-01)')
      return
    }

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

  return {
    state,
    userStore,
    BASEurlT,
    BASEurlS,
    tempDate,
    newTransaction,
    icons,
    changeCategoryExpense,
    changeCategoryIncome,
    submitForm,
    isValidDateFormat,
    updateSum,
  }
})
