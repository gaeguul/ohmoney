<template>
  <span v-for="item in props.icons" :key="item.name">
    <label class="submit">
      <input type="radio" name="cash" id="cash" />
      <i :class="item.icon" class="custom-icon-color"></i>
      <div>{{ item.name }}</div>
    </label>
  </span>
</template>

<script setup>
const props = defineProps({
  icons: { type: Array, required: true },
})
</script>

<style scoped>
.submit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit input[type='radio'] {
  opacity: 0;
}

.submit input[type='radio'] + i {
  margin-bottom: 5px;
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
  color: rgb(163, 159, 159);
}
span {
  width: 60px;
}
</style>
