import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const selectedDate = ref(null)
  const accountList = ref([])
  const transactionList = reactive([])
  const isOpen = ref(false)

  // API에서 거래 내역을 가져오는 함수
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions')
      const userId = 'cd1d' // 현재 사용자 ID
      if (response.status === 200) {
        const filteredTransactions = response.data
          .filter((item) => item.userId === userId)
          .map((item) => ({
            ...item,
            date: formatDateToYMD(new Date(item.createdAt)), // createdAt을 YYYY-MM-DD로 변환
          }))
        transactionList.splice(0, transactionList.length, ...filteredTransactions)
      } else {
        console.error('데이터 조회 실패', response.statusText)
      }
    } catch (error) {
      console.error('API 요청 실패', error)
    }
  }

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  function formatDateToYMD(dateObj) {
    const tzOffset = dateObj.getTimezoneOffset() * 60000
    const localTime = new Date(dateObj.getTime() - tzOffset)
    return localTime.toISOString().slice(0, 10) // YYYY-MM-DD 형식 반환
  }

  // 날짜 클릭 시 해당 날짜의 거래 내역을 가져오고, 이미 선택된 날짜라면 선택 해제
  function toggleDate(dateObj) {
    const dateStr = formatDateToYMD(dateObj)

    if (selectedDate.value === dateStr) {
      isOpen.value = false
      selectedDate.value = null
      accountList.value = []
      return
    }

    selectedDate.value = dateStr
    isOpen.value = true

    accountList.value = transactionList.filter((item) => item.date === dateStr)
  }

  return {
    selectedDate,
    accountList,
    isOpen,
    toggleDate,
    fetchTransactions,
    transactionList,
  }
})
