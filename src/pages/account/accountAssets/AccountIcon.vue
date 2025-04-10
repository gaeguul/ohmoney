<template>
  <span v-for="item in props.icons" :key="item.name">
    <label class="submit">
      <input
        type="radio"
        name="category"
        :value="item.categoryId"
        v-model="modelValue"
        class="hidden-radio"
      />
      <i :class="item.categoryIcon" class="custom-icon-color"></i>
      <div>{{ item.categoryName }}</div>
    </label>
  </span>
</template>

<script setup>
const props = defineProps({
  icons: { type: Array, required: true },
})
const modelValue = defineModel()
</script>

<style scoped>
.submit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hidden-radio {
  display: none;
}

.submit input[type='radio']:checked + i {
  color: #7c4ce8;
}

.submit div {
  width: 60px;
  font-size: x-small;
  text-align: center;
}

.custom-icon-color {
  font-size: xx-large;
  cursor: pointer;
  color: rgb(163, 159, 159);
}
span {
  width: 60px;
}
</style>
