<template>
  <AccountIcon :icons="props.icons" class="icons" />
</template>
<script setup>
import AccountIcon from './AccountIcon.vue'

const props = defineProps({
  icons: { type: Array, required: true },
})
</script>

<style scoped>
.icons {
  width: 40px;
}
</style>
