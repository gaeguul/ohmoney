<template>
  <div class="analysis-category container-fluid">
    <h2 class="fw-bold mb-5">카테고리 별 분석</h2>
    <div id="body">
      <div id="figure">
        <CategoryGroup :summary="findById(id)" :category="db.category[0]" />
      </div>
    </div>
  </div>
</template>
<script setup>
import CategoryGroup from './CategoryGroup.vue'
import db from '/db.json'

const id = '7471'

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
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
header h1 {
  font-weight: bold;
  width: 300px;
  margin: 0;
  padding: auto;
}
#body {
  width: 100%;
  display: flex;
  align-content: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
