<template>
  <div
    class="calendar-header-wrapper d-flex align-items-center justify-content-center gap-4 mb-3 flex-wrap"
  >
    <!-- 월 이동 버튼 -->
    <div class="d-flex align-items-center gap-4">
      <button class="btn btn-outline-primary" @click="prevMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <h3 class="mb-0">{{ month + 1 }}월</h3>
      <button class="btn btn-outline-primary" @click="nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <!-- 가계부 작성 버튼 -->
    <button class="btn writeBtn ms-auto" @click="handleClickWrite">가계부 작성하기</button>
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

/* 호버 시 배경 */
.writeBtn:hover {
  background-color: var(--color-purple-200);
}

/* 미디어쿼리: 760px 이하 → 버튼 아래로 */
@media (max-width: 760px) {
  .writeBtn {
    position: static;
    width: 100%;
    margin-top: 1rem;
  }

  .d-flex.justify-content-center.align-items-center.gap-4.mb-3.position-relative {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* 미디어쿼리: 640px 이하 → 버튼 다시 옆으로 */
@media (max-width: 640px) {
  .writeBtn {
    position: absolute;
    right: 0;
    width: auto;
    margin-top: 0;
  }

  .d-flex.justify-content-center.align-items-center.gap-4.mb-3.position-relative {
    flex-direction: row;
  }
}

/* 미디어쿼리: 505px 이하 → 버튼 아래로 */
@media (max-width: 505px) {
  .writeBtn {
    position: static;
    width: 100%;
    margin-top: 1rem;
  }

  .d-flex.justify-content-center.align-items-center.gap-4.mb-3.position-relative {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
