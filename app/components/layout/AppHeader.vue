<template>
  <header class="app-header px-4 py-2 d-flex justify-content-between align-items-center">
    <!-- Left: Store Brand & Current View Title -->
    <div class="d-flex align-items-center gap-3">
      <div class="page-icon-wrapper rounded-3 d-flex align-items-center justify-content-center">
        <span class="fs-5">{{ pageIcon }}</span>
      </div>
      <div>
        <div class="d-flex align-items-center gap-2">
          <h5 class="mb-0 fw-bold text-dark tracking-tight">{{ pageTitle }}</h5>
          <span class="badge bg-light text-muted border border-slate-200 small" style="font-size: 0.7rem;">
            Register #01
          </span>
        </div>
        <div class="text-muted small" style="font-size: 0.72rem;">
          {{ pageSubtitle }}
        </div>
      </div>
    </div>

    <!-- Right: Status, Live Clock & Logout Action -->
    <div class="d-flex align-items-center gap-3">
      <!-- System Status Pill -->
      <div class="d-none d-md-flex align-items-center gap-2 px-2 py-1 rounded-pill bg-emerald-50 text-emerald-700 border border-emerald-200 small fw-semibold" style="font-size: 0.75rem; background-color: #ecfdf5; border-color: #a7f3d0; color: #047857;">
        <span class="live-dot"></span>
        <span>POS Online</span>
      </div>

      <!-- Live Clock & Date -->
      <div class="d-flex align-items-center gap-2 text-secondary small fw-medium px-2 py-1 bg-light rounded-pill border">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span class="font-monospace fw-semibold text-dark">{{ currentDateTime }}</span>
      </div>

      <!-- Modern Red Logout Button -->
      <button
        type="button"
        class="btn btn-sm btn-logout d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
        @click="logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  if (route.path.includes('/reports')) return 'Sales Reports'
  if (route.path.includes('/products')) return 'Product Inventory'
  if (route.path.includes('/users')) return 'User Management'
  if (route.path.includes('/settings')) return 'System Settings'
  return 'Point of Sale'
})

const pageSubtitle = computed(() => {
  if (route.path.includes('/dashboard')) return 'Real-time sales analytics and inventory summary'
  if (route.path.includes('/sale')) return 'View, inspect and reprint past transactions'
  if (route.path.includes('/reports')) return 'Generate revenue performance and cashier summaries'
  if (route.path.includes('/products')) return 'Manage SKU pricing, categories, and stock alerts'
  if (route.path.includes('/users')) return 'Cashier permissions and staff credentials'
  if (route.path.includes('/settings')) return 'Tax rate, receipt template and store preferences'
  return 'Active register checkout & barcode scan'
})

const pageIcon = computed(() => {
  if (route.path.includes('/dashboard')) return '📊'
  if (route.path.includes('/sale')) return '🧾'
  if (route.path.includes('/reports')) return '📈'
  if (route.path.includes('/products')) return '📦'
  if (route.path.includes('/users')) return '👥'
  if (route.path.includes('/settings')) return '⚙️'
  return '🏪'
})
</script>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  position: sticky;
  top: 0;
  z-index: 20;
}

.page-icon-wrapper {
  width: 38px;
  height: 38px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.btn-logout {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
  font-weight: 600;
  transition: all 0.15s ease;
}

.btn-logout:hover {
  background-color: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
  transform: translateY(-1px);
}
</style>