<template>
  <!-- 가계부 내역 헤더 -->
  <div class="header p-4">
    <h5 class="fw-bold">가계부 내역</h5>
    <button type="button" class="btn new-history-btn">가계부 작성</button>
  </div>
</template>

<script setup></script>

<style scoped></style>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.new-history-btn {
  background-color: var(--color-purple-400);
  color: white;
}
</style>
