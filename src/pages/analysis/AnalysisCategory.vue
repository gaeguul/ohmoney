<template>
  <div class="analysis-category container">
    <header><h1>카테고리 별 분석</h1></header>
    <div id="body">
      <div id="figure">
        <CategoryGroup :summary="findById(id)" :category="db.category[0]" />
      </div>
      <div id="chart"></div>
    </div>
  </div>
</template>
<script setup>
import CategoryGroup from './CategoryGroup.vue'
import db from '/db.json'

const id = '7471' // Example ID, replace with actual ID as needed
const findById = (id) => {
  const date = new Date()

  return db.summary
    .filter((category) => category.userId === id)
    .filter((category) => {
      const [year, month] = category.duration.split('-')
      return (
        parseInt(year) === date.getFullYear() && parseInt(month) === date.getMonth() + 1 // getMonth()는 0-based!
      )
    })
  // return db.summary.filter((category) => category.userId === id)
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header h1 {
  font-weight: bold;
  width: 300px;
  margin: 0;
  padding: auto;
}
#body {
  display: flex;
  align-content: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
