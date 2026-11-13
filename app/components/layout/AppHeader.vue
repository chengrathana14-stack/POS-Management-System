<template>
  <header class="bg-white border-bottom px-4 py-2 d-flex justify-content-between align-items-center shadow-xs">
    <!-- Left: Page Title & Icon -->
    <div class="d-flex align-items-center gap-2">
      <span class="fs-5">{{ pageIcon }}</span>
      <h5 class="mb-0 fw-bold text-dark">{{ pageTitle }}</h5>
    </div>

    <!-- Right: Date/Time & Red Logout Button -->
    <div class="d-flex align-items-center gap-3">
      <!-- Live or Formatted Date/Time -->
      <div class="d-flex align-items-center gap-2 text-dark small fw-medium">
        <span>📅</span>
        <span>{{ currentDateTime }}</span>
      </div>

      <!-- Red Logout Button -->
      <button
        type="button"
        class="btn btn-danger btn-sm px-3 py-1 d-flex align-items-center gap-1 rounded fw-semibold"
        style="background-color: #e04f4f; border-color: #e04f4f;"
        @click="logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { userAuth } from '~/composables/userAuth'

const route = useRoute()
const { logout } = userAuth()

const currentDateTime = ref('Nov 13, 2026 6:45 PM')

onMounted(() => {
  const updateTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }
    currentDateTime.value = now.toLocaleDateString('en-US', options).replace(',', '')
  }
  updateTime()
  const interval = setInterval(updateTime, 30000)
  onUnmounted(() => clearInterval(interval))
})

const pageTitle = computed(() => {
  if (route.path.includes('/dashboard')) return 'Dashboard'
  if (route.path.includes('/sale')) return 'Sales History'
  if (route.path.includes('/reports')) return 'Reports'
  if (route.path.includes('/products')) return 'Products'
  if (route.path.includes('/users')) return 'Users'
  if (route.path.includes('/settings')) return 'Settings'
  return 'My Shop'
})

const pageIcon = computed(() => {
  if (route.path.includes('/dashboard')) return '🏠'
  if (route.path.includes('/sale')) return '🏠'
  if (route.path.includes('/reports')) return '📊'
  if (route.path.includes('/products')) return '📦'
  if (route.path.includes('/users')) return '👥'
  if (route.path.includes('/settings')) return '⚙️'
  return '🏪'
})
</script>

<style scoped>
.shadow-xs {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
