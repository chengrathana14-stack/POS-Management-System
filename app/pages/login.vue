<template>
  <div class="login-wrapper min-vh-100 d-flex">
    <!-- Left Hero Brand Panel (Matching Top-Left Mockup) -->
    <div class="col-lg-6 d-none d-lg-flex flex-column align-items-center justify-content-center text-white position-relative hero-panel p-5">
      <div class="hero-overlay"></div>
      <div class="position-relative text-center z-1">
        <!-- Large Cart Icon -->
        <div class="cart-logo-circle mb-3 mx-auto d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>

        <h1 class="display-3 fw-bolder mb-1 tracking-wider text-white">POS</h1>
        <h4 class="fw-semibold mb-3 text-white-50">Management System</h4>
        <div class="text-white-50 small tracking-widest text-uppercase">
          Fast • Simple • Reliable
        </div>
      </div>
    </div>

    <!-- Right Login Form Panel -->
    <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-white p-4 p-md-5">
      <div class="login-card-container w-100" style="max-width: 380px;">
        <!-- Header -->
        <div class="text-start mb-4">
          <h3 class="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span>Welcome Back</span>
            <span>👋</span>
          </h3>
          <p class="text-muted small">Please login to continue</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <!-- Email / Username -->
          <div class="mb-3">
            <div class="input-group input-group-lg border rounded-3 overflow-hidden bg-light">
              <span class="input-group-text bg-transparent border-0 text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </span>
              <input
                type="text"
                class="form-control bg-transparent border-0 shadow-none ps-2 fs-6"
                placeholder="Email or Username"
                v-model="username"
                required
              />
            </div>
          </div>

          <!-- Password with toggle visibility eye -->
          <div class="mb-3">
            <div class="input-group input-group-lg border rounded-3 overflow-hidden bg-light">
              <span class="input-group-text bg-transparent border-0 text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control bg-transparent border-0 shadow-none ps-2 fs-6"
                placeholder="Password"
                v-model="password"
                required
              />
              <button
                type="button"
                class="btn bg-transparent border-0 text-muted pe-3 shadow-none"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="btn btn-primary w-100 py-2 fs-6 fw-bold rounded-3 mb-3 shadow-sm"
            style="background-color: #1877f2; border-color: #1877f2;"
          >
            Login
          </button>
        </form>

        <!-- Divider 'or' -->
        <div class="position-relative text-center my-3">
          <hr class="border-secondary border-opacity-25 my-0" />
          <span class="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
            or
          </span>
        </div>

        <!-- Quick Switch for Demo -->
        <div class="d-flex justify-content-center gap-2 mb-4">
          <button type="button" class="btn btn-xs btn-outline-secondary" @click="quickLogin('Rathana')">
            Demo Cashier
          </button>
          <button type="button" class="btn btn-xs btn-outline-secondary" @click="quickLogin('admin@pos.local')">
            Demo Admin
          </button>
        </div>

        <!-- Footer -->
        <div class="text-center text-muted small mt-auto" style="font-size: 0.76rem;">
          <div>Point of Sale (POS) Management System</div>
          <div class="text-muted">v1.0 • November 2026</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userAuth } from '~/composables/userAuth'

definePageMeta({
  layout: false // Custom full-screen split layout
})

const { login } = userAuth()

const username = ref('Rathana')
const password = ref('••••••••')
const showPassword = ref(false)

const handleLogin = () => {
  login(username.value)
  navigateTo('/pos')
}

const quickLogin = (user: string) => {
  username.value = user
  login(user)
  navigateTo('/pos')
}
</script>

<style scoped>
.hero-panel {
  background: linear-gradient(135deg, rgba(11, 30, 54, 0.88), rgba(15, 39, 74, 0.94)),
              url('/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(3px);
  background: rgba(10, 25, 47, 0.75);
}

.cart-logo-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.btn-xs {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
}
</style>
