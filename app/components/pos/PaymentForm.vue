<template>
  <div v-if="isOpen" class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
    <div class="card shadow-lg border-0" style="width: 100%; max-width: 520px; border-radius: 12px;">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 class="mb-0 fw-bold">💵 Cash Payment & Checkout</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          aria-label="Close"
          @click="$emit('close')"
        ></button>
      </div>

      <div class="card-body p-4">
        <!-- Order Summary -->
        <div class="bg-light p-3 rounded mb-3 border">
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Subtotal ({{ totals.itemCount }} items):</span>
            <span class="fw-semibold">{{ formatCurrency(totals.subtotal) }}</span>
          </div>
          <div v-if="totals.discountTotal > 0" class="d-flex justify-content-between mb-1 text-danger">
            <span>Discount ({{ totals.discountPercent }}%):</span>
            <span>-{{ formatCurrency(totals.discountTotal) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2 text-muted">
            <span>Tax / VAT ({{ totals.taxPercent }}%):</span>
            <span>+{{ formatCurrency(totals.taxTotal) }}</span>
          </div>
          <div class="d-flex justify-content-between pt-2 border-top fs-4 fw-bold text-dark">
            <span>Grand Total Due:</span>
            <span class="text-primary">{{ formatCurrency(totals.grandTotal) }}</span>
          </div>
        </div>

        <!-- Cash Tendered Input -->
        <div class="mb-3">
          <label class="form-label fw-bold">Amount Tendered (Cash):</label>
          <div class="input-group input-group-lg">
            <span class="input-group-text">$</span>
            <input
              ref="tenderedInput"
              type="number"
              step="0.01"
              min="0"
              class="form-control fw-bold"
              placeholder="0.00"
              v-model.number="amountTendered"
              @keydown.enter="canSubmit ? handleCheckout() : null"
            />
          </div>
        </div>

        <!-- Quick Cash Presets -->
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="amountTendered = totals.grandTotal"
          >
            Exact ({{ formatCurrency(totals.grandTotal) }})
          </button>
          <button
            v-for="preset in cashPresets"
            :key="preset"
            type="button"
            class="btn btn-outline-primary btn-sm"
            @click="amountTendered = preset"
          >
            ${{ preset }}
          </button>
        </div>

        <!-- Change Due / Underpayment Notification (FR-05) -->
        <div
          v-if="amountTendered > 0"
          class="alert py-2 px-3 mb-3 d-flex justify-content-between align-items-center"
          :class="changeInfo.isUnderpaid ? 'alert-danger' : 'alert-success'"
        >
          <span class="fw-semibold">
            {{ changeInfo.isUnderpaid ? '⚠️ Underpayment Shortfall:' : '✅ Change Due to Customer:' }}
          </span>
          <span class="fs-5 fw-bold">
            {{ changeInfo.isUnderpaid ? formatCurrency(changeInfo.shortfall) : formatCurrency(changeInfo.changeDue) }}
          </span>
        </div>

        <!-- Error feedback -->
        <div v-if="errorMessage" class="alert alert-danger py-2 px-3 mb-3 small">
          {{ errorMessage }}
        </div>
      </div>

      <div class="card-footer bg-light p-3 d-flex justify-content-end gap-2 border-top">
        <button
          type="button"
          class="btn btn-outline-secondary px-3"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-success px-4 fw-bold d-flex align-items-center gap-2"
          :disabled="!canSubmit || isProcessing"
          @click="handleCheckout"
        >
          <span v-if="isProcessing" class="spinner-border spinner-border-sm"></span>
          <span>Complete Sale & Print Receipt</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CartTotals, Sale } from '~/types/sale'
import { formatCurrency } from '~/utils/currency'
import { calculateChange } from '~/utils/calculation'
import { useSale } from '~/composables/useSale'

const props = defineProps<{
  isOpen: boolean
  totals: CartTotals
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'completed', sale: Sale): void
}>()

const { processCheckout, isProcessingCheckout: isProcessing } = useSale()

const amountTendered = ref<number>(0)
const errorMessage = ref<string | null>(null)
const tenderedInput = ref<HTMLInputElement | null>(null)

// Focus input on open & set default to exact total
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      amountTendered.value = props.totals.grandTotal
      errorMessage.value = null
      setTimeout(() => {
        tenderedInput.value?.select()
      }, 100)
    }
  }
)

const changeInfo = computed(() => {
  return calculateChange(amountTendered.value, props.totals.grandTotal)
})

const canSubmit = computed(() => {
  return (
    props.totals.grandTotal > 0 &&
    amountTendered.value >= props.totals.grandTotal &&
    !changeInfo.value.isUnderpaid
  )
})

// Quick cash bill shortcuts
const cashPresets = computed(() => {
  const g = props.totals.grandTotal
  const candidates = [5, 10, 20, 50, 100]
  return candidates.filter((c) => c > g).slice(0, 4)
})

const handleCheckout = () => {
  errorMessage.value = null
  const result = processCheckout(amountTendered.value)
  if (result.success && result.sale) {
    emit('completed', result.sale)
    emit('close')
  } else {
    errorMessage.value = result.error || 'Failed to complete sale.'
  }
}
</script>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
  backdrop-filter: blur(2px);
}
</style>
