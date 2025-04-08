// stores/useCalendarStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const selectedDate = ref(null)
  const accountList = ref([])
  const isOpen = ref(false)

  // 목업 데이터
  const allData = ref([
    {
      useId: '1',
      userId: 'aaa',
      date: '2025-04-08',
      category: 10,
      amount: 9000,
      memo: '마스크팩 구입',
      payment_method: '카드',
      vendor: '올리브영',
      type: 'expense',
    },
    {
      useId: '2',
      userId: 'aaa',
      date: '2025-04-08',
      category: 22,
      amount: 30000,
      memo: '용돈',
      payment_method: '현금',
      vendor: '엄마',
      type: 'income',
    },
    {
      useId: '3',
      userId: 'aaa',
      date: '2025-04-09',
      category: 1,
      amount: 15000,
      memo: '편의점',
      payment_method: '카드',
      vendor: 'GS25',
      type: 'expense',
    },
    {
      useId: '4',
      userId: 'aaa',
      date: '2025-04-08',
      category: 5,
      amount: 12000,
      memo: '점심 식사',
      payment_method: '카드',
      vendor: '식당',
      type: 'expense',
    },
    {
      useId: '5',
      userId: 'aaa',
      date: '2025-04-08',
      category: 15,
      amount: 5000,
      memo: '커피',
      payment_method: '현금',
      vendor: '스타벅스',
      type: 'expense',
    },
    {
      useId: '6',
      userId: 'aaa',
      date: '2025-04-08',
      category: 21,
      amount: 20000,
      memo: '보너스',
      payment_method: '계좌이체',
      vendor: '회사',
      type: 'income',
    },
    {
      useId: '7',
      userId: 'aaa',
      date: '2025-04-09',
      category: 8,
      amount: 8000,
      memo: '택시비',
      payment_method: '카드',
      vendor: '택시',
      type: 'expense',
    },
    {
      useId: '8',
      userId: 'aaa',
      date: '2025-04-09',
      category: 22,
      amount: 10000,
      memo: '용돈',
      payment_method: '현금',
      vendor: '아빠',
      type: 'income',
    },
    {
      useId: '9',
      userId: 'aaa',
      date: '2025-04-09',
      category: 3,
      amount: 25000,
      memo: '저녁 식사',
      payment_method: '카드',
      vendor: '레스토랑',
      type: 'expense',
    },
    {
      useId: '10',
      userId: 'aaa',
      date: '2025-04-08',
      category: 18,
      amount: 15000,
      memo: '책 구입',
      payment_method: '카드',
      vendor: '교보문고',
      type: 'expense',
    },
  ])

  function formatDateToYMD(dateObj) {
    const tzOffset = dateObj.getTimezoneOffset() * 60000
    const localTime = new Date(dateObj.getTime() - tzOffset)
    return localTime.toISOString().slice(0, 10)
  }

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

    accountList.value = allData.value.filter((item) => item.date === dateStr)
  }

  return {
    selectedDate,
    accountList,
    allData,
    isOpen,
    toggleDate,
  }
})
