import axios from 'axios'

// 날짜 포맷을 'YYYY-MM'으로 변환
const formatYearMonth = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export const getMonthlySpending = async (userId, year, month) => {
  const res = await axios.get(`/api/summary?userId=${userId}`)
  const data = res.data

  const thisMonth = `${year}-${String(month).padStart(2, '0')}`
  const lastMonthDate = new Date(year, month - 2) // JS month는 0-based
  const lastMonth = formatYearMonth(lastMonthDate)

  let thisMonthTotal = 0
  let lastMonthTotal = 0
  const dailyExpenses = {}

  data.forEach((item) => {
    if (item.userId !== userId) return

    // 이번 달 총합 & 일별 지출
    if (item.duration === thisMonth) {
      thisMonthTotal += item.sumAmount

      const day = new Date(item.createdAt).getUTCDate()
      const key = String(day).padStart(2, '0')

      if (!dailyExpenses[key]) {
        dailyExpenses[key] = 0
      }
      dailyExpenses[key] += item.sumAmount
    }

    // 지난 달 총합
    if (item.duration === lastMonth) {
      lastMonthTotal += item.sumAmount
    }
  })

  console.log({
    thisMonthTotal,
    lastMonthTotal,
    dailyExpenses,
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
