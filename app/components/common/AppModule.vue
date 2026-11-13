<template>
  <div v-if="isOpen" class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
    <div class="card shadow-lg border-0" :style="{ width: '100%', maxWidth: maxWidth || '500px', borderRadius: '12px' }">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
        <h5 class="mb-0 fw-bold">{{ title }}</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
      </div>
      <div class="card-body p-4">
        <slot />
      </div>
      <div v-if="$slots.footer" class="card-footer bg-light p-3 border-top">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  maxWidth?: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
  backdrop-filter: blur(2px);
}
</style>

