<template>
  <AccountIcon :icons="props.icons" class="icons" @categoryId="handleCategoryId" />
</template>
<script setup>
import AccountIcon from './AccountIcon.vue'

const props = defineProps({
  icons: { type: Array, required: true },
})
const modelValue = defineModel()
const handleCategoryId = (e) => {
  modelValue.value = e
}
</script>

<style scoped>
.icons {
  width: 40px;
}
</style>
