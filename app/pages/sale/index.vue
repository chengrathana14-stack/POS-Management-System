<template>
  <div class="row g-3">
    <!-- Left Column: Sales Transactions Table -->
    <div class="col-lg-8">
      <div class="card shadow-sm border-0 rounded-4 bg-white h-100">
        <!-- Card Header with Search & Filters -->
        <div class="card-header bg-white py-3 px-4 border-0 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <h6 class="fw-bold text-dark mb-0">Sales Transactions</h6>
              <span class="badge bg-primary bg-opacity-10 text-primary font-monospace small">
                {{ filteredSales.length }} records
              </span>
            </div>
            <div class="text-muted small" style="font-size: 0.72rem;">Browse past register orders and thermal slips</div>
          </div>

          <div class="d-flex align-items-center gap-2">
            <!-- Search Input -->
            <div class="input-group input-group-sm search-input-box rounded-pill overflow-hidden border">
              <span class="input-group-text bg-light border-0 ps-3">🔍</span>
              <input
                type="text"
                class="form-control form-control-sm border-0 bg-light shadow-none"
                placeholder="Receipt # or cashier..."
                v-model="searchQuery"
              />
            </div>

            <!-- Date Filter Select -->
            <select class="form-select form-select-sm border-light bg-light fw-medium rounded-pill" style="width: 125px;" v-model="timeFilter">
              <option value="month">This Month</option>
              <option value="week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="table-responsive px-3">
          <table class="table table-hover align-middle mb-0">
            <thead class="small text-muted text-uppercase" style="border-top: 1px solid #f1f5f9; font-size: 0.72rem; letter-spacing: 0.04em;">
              <tr>
                <th scope="col" style="width: 45px;">#</th>
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
                class="sale-row"
                :class="{ 'selected-row': activeReceipt?.id === sale.id, 'opacity-60': sale.status === 'voided' }"
                @click="activeReceipt = sale"
              >
                <td class="small text-muted font-monospace">{{ idx + 1 }}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <span class="fw-bold font-monospace text-dark small">{{ sale.receiptNo }}</span>
                    <span v-if="sale.status === 'voided'" class="badge bg-danger-subtle text-danger font-monospace" style="font-size: 0.65rem;">
                      VOID
                    </span>
                    <span v-else class="badge bg-success-subtle text-success font-monospace" style="font-size: 0.65rem;">
                      PAID
                    </span>
                  </div>
                </td>
                <td class="small text-secondary">{{ formatSaleDate(sale.createdAt) }}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="cashier-avatar rounded-circle d-flex align-items-center justify-content-center text-white small" style="width: 26px; height: 26px; font-size: 0.75rem; background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                      {{ sale.cashierName.charAt(0) }}
                    </div>
                    <span class="small fw-semibold text-dark">{{ sale.cashierName }}</span>
                  </div>
                </td>
                <td class="text-end fw-bold small text-dark font-monospace">{{ formatCurrency(sale.grandTotal) }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-sm btn-view-sale px-3 py-1 font-monospace"
                    :class="activeReceipt?.id === sale.id ? 'btn-primary' : 'btn-light border'"
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

    <!-- Right Column: Hyper-Realistic Thermal Receipt Slip -->
    <div class="col-lg-4">
      <div v-if="activeReceipt" class="thermal-container position-relative">
        <!-- Floating Actions Toolbar -->
        <div class="d-flex justify-content-end gap-2 mb-2 d-print-none">
          <NuxtLink :to="`/receipts/${activeReceipt.id}`" class="btn btn-sm btn-light border d-flex align-items-center gap-1 shadow-xs" title="Open print preview">
            <span>🖨️</span>
            <span class="small">Print Slip</span>
          </NuxtLink>

          <button
            v-if="activeReceipt.status === 'completed'"
            type="button"
            class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 shadow-xs"
            @click="isVoidModalOpen = true"
          >
            <span>✕</span>
            <span class="small">Void</span>
          </button>
        </div>

        <!-- Realistic Physical Paper Slip -->
        <div class="thermal-paper card shadow-lg border-0 p-4 bg-white position-relative overflow-hidden font-monospace">
          <!-- Top Sawtooth Perforation Edge -->
          <div class="sawtooth-edge sawtooth-top"></div>

          <!-- Store Header & Logo -->
          <div class="text-center mb-3">
            <div class="receipt-logo mb-2 mx-auto text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <h5 class="fw-bolder mb-0 text-dark tracking-wide">My Shop</h5>
            <div class="text-muted small">Thank you for shopping!</div>

            <div v-if="activeReceipt.status === 'voided'" class="void-banner my-2 py-1 px-3 bg-danger text-white fw-bold small rounded">
              *** VOIDED TRANSACTION ***
            </div>
          </div>

          <!-- Meta Data -->
          <div class="receipt-divider py-2 my-2 border-top border-bottom border-dashed small">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Receipt No:</span>
              <span class="fw-bold text-dark">{{ activeReceipt.receiptNo }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Date:</span>
              <span class="text-dark">{{ formatSaleDate(activeReceipt.createdAt) }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Cashier:</span>
              <span class="text-dark">{{ activeReceipt.cashierName }}</span>
            </div>
          </div>

          <!-- Itemized Breakdown -->
          <div class="receipt-items my-3 small">
            <div
              v-for="item in activeReceipt.items"
              :key="item.productId"
              class="d-flex justify-content-between py-1 border-bottom border-light"
            >
              <div class="pe-2 text-truncate" style="max-width: 70%;">
                <div class="fw-semibold text-dark text-truncate">{{ item.productName }}</div>
                <div class="text-muted small font-monospace">x{{ item.quantity }} @ {{ formatCurrency(item.unitPrice) }}</div>
              </div>
              <div class="fw-bold text-dark font-monospace text-end">
                {{ formatCurrency(item.lineTotal) }}
              </div>
            </div>
          </div>

          <!-- Financial Calculation Breakdown -->
          <div class="receipt-totals border-top border-dashed pt-2 small">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Subtotal:</span>
              <span class="fw-bold text-dark font-monospace">{{ formatCurrency(activeReceipt.subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Discount ({{ activeReceipt.discountPercent }}%):</span>
              <span class="fw-bold text-success font-monospace">-{{ formatCurrency(activeReceipt.discountTotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Tax ({{ activeReceipt.taxPercent }}%):</span>
              <span class="fw-bold text-dark font-monospace">{{ formatCurrency(activeReceipt.taxTotal) }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-baseline pt-2 border-top border-2 border-dark">
              <span class="fw-bolder fs-6 text-dark">Grand Total:</span>
              <span class="fw-bolder fs-5 text-dark font-monospace">{{ formatCurrency(activeReceipt.grandTotal) }}</span>
            </div>
          </div>

          <!-- Payment Info -->
          <div class="receipt-payment border-top border-dashed mt-3 pt-2 small">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted text-capitalize">Payment ({{ activeReceipt.paymentMethod }}):</span>
              <span class="fw-bold text-dark font-monospace">{{ formatCurrency(activeReceipt.amountTendered) }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Change:</span>
              <span class="fw-bold text-dark font-monospace">{{ formatCurrency(activeReceipt.changeDue) }}</span>
            </div>
          </div>

          <!-- Realistic Barcode Graphic -->
          <div class="text-center mt-4">
            <svg class="barcode-svg" viewBox="0 0 200 45" style="width: 170px; height: 38px;">
              <rect x="0" y="0" width="2" height="40" fill="#111"/>
              <rect x="4" y="0" width="1" height="40" fill="#111"/>
              <rect x="7" y="0" width="3" height="40" fill="#111"/>
              <rect x="13" y="0" width="1" height="40" fill="#111"/>
              <rect x="16" y="0" width="4" height="40" fill="#111"/>
              <rect x="23" y="0" width="2" height="40" fill="#111"/>
              <rect x="28" y="0" width="1" height="40" fill="#111"/>
              <rect x="31" y="0" width="3" height="40" fill="#111"/>
              <rect x="36" y="0" width="2" height="40" fill="#111"/>
              <rect x="41" y="0" width="4" height="40" fill="#111"/>
              <rect x="48" y="0" width="1" height="40" fill="#111"/>
              <rect x="52" y="0" width="3" height="40" fill="#111"/>
              <rect x="58" y="0" width="2" height="40" fill="#111"/>
              <rect x="63" y="0" width="1" height="40" fill="#111"/>
              <rect x="67" y="0" width="4" height="40" fill="#111"/>
              <rect x="74" y="0" width="2" height="40" fill="#111"/>
              <rect x="79" y="0" width="1" height="40" fill="#111"/>
              <rect x="83" y="0" width="3" height="40" fill="#111"/>
              <rect x="89" y="0" width="2" height="40" fill="#111"/>
              <rect x="94" y="0" width="4" height="40" fill="#111"/>
              <rect x="101" y="0" width="1" height="40" fill="#111"/>
              <rect x="105" y="0" width="3" height="40" fill="#111"/>
              <rect x="111" y="0" width="2" height="40" fill="#111"/>
              <rect x="116" y="0" width="1" height="40" fill="#111"/>
              <rect x="120" y="0" width="4" height="40" fill="#111"/>
              <rect x="127" y="0" width="2" height="40" fill="#111"/>
              <rect x="132" y="0" width="1" height="40" fill="#111"/>
              <rect x="136" y="0" width="3" height="40" fill="#111"/>
              <rect x="142" y="0" width="2" height="40" fill="#111"/>
              <rect x="147" y="0" width="4" height="40" fill="#111"/>
              <rect x="154" y="0" width="1" height="40" fill="#111"/>
              <rect x="158" y="0" width="3" height="40" fill="#111"/>
              <rect x="164" y="0" width="2" height="40" fill="#111"/>
              <rect x="169" y="0" width="1" height="40" fill="#111"/>
              <rect x="173" y="0" width="4" height="40" fill="#111"/>
              <rect x="180" y="0" width="2" height="40" fill="#111"/>
              <rect x="185" y="0" width="1" height="40" fill="#111"/>
              <rect x="190" y="0" width="3" height="40" fill="#111"/>
              <rect x="196" y="0" width="2" height="40" fill="#111"/>
            </svg>
            <div class="text-muted small mt-2" style="font-size: 0.72rem;">--- Thank you! ---</div>
          </div>

          <!-- Bottom Sawtooth Edge -->
          <div class="sawtooth-edge sawtooth-bottom"></div>
        </div>
      </div>
    </div>

    <!-- Manager Void Confirmation Modal -->
    <div
      v-if="isVoidModalOpen && activeReceipt"
      class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
      @click.self="isVoidModalOpen = false"
    >
      <div class="card shadow-xl border-0 p-4 bg-white rounded-4" style="max-width: 440px; width: 100%;">
        <div class="text-center mb-3">
          <div class="void-icon-circle mx-auto mb-2 text-danger">
            ⚠️
          </div>
          <h5 class="fw-bold text-dark mb-1">Confirm Void Transaction</h5>
          <div class="text-muted small">
            Voiding <span class="font-monospace fw-bold text-dark">{{ activeReceipt.receiptNo }}</span> will return stock to inventory.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label small fw-semibold text-muted">Reason for Void *</label>
          <textarea
            v-model="voidReason"
            class="form-control"
            rows="2"
            placeholder="e.g. Customer cancelled, cashier error..."
          ></textarea>
        </div>

        <div class="d-flex gap-2">
          <button type="button" class="btn btn-light border flex-grow-1" @click="isVoidModalOpen = false">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger flex-grow-1 fw-bold"
            :disabled="!voidReason.trim()"
            @click="handleVoidConfirm"
          >
            Confirm Void
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSale } from '~/composables/useSale'
import { formatCurrency } from '~/utils/currency'
import type { Sale } from '~/types/sale'

const { sales, voidSale } = useSale()

const searchQuery = ref('')
const timeFilter = ref('month')
const isVoidModalOpen = ref(false)
const voidReason = ref('')

const activeReceipt = ref<Sale | null>(sales.value[0] || null)

const filteredSales = computed(() => {
  return sales.value.filter(s => {
    const q = searchQuery.value.trim().toLowerCase()
    const matchesQuery =
      !q ||
      s.receiptNo.toLowerCase().includes(q) ||
      s.cashierName.toLowerCase().includes(q)
    return matchesQuery
  })
})

const formatSaleDate = (isoStr: string) => {
  try {
    const d = new Date(isoStr)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const mins = String(d.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${mins}`
  } catch {
    return isoStr
  }
}

const handleVoidConfirm = () => {
  if (!activeReceipt.value || !voidReason.value.trim()) return
  voidSale(activeReceipt.value.id, voidReason.value.trim(), 'usr_02')
  isVoidModalOpen.value = false
  voidReason.value = ''
}
</script>

<style scoped>
.sale-row {
  cursor: pointer;
  transition: all 0.15s ease;
}

.sale-row:hover {
  background-color: #f8fafc;
}

.selected-row {
  background-color: #eff6ff !important;
  border-left: 3px solid #2563eb;
}

.btn-view-sale {
  font-size: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.15s ease;
}

.search-input-box {
  width: 200px;
}

/* Hyper-Realistic Thermal Paper */
.thermal-paper {
  border-radius: 12px !important;
  background-color: #ffffff;
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04) !important;
}

.border-dashed {
  border-style: dashed !important;
}

.sawtooth-edge {
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
  background-size: 16px 8px;
  pointer-events: none;
}

.sawtooth-top {
  top: 0;
  background-image: radial-gradient(circle at 8px 0, transparent 8px, #ffffff 8.5px);
}

.sawtooth-bottom {
  bottom: 0;
  background-image: radial-gradient(circle at 8px 8px, transparent 8px, #ffffff 8.5px);
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1050;
}

.void-icon-circle {
  font-size: 2.2rem;
}
</style>