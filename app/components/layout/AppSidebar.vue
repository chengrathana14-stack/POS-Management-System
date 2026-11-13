<template>
  <aside class="pos-sidebar d-flex flex-column text-white" style="width: 240px; min-height: 100vh; background: #090e1a; border-right: 1px solid rgba(255, 255, 255, 0.08);">
    <!-- Logo Brand Header -->
    <div class="px-4 py-3 d-flex align-items-center gap-3 border-bottom border-white border-opacity-10">
      <div class="brand-badge d-flex align-items-center justify-content-center text-white shadow-glow-blue">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      </div>
      <div>
        <div class="d-flex align-items-center gap-2">
          <span class="fs-4 fw-bolder tracking-wide text-white">POS</span>
          <span class="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25" style="font-size: 0.65rem; padding: 2px 6px;">
            V1.0
          </span>
        </div>
        <div class="text-white-50 small" style="font-size: 0.7rem; letter-spacing: 0.02em;">Store Management</div>
      </div>
    </div>

    <!-- Navigation Menu Items -->
    <ul class="nav flex-column px-3 gap-1 mb-auto mt-3">
      <li class="nav-item">
        <NuxtLink to="/dashboard" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span>Dashboard</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/pos" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </span>
            <span>Point of Sale</span>
          </div>
          <span class="shortcut-pill small">F1</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/sale" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <span>Sales History</span>
          </div>
          <span class="shortcut-pill small">F2</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/reports" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </span>
            <span>Reports</span>
          </div>
        </NuxtLink>
      </li>

      <div class="sidebar-divider my-2"></div>

      <li class="nav-item">
        <NuxtLink to="/products" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </span>
            <span>Products</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/users" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <span>Users</span>
          </div>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/settings" class="nav-link-custom d-flex align-items-center justify-content-between px-3 py-2 rounded-3" active-class="active">
          <div class="d-flex align-items-center gap-3">
            <span class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <span>Settings</span>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <!-- Bottom User Profile Area with Quick Switcher -->
    <div class="p-3 border-top border-white border-opacity-10 mt-auto">
      <div class="user-card p-2 rounded-3 d-flex align-items-center gap-3">
        <div class="position-relative">
          <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
            {{ (currentUser?.name || 'R').charAt(0) }}
          </div>
          <!-- Online status dot -->
          <span class="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle" style="width: 10px; height: 10px;"></span>
        </div>
        
        <div class="user-info flex-grow-1" style="min-width: 0;">
          <div class="fw-bold text-white small text-truncate">{{ currentUser?.name || 'Rathana' }}</div>
          <div class="text-white-50 d-flex align-items-center gap-1" style="font-size: 0.72rem;">
            <span class="text-capitalize">{{ currentUser?.role || 'Cashier' }}</span>
            <span class="text-success fw-bold">● Active</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { userAuth } from '~/composables/userAuth'

const { currentUser } = userAuth()
</script>

<style scoped>
.pos-sidebar {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.brand-badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0 8px;
}

.nav-link-custom {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link-custom:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(2px);
}

.nav-link-custom.active {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

.shortcut-pill {
  font-size: 0.65rem;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

.user-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.15s ease;
}

.user-card:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>