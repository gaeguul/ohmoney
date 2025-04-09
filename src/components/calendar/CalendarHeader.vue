<template>
  <div class="d-flex justify-content-center align-items-center gap-4 mb-3 position-relative">
    <div class="d-flex justify-content-center align-items-center gap-4">
      <button class="btn" @click="prevMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <h3>{{ month + 1 }}월</h3>
      <button class="btn" @click="nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <button class="btn position-absolute writeBtn" @click="handleClickWrite">
      가계부 작성하기
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// props로 값 받기
const props = defineProps({
  year: Number,
  month: Number,
})

// 부모에게 변경 통지
const emit = defineEmits(['update:year', 'update:month'])

const router = useRouter()

const handleClickWrite = () => {
  router.push('/accounts/new')
}

// 월 이동 메서드
const prevMonth = () => {
  if (props.month === 0) {
    emit('update:year', props.year - 1)
    emit('update:month', 11)
  } else {
    emit('update:month', props.month - 1)
  }
}

const nextMonth = () => {
  if (props.month === 11) {
    emit('update:year', props.year + 1)
    emit('update:month', 0)
  } else {
    emit('update:month', props.month + 1)
  }
}
</script>

<style scoped>
button {
  color: var(--color-purple-400);
  border: 1px solid var(--color-purple-400);
}

button:hover {
  background-color: var(--color-purple-400);
  color: white;
}

.writeBtn {
  right: 0;
  background-color: var(--color-purple-400);
  color: white;
}

.writeBtn:hover {
  background-color: var(--color-purple-200);
}
</style>
