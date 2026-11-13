<template>
  <div class="row g-3">
    <!-- Left Column: Sales Transactions Table -->
    <div class="col-lg-8">
      <div class="card shadow-sm border-0 rounded-3 bg-white h-100">
        <!-- Card Header with Filters -->
        <div class="card-header bg-white py-3 border-0 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div class="d-flex align-items-center gap-2">
            <h6 class="fw-bold text-dark mb-0">Sales Transactions</h6>
            <span class="badge bg-light text-muted border small">{{ filteredSales.length }} orders</span>
          </div>

          <div class="d-flex align-items-center gap-2">
            <!-- Search -->
            <div class="input-group input-group-sm" style="width: 190px;">
              <span class="input-group-text bg-light border-end-0">🔍</span>
              <input
                type="text"
                class="form-control form-control-sm border-start-0 bg-light"
                placeholder="Search receipt / cashier..."
                v-model="searchQuery"
              />
            </div>

            <!-- Date Filter -->
            <select class="form-select form-select-sm border-light bg-light fw-medium" style="width: 120px;" v-model="timeFilter">
              <option value="month">This Month</option>
              <option value="week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light small text-muted text-uppercase" style="border-top: 1px solid #f1f5f9;">
              <tr>
                <th scope="col" style="width: 40px;">#</th>
                <th scope="col">Receipt No</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Cashier</th>
                <th scope="col" class="text-end">Total</th>
                <th scope="col" class="text-center" style="width: 90px;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sale, idx) in filteredSales"
                :key="sale.id"
                :class="{ 'table-active': activeReceipt?.id === sale.id, 'opacity-75': sale.status === 'voided' }"
                style="cursor: pointer;"
                @click="activeReceipt = sale"
              >
                <td class="small text-muted">{{ idx + 1 }}</td>
                <td>
                  <div class="fw-bold font-monospace text-dark small d-flex align-items-center gap-1">
                    <span>{{ sale.receiptNo }}</span>
                    <span v-if="sale.status === 'voided'" class="badge bg-danger-subtle text-danger" style="font-size: 0.65rem;">VOID</span>
                  </div>
                </td>
                <td class="small text-muted">{{ formatSaleDate(sale.createdAt) }}</td>
                <td class="small fw-semibold text-dark">{{ sale.cashierName }}</td>
                <td class="text-end fw-bold small text-dark">{{ formatCurrency(sale.grandTotal) }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-sm text-white px-3 py-1 fw-semibold"
                    style="background-color: #1877f2; font-size: 0.75rem; border-radius: 6px;"
                    @click.stop="activeReceipt = sale"
                  >
                    View
                  </button>
                </td>
              </tr>

              <tr v-if="filteredSales.length === 0">
                <td colspan="6" class="text-center py-5 text-muted small">
                  No sales match your search query
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Column: Printable Receipt Slip (Matching Mockup Thermal Slip) -->
    <div class="col-lg-4">
      <div v-if="activeReceipt" class="card shadow-sm border-0 rounded-3 p-4 bg-white thermal-receipt position-relative">
        <!-- Print Button & Void Button -->
        <div class="d-flex justify-content-end gap-1 position-absolute top-0 end-0 m-3 d-print-none">
          <button
            v-if="activeReceipt.status === 'completed'"
            type="button"
            class="btn btn-sm btn-outline-danger px-2 py-1"
            style="font-size: 0.72rem;"
            @click="isVoidModalOpen = true"
          >
            Void
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary px-2 py-1 d-flex align-items-center gap-1"
            style="font-size: 0.72rem;"
            title="Print receipt"
            @click="printReceipt"
          >
            🖨️ Print
          </button>
        </div>

        <!-- Receipt Header -->
        <div class="text-center mb-3">
          <div class="mb-1 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1877f2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>
          <h5 class="fw-bolder mb-1 text-dark">My Shop</h5>
          <div class="text-muted small">Thank you for shopping!</div>
          <div v-if="activeReceipt.status === 'voided'" class="badge bg-danger my-1 py-1 px-3">
            *** VOIDED TRANSACTION ***
          </div>
        </div>

        <!-- Receipt Metadata -->
        <div class="receipt-meta small text-muted border-top border-bottom py-2 mb-3">
          <div class="d-flex justify-content-between mb-1">
            <span>Receipt No:</span>
            <span class="fw-bold text-dark font-monospace">{{ activeReceipt.receiptNo }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span>Date:</span>
            <span class="text-dark">{{ formatSaleDate(activeReceipt.createdAt) }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Cashier:</span>
            <span class="text-dark fw-semibold">{{ activeReceipt.cashierName }}</span>
          </div>
        </div>

        <!-- Items Table -->
        <div class="mb-3">
          <div
            v-for="item in activeReceipt.items"
            :key="item.id || item.productId"
            class="d-flex justify-content-between small mb-1"
          >
            <span class="text-dark fw-semibold">
              {{ item.productName }} <span v-if="item.quantity > 1" class="text-muted">x{{ item.quantity }}</span>
            </span>
            <span class="fw-bold text-dark">{{ formatCurrency(item.lineTotal) }}</span>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="border-top pt-2 small mb-3">
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Subtotal:</span>
            <span class="fw-bold text-dark">{{ formatCurrency(activeReceipt.subtotal) }}</span>
          </div>
          <div v-if="activeReceipt.discountTotal > 0" class="d-flex justify-content-between mb-1 text-success">
            <span>Discount ({{ activeReceipt.discountPercent }}%):</span>
            <span class="fw-bold">-{{ formatCurrency(activeReceipt.discountTotal) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2 text-muted">
            <span>Tax ({{ activeReceipt.taxPercent }}%):</span>
            <span class="fw-bold text-dark">{{ formatCurrency(activeReceipt.taxTotal) }}</span>
          </div>
          <div class="d-flex justify-content-between pt-2 border-top border-dark fs-5 fw-bolder">
            <span>Grand Total:</span>
            <span class="text-primary" style="color: #0b1e36 !important;">
              {{ formatCurrency(activeReceipt.grandTotal) }}
            </span>
          </div>
        </div>

        <!-- Tendered & Change -->
        <div class="border-top pt-2 small border-bottom pb-2 mb-3">
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Payment: {{ activeReceipt.payment.method ? (activeReceipt.payment.method.charAt(0).toUpperCase() + activeReceipt.payment.method.slice(1)) : 'Cash' }}</span>
            <span class="fw-bold">{{ formatCurrency(activeReceipt.payment.amountTendered) }}</span>
          </div>
          <div class="d-flex justify-content-between fw-bold text-dark">
            <span>Change:</span>
            <span>{{ formatCurrency(activeReceipt.payment.changeDue) }}</span>
          </div>
        </div>

        <!-- Fake Barcode & Footer Note -->
        <div class="text-center mt-2">
          <div class="font-monospace text-dark tracking-widest fw-bold" style="letter-spacing: 4px; font-size: 0.9rem;">
            ||||| | |||| ||| |||| | ||
          </div>
          <div class="text-muted small mt-1 font-monospace" style="font-size: 0.72rem;">
            --- Thank you! ---
          </div>
        </div>
      </div>
    </div>

    <!-- Manager Void Modal -->
    <div
      v-if="isVoidModalOpen && activeReceipt"
      class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
    >
      <div class="card shadow-lg border-0 bg-white" style="width: 100%; max-width: 440px; border-radius: 12px;">
        <div class="card-header bg-danger text-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="mb-0 fw-bold">⚠️ Authorize Void Sale</h6>
          <button type="button" class="btn-close btn-close-white" @click="isVoidModalOpen = false"></button>
        </div>
        <div class="card-body p-4">
          <p class="small text-muted mb-3">
            Voiding <strong>{{ activeReceipt.receiptNo }}</strong> will reverse the transaction and restore inventory stock.
          </p>
          <div class="mb-3">
            <label class="form-label small fw-bold">Void Reason <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="e.g. Customer returned items / Cashier error"
              v-model="voidReason"
            />
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-sm btn-light border" @click="isVoidModalOpen = false">Cancel</button>
            <button
              type="button"
              class="btn btn-sm btn-danger fw-bold"
              :disabled="!voidReason.trim()"
              @click="handleConfirmVoid"
            >
              Confirm Void & Restore Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sale } from '~/types/sale'
import { formatCurrency } from '~/utils/currency'
import { useSale } from '~/composables/useSale'

const { salesHistory, voidSale } = useSale()

const searchQuery = ref('')
const timeFilter = ref('month')
const activeReceipt = ref<Sale | null>(salesHistory.value[0] || null)

const isVoidModalOpen = ref(false)
const voidReason = ref('')

const filteredSales = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return salesHistory.value.filter((s) => {
    return !q || s.receiptNo.toLowerCase().includes(q) || (s.cashierName && s.cashierName.toLowerCase().includes(q))
  })
})

const formatSaleDate = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${mins}`
}

const printReceipt = () => {
  window.print()
}

const handleConfirmVoid = () => {
  if (!activeReceipt.value) return
  voidSale(activeReceipt.value.id, voidReason.value || 'Manager void authorization')
  isVoidModalOpen.value = false
  voidReason.value = ''
}
</script>

<style scoped>
.thermal-receipt {
  border-radius: 12px;
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background-color: rgba(11, 30, 54, 0.65);
  z-index: 1050;
  backdrop-filter: blur(4px);
}

@media print {
  body * {
    visibility: hidden;
  }
  .thermal-receipt, .thermal-receipt * {
    visibility: visible;
  }
  .thermal-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 320px;
    box-shadow: none !important;
    border: none !important;
  }
  .d-print-none {
    display: none !important;
  }
}
</style>
