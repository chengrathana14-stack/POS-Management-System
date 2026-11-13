<template>
  <aside class="pos-sidebar d-flex flex-column text-white" style="width: 230px; min-height: 100vh; background-color: #0b1e36;">
    <!-- Logo Brand Header -->
    <div class="p-3 d-flex align-items-center gap-2 border-bottom border-secondary border-opacity-25">
      <div class="brand-icon d-flex align-items-center justify-content-center text-white rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      </div>
      <span class="fs-4 fw-bolder tracking-wide text-white">POS</span>
    </div>

    <!-- Navigation Menu Items -->
    <ul class="nav flex-column p-2 gap-1 mb-auto mt-2">
      <li class="nav-item">
        <NuxtLink to="/dashboard" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </span>
          <span>Dashboard</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/pos" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </span>
          <span>Point of Sale</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/sale" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </span>
          <span>Sales History</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/reports" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </span>
          <span>Reports</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/products" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </span>
          <span>Products</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/users" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </span>
          <span>Users</span>
        </NuxtLink>
      </li>

      <li class="nav-item">
        <NuxtLink to="/settings" class="nav-link-custom d-flex align-items-center gap-3 px-3 py-2" active-class="active">
          <span class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </span>
          <span>Settings</span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Bottom User Profile Area -->
    <div class="p-3 border-top border-secondary border-opacity-25 mt-auto">
      <div class="d-flex align-items-center gap-2">
        <div class="avatar-circle rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style="width: 38px; height: 38px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div class="user-info flex-grow-1" style="min-width: 0;">
          <div class="fw-bold text-white small text-truncate">{{ currentUser?.name || 'Rathana' }}</div>
          <div class="text-white-50 small d-flex align-items-center gap-1" style="font-size: 0.75rem;">
            <span>{{ currentUser?.role ? (currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)) : 'Cashier' }}</span>
            <span>▾</span>
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
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.brand-icon {
  background-color: transparent;
}

.nav-link-custom {
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link-custom:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
}

.nav-link-custom.active {
  background-color: #1877f2;
  color: #ffffff;
  font-weight: 600;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}
</style>
