[AccountHeader]

<template>
  <div class="account-header px-4">
    <h5 class="fw-bold">가계부 내역</h5>
    <button class="btn" @click="goToAccountEditPage">가계부 작성</button>
  </div>
</template>

<script setup></script>

<style scoped>
.account-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn,
.btn:active {
  background-color: var(--color-purple-400);
  color: white;
}
</style>
