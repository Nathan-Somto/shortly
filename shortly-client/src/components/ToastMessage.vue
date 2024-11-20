<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

const {
  beFixed = true,
  show,
  message,
  variant = 'error',
} = defineProps<{
  message: string
  show: boolean
  beFixed?: boolean
  variant?: 'success' | 'error' | 'info'
}>()
const close = ref(true)
watch(
  () => show,
  (val) => {
    if (val) {
      console.log('show')
      close.value = false
    }
  },
  { immediate: true },
)
// handle close button click
const handleClose = () => {
  console.log('close')
  close.value = true
}
</script>
<template>
  <template v-if="show && !close">
    <div :class="`toast-message ${!beFixed ? 'no-fixed' : ''} ${variant}`">
      <button class="toast-x" @click="handleClose">X</button>
      <p>{{ message }}</p>
    </div>
  </template>
</template>
<style scoped>
.toast-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--brand-destructive);
  height: calc(8 * var(--base-size));
  font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  z-index: 10000;
  .toast-x {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 16px;
    z-index: 50;
    cursor: pointer;
  }
  p {
    color: #eee !important;
  }
  &.no-fixed {
    position: relative;
  }
  &.success {
    background-color: var(--brand-success);
  }
  &.info {
    background-color: var(--brand-info);
  }
}
</style>
