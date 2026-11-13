<template>
  <button
    :type="type || 'button'"
    class="btn d-inline-flex align-items-center justify-content-center gap-1"
    :class="[
      variant ? `btn-${variant}` : 'btn-primary',
      size ? `btn-${size}` : '',
      { 'disabled opacity-50': loading || disabled }
    ]"
    :disabled="loading || disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-danger'
  size?: 'sm' | 'lg'
  disabled?: boolean
  loading?: boolean
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

