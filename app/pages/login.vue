<template>
  <div class="login-wrapper min-vh-100 d-flex">
    <!-- Left Hero Image Banner -->
    <div class="login-hero d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden" style="flex: 1.1;">
      <!-- Hero Background Image with Blur Overlay -->
      <div class="hero-bg-overlay position-absolute inset-0"></div>

      <!-- Top Brand -->
      <div class="position-relative z-2 d-flex align-items-center gap-3">
        <div class="brand-cart-box shadow-glow-blue d-flex align-items-center justify-content-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>
        <div>
          <span class="fs-4 fw-bolder tracking-wide text-white d-block">POS SYSTEM</span>
          <span class="text-white-50 small" style="font-size: 0.75rem;">Enterprise Retail Platform</span>
        </div>
      </div>

      <!-- Center Hero Branding -->
      <div class="position-relative z-2 my-auto py-5">
        <div class="display-5 fw-bolder mb-3 text-white tracking-tight">
          Point of Sale<br />Management System
        </div>
        <p class="lead text-white-50 mb-4" style="max-width: 480px; font-size: 1.1rem;">
          Fast • Simple • Reliable. Designed for speed, precision inventory control, and seamless cashier workflows.
        </p>

        <!-- Feature Points -->
        <div class="d-flex flex-column gap-2 text-white-50 small">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary bg-opacity-25 text-primary rounded-circle p-1">✓</span>
            <span class="text-white">Sub-second barcode scan & instant checkout</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary bg-opacity-25 text-primary rounded-circle p-1">✓</span>
            <span class="text-white">Automated change calculator & thermal slips</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary bg-opacity-25 text-primary rounded-circle p-1">✓</span>
            <span class="text-white">Live inventory tracking with low-stock alerts</span>
          </div>
        </div>
      </div>

      <!-- Hero Footer -->
      <div class="position-relative z-2 text-white-50 small">
        Version 1.0 • Academic Capstone 2026
      </div>
    </div>

    <!-- Right Login Form Panel -->
    <div class="login-panel d-flex flex-column justify-content-center align-items-center p-4 p-md-5" style="flex: 0.9; background-color: #f8fafc;">
      <div class="login-card card shadow-xl border-0 p-4 p-md-5 bg-white rounded-4" style="max-width: 440px; width: 100%;">
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 text-primary mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 class="fw-bolder text-dark mb-1">Welcome Back 👋</h3>
          <p class="text-muted small mb-0">Please enter your credentials to login</p>
        </div>

        <!-- Error Feedback -->
        <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <!-- Email / Username Input -->
          <div class="mb-3">
            <label class="form-label small fw-semibold text-secondary">Email or Username</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input
                type="text"
                class="form-control border-start-0 ps-2"
                placeholder="e.g. rathana@pos.local"
                v-model="identifier"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label class="form-label small fw-semibold text-secondary mb-0">Password</label>
              <a href="javascript:void(0)" class="text-primary small text-decoration-none" @click="fillCashier">Forgot?</a>
            </div>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control border-start-0 border-end-0 ps-2"
                placeholder="••••••••"
                v-model="password"
                required
              />
              <button
                type="button"
                class="input-group-text bg-white border-start-0 text-muted pe-3"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- Remember me checkbox -->
          <div class="d-flex align-items-center mb-4">
            <input type="checkbox" id="remember" class="form-check-input me-2" checked />
            <label for="remember" class="form-check-label small text-muted">Keep me signed in</label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary btn-lg w-100 fw-bold shadow-glow-blue py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Login to Register</span>
          </button>
        </form>

        <!-- Demo Accounts Switcher -->
        <div class="text-center my-2">
          <div class="d-flex align-items-center gap-2 my-3 text-muted small">
            <div class="flex-grow-1 border-bottom"></div>
            <span>Quick Demo Switcher</span>
            <div class="flex-grow-1 border-bottom"></div>
          </div>

          <div class="d-flex flex-wrap gap-2 justify-content-center">
            <button
              type="button"
              class="btn btn-sm btn-light border d-flex align-items-center gap-1 rounded-pill px-3 py-1"
              @click="fillCashier"
            >
              <span>👤</span>
              <span class="small fw-semibold">Rathana (Cashier)</span>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-light border d-flex align-items-center gap-1 rounded-pill px-3 py-1"
              @click="fillAdmin"
            >
              <span>👑</span>
              <span class="small fw-semibold">Sarah (Admin)</span>
            </button>
          </div>
        </div>

        <div class="text-center mt-4 text-muted small" style="font-size: 0.72rem;">
          Point of Sale (POS) Management System<br />
          v1.0 • November 2026
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userAuth } from '~/composables/userAuth'

definePageMeta({
  layout: 'auth'
})

const { login } = userAuth()

const identifier = ref('rathana@pos.local')
const password = ref('password123')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const success = await login(identifier.value, password.value)
    if (success) {
      await navigateTo('/pos')
    } else {
      errorMessage.value = 'Invalid username/email or password.'
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Login failed.'
  } finally {
    isLoading.value = false
  }
}

const fillCashier = () => {
  identifier.value = 'rathana@pos.local'
  password.value = 'password123'
}

const fillAdmin = () => {
  identifier.value = 'admin@pos.local'
  password.value = 'admin123'
}
</script>

<style scoped>
.login-wrapper {
  background-color: #0b1329;
}

.login-hero {
  background-color: #0b1329;
}

.hero-bg-overlay {
  background: url('/images/login-bg.jpg') center/cover no-repeat;
  filter: brightness(0.35) contrast(1.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.brand-cart-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.login-card {
  box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8) !important;
}
</style>