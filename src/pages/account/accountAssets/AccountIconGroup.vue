<template>
  <AccountIcon :icons="props.icons" v-model="modelValue" class="icons" />
</template>

<script setup>
import AccountIcon from './AccountIcon.vue'

const props = defineProps({
  icons: { type: Array, required: true },
})

// v-model 지원
const modelValue = defineModel()
</script>

<style scoped>
.icons {
  width: 40px;
}
</style>
