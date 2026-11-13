<template>
  <div class="card shadow-sm border-0 h-100">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="text-muted text-uppercase fw-semibold" style="font-size: 0.75rem; letter-spacing: 0.05em;">
          {{ title }}
        </span>
        <span class="fs-4">{{ icon }}</span>
      </div>
      <div class="fs-3 fw-bold text-dark">{{ value }}</div>
      <div v-if="subtext" class="text-muted small mt-1">
        {{ subtext }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
  subtext?: string
}>()
</script>

