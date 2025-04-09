<template>
  <div class="container mt-4">
    <!-- 캘린더 헤더 -->
    <CalendarHeader v-model:year="year" v-model:month="month" />

    <!-- 캘린더 테이블 -->
    <div class="d-flex gap-4 justify-content-center align-items-center mt-4">
      <CalendarTable :year="year" :month="month" />
      <DailyAccount />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarTable from './CalendarTable.vue'
import DailyAccount from './DailyAccount.vue'

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())
</script>

<style scoped></style>
