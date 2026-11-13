<template>
  <div class="container py-4" style="max-width: 440px;">
    <!-- Navigation back & Print Action -->
    <div class="d-print-none mb-3 d-flex justify-content-between align-items-center">
      <NuxtLink to="/pos" class="btn btn-outline-secondary btn-sm">
        ← Back to POS
      </NuxtLink>
      <div class="d-flex gap-2">
        <NuxtLink to="/sale" class="btn btn-outline-primary btn-sm">
          Sales History
        </NuxtLink>
        <button class="btn btn-primary btn-sm d-flex align-items-center gap-1 fw-bold" @click="printReceipt">
          <span>🖨️</span>
          <span>Print Slip</span>
        </button>
      </div>
    </div>

    <!-- Printable Thermal Receipt Paper Style (Matching Mockup) -->
    <div v-if="sale" class="card shadow border-0 p-4 bg-white thermal-receipt" id="printable-receipt" style="border-radius: 12px;">
      <!-- Store Header with Logo -->
      <div class="text-center mb-3">
        <div class="mb-1 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1877f2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h4 class="fw-bolder mb-1 text-dark">My Shop</h4>
        <div class="text-muted small">Thank you for shopping!</div>
        <div v-if="sale.status === 'voided'" class="badge bg-danger mt-2 py-1 px-3 fw-bold">
          *** VOIDED SALE ***
        </div>
      </div>

      <!-- Receipt Meta -->
      <div class="small text-muted border-top border-bottom py-2 mb-3">
        <div class="d-flex justify-content-between mb-1">
          <span>Receipt No:</span>
          <span class="fw-bold font-monospace text-dark">{{ sale.receiptNo }}</span>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <span>Date:</span>
          <span class="text-dark">{{ formatDate(sale.createdAt) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Cashier:</span>
          <span class="text-dark fw-semibold">{{ sale.cashierName || 'Rathana' }}</span>
        </div>
      </div>

      <!-- Items List -->
      <div class="mb-3">
        <div
          v-for="item in sale.items"
          :key="item.id || item.productId"
          class="d-flex justify-content-between small mb-1"
        >
          <span class="text-dark fw-semibold">
            {{ item.productName }} <span v-if="item.quantity > 1" class="text-muted">x{{ item.quantity }}</span>
          </span>
          <span class="fw-bold text-dark">{{ formatCurrency(item.lineTotal) }}</span>
        </div>
      </div>

      <!-- Totals Summary -->
      <div class="border-top pt-2 small mb-3">
        <div class="d-flex justify-content-between mb-1">
          <span class="text-muted">Subtotal:</span>
          <span class="fw-bold text-dark">{{ formatCurrency(sale.subtotal) }}</span>
        </div>
        <div v-if="sale.discountTotal > 0" class="d-flex justify-content-between mb-1 text-success">
          <span>Discount ({{ sale.discountPercent }}%):</span>
          <span class="fw-bold">-{{ formatCurrency(sale.discountTotal) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-2 text-muted">
          <span>Tax ({{ sale.taxPercent }}%):</span>
          <span class="fw-bold text-dark">{{ formatCurrency(sale.taxTotal) }}</span>
        </div>
        <div class="d-flex justify-content-between pt-2 border-top border-dark fs-5 fw-bolder">
          <span>Grand Total:</span>
          <span class="text-primary" style="color: #0b1e36 !important;">
            {{ formatCurrency(sale.grandTotal) }}
          </span>
        </div>
      </div>

      <!-- Payment & Change -->
      <div class="border-top pt-2 small border-bottom pb-2 mb-3">
        <div class="d-flex justify-content-between mb-1">
          <span class="text-muted">Payment: {{ sale.payment.method ? (sale.payment.method.charAt(0).toUpperCase() + sale.payment.method.slice(1)) : 'Cash' }}</span>
          <span class="fw-bold">{{ formatCurrency(sale.payment.amountTendered) }}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold text-dark">
          <span>Change:</span>
          <span>{{ formatCurrency(sale.payment.changeDue) }}</span>
        </div>
      </div>

      <!-- Barcode Graphic & Footer -->
      <div class="text-center mt-2">
        <div class="font-monospace text-dark tracking-widest fw-bold" style="letter-spacing: 5px; font-size: 0.95rem;">
          ||||| | |||| ||| |||| | ||
        </div>
        <div class="text-muted small mt-1 font-monospace" style="font-size: 0.75rem;">
          --- Thank you! ---
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="card p-5 text-center shadow-sm bg-white">
      <h6 class="text-danger fw-bold">Receipt Record Not Found</h6>
      <p class="text-muted small mb-3">No sale matches identifier: {{ idOrReceipt }}</p>
      <NuxtLink to="/sale" class="btn btn-outline-primary btn-sm mx-auto">
        Return to Sales History
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/currency'
import { useSale } from '~/composables/useSale'

const route = useRoute()
const { getSaleById, getSaleByReceiptNo } = useSale()

const idOrReceipt = computed(() => route.params.id as string)

const sale = computed(() => {
  const numericId = parseInt(idOrReceipt.value, 10)
  if (!isNaN(numericId)) {
    const byId = getSaleById(numericId)
    if (byId) return byId
  }
  return getSaleByReceiptNo(idOrReceipt.value)
})

const formatDate = (iso: string) => {
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
</script>

<style scoped>
.thermal-receipt {
  font-family: system-ui, -apple-system, sans-serif;
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-receipt, #printable-receipt * {
    visibility: visible;
  }
  #printable-receipt {
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
