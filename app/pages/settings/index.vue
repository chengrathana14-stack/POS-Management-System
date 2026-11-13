<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">⚙️ Store & System Settings</h5>
        <div class="text-muted small">
          Single shop parameters, currency symbol, default tax/discount rates, and receipt headers
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Left Column: Form -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 p-4 bg-white rounded-4">
          <h6 class="fw-bold mb-3 border-bottom pb-2 text-dark">Store Configuration</h6>

          <div class="mb-3">
            <label class="form-label fw-semibold small text-secondary">Store Display Name</label>
            <input type="text" class="form-control rounded-3" v-model="settings.storeName" />
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Phone / Contact</label>
              <input type="text" class="form-control rounded-3" v-model="settings.phone" />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Currency (MVP Scope)</label>
              <input type="text" class="form-control bg-light rounded-3 font-monospace" v-model="settings.currency" disabled />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Default VAT / Tax Rate (%)</label>
              <div class="input-group">
                <input type="number" min="0" max="100" class="form-control rounded-start-3 font-monospace" v-model.number="settings.taxRate" />
                <span class="input-group-text rounded-end-3 bg-light">%</span>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Default Discount Rate (%)</label>
              <div class="input-group">
                <input type="number" min="0" max="100" class="form-control rounded-start-3 font-monospace" v-model.number="settings.discountRate" />
                <span class="input-group-text rounded-end-3 bg-light">%</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold small text-secondary">Store Address (Thermal Receipt Header)</label>
            <textarea class="form-control rounded-3" rows="2" v-model="settings.address"></textarea>
          </div>

          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-primary px-4 fw-bold shadow-glow-blue rounded-pill" @click="saveSettings">
              Save Settings
            </button>
            <span v-if="saveNotification" class="text-success small fw-bold">
              ✅ Settings updated successfully!
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: System Specs -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 p-4 bg-white rounded-4 h-100">
          <h6 class="fw-bold mb-3 text-dark">System Architecture Status</h6>
          <div class="d-flex flex-column gap-2 small">
            <div class="d-flex justify-content-between p-2 rounded-3 bg-light">
              <span class="text-muted">Nuxt Framework:</span>
              <span class="fw-bold text-primary font-monospace">v4.6.4</span>
            </div>
            <div class="d-flex justify-content-between p-2 rounded-3 bg-light">
              <span class="text-muted">UI Library:</span>
              <span class="fw-bold text-primary">Bootstrap 5.3 + Custom Tokens</span>
            </div>
            <div class="d-flex justify-content-between p-2 rounded-3 bg-light">
              <span class="text-muted">State Management:</span>
              <span class="fw-bold text-success">Reactive Composables</span>
            </div>
            <div class="d-flex justify-content-between p-2 rounded-3 bg-light">
              <span class="text-muted">Database Transaction:</span>
              <span class="fw-bold text-dark">Atomic Stock Logic</span>
            </div>
            <div class="d-flex justify-content-between p-2 rounded-3 bg-light">
              <span class="text-muted">Currency:</span>
              <span class="fw-bold text-dark font-monospace">Single ($ USD)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const settings = reactive({
  storeName: 'My Shop',
  phone: '(+855) 012-345-678',
  currency: 'USD ($)',
  taxRate: 8,
  discountRate: 10,
  address: '123 Monivong Blvd, Phnom Penh, Cambodia'
})

const saveNotification = ref(false)

const saveSettings = () => {
  saveNotification.value = true
  setTimeout(() => {
    saveNotification.value = false
  }, 3000)
}
</script>
