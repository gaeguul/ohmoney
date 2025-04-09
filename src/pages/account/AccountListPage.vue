<template>
  <div class="account-list">
    <!-- 가계부 내역 헤더 -->
    <AccountHeader></AccountHeader>
    <!-- 필터 -->
    <AccountFilter></AccountFilter>
    <!-- 상세 내역 테이블 -->
    <AccountDetailTable></AccountDetailTable>
  </div>
</template>
<script setup>
import AccountHeader from '@/components/accounts/AccountHeader.vue'
import AccountFilter from '@/components/accounts/AccountFilter.vue'
import AccountDetailTable from '@/components/accounts/AccountDetailTable.vue'
</script>
<style scoped>
.account-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
