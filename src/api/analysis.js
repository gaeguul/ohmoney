import axios from 'axios'

// 날짜 포맷을 'YYYY-MM'으로 변환
const formatYearMonth = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

// categoryId만 가져오는 함수
export const fetchCategoryIds = async () => {
  try {
    const res = await axios.get('/api/category') // 카테고리 API 호출
    const category = res.data?.[0] || { income: [], expense: [] }
    return {
      income: new Set(category.income.map((c) => c.categoryId)),
      expense: new Set(category.expense.map((c) => c.categoryId)),
    }
  } catch (error) {
    console.error('Failed to fetch expense categories:', error)
  }
}

export const getMonthlySpending = async (userId, year, month) => {
  const res = await axios.get(`/api/summary?userId=${userId}`)
  const data = res.data

  const categoryIds = await fetchCategoryIds()

  const thisMonth = `${year}-${String(month).padStart(2, '0')}`
  const lastMonthDate = new Date(year, month - 2) // JS month는 0-based
  const lastMonth = formatYearMonth(lastMonthDate)

  let thisMonthTotal = 0
  let lastMonthTotal = 0
  const dailyExpenses = {}

  data.forEach((item) => {
    if (item.userId !== userId) return

    const isIncome = categoryIds.income.has(item.categoryId)
    const isExpense = categoryIds.expense.has(item.categoryId)
    const signedAmount = isIncome ? item.sumAmount : isExpense ? -item.sumAmount : 0

    // 이번 달 총합 & 일별 지출
    if (item.duration === thisMonth) {
      thisMonthTotal += signedAmount

      const day = new Date(item.createdAt).getUTCDate()
      const key = String(day).padStart(2, '0')

      if (!dailyExpenses[key]) {
        dailyExpenses[key] = 0
      }
      dailyExpenses[key] += signedAmount
    }

    // 지난 달 총합
    if (item.duration === lastMonth) {
      lastMonthTotal += signedAmount
    }
  })

  return {
    thisMonthTotal,
    lastMonthTotal,
    dailyExpenses,
  }
}

export const getThreeMonthsAnalysis = async () => {}

export const getIncomeExpense = async () => {}

export const getWeeklyAnalysis = async () => {}
