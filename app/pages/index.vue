<template>
  <div class="d-flex justify-content-center align-items-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading POS...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: [
    () => navigateTo('/pos')
  ]
})

// Also trigger client-side navigation as fallback
onMounted(() => {
  navigateTo('/pos')
})
</script>
