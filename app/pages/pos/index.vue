<template>
  <div class="row g-3">
    <!-- Left Column: Search, Category Tabs & Product Catalog Grid -->
    <div class="col-lg-7 col-xl-7">
      <!-- Search & Category Tabs Card -->
      <div class="card shadow-sm border-0 mb-3 p-3 bg-white">
        <!-- Search Input -->
        <div class="input-group search-input-group mb-3 rounded-3 overflow-hidden border">
          <span class="input-group-text bg-white border-0 text-muted ps-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            ref="searchInputRef"
            type="text"
            class="form-control border-0 shadow-none ps-2"
            placeholder="Search product by name or SKU... (Press / to search)"
            v-model="searchQuery"
            @keydown.enter="handleSkuEnter"
          />
          <span class="input-group-text bg-white border-0 pe-3 text-muted small">
            <kbd class="bg-light text-muted border px-1 rounded">↵ Enter</kbd>
          </span>
        </div>

        <!-- Category Pills Navigation -->
        <div class="d-flex align-items-center gap-2 overflow-auto category-scroll pb-1">
          <button
            type="button"
            class="btn btn-sm category-tab"
            :class="selectedCategory === 'all' ? 'btn-primary' : 'btn-light border text-dark'"
            @click="selectedCategory = 'all'"
          >
            All Products
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="btn btn-sm category-tab text-nowrap"
            :class="selectedCategory === cat.id ? 'btn-primary' : 'btn-light border text-dark'"
            @click="selectedCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="row row-cols-2 row-cols-md-3 g-3">
        <div v-for="product in filteredProducts" :key="product.id" class="col">
          <div
            class="card product-card h-100 shadow-sm border-0 text-center p-3 position-relative"
            :class="{ 'opacity-50 pointer-events-none': product.stockQty <= 0 }"
            @click="product.stockQty > 0 ? handleAddToCart(product) : null"
          >
            <!-- Low stock badge -->
            <span
              v-if="product.stockQty <= 3 && product.stockQty > 0"
              class="position-absolute top-0 end-0 m-2 badge bg-danger text-white rounded-pill px-2 py-1"
              style="font-size: 0.65rem;"
            >
              Only {{ product.stockQty }} left
            </span>

            <span
              v-else-if="product.stockQty <= 0"
              class="position-absolute top-0 end-0 m-2 badge bg-secondary text-white rounded-pill px-2 py-1"
              style="font-size: 0.65rem;"
            >
              Out of stock
            </span>

            <!-- Real Product Image -->
            <div class="product-img-box mb-2 d-flex align-items-center justify-content-center mx-auto">
              <img
                :src="product.image"
                :alt="product.name"
                class="img-fluid rounded object-fit-contain"
                style="height: 80px; width: auto; max-width: 100%; transition: transform 0.2s ease;"
                loading="lazy"
              />
            </div>

            <!-- Product Details -->
            <div class="fw-bold text-dark small mb-1 text-truncate" :title="product.name">
              {{ product.name }}
            </div>
            <div class="product-price fw-bolder fs-6">
              {{ formatCurrency(product.unitPrice) }}
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="col-12 py-5 text-center text-muted">
          <div class="fs-1 mb-2">🔍</div>
          <div class="fw-bold">No products found</div>
          <div class="small">Try adjusting your search query or category filter</div>
        </div>
      </div>
    </div>

    <!-- Right Column: Order Checkout Cart Panel -->
    <div class="col-lg-5 col-xl-5">
      <div class="card shadow-sm border-0 rounded-3 overflow-hidden sticky-top" style="top: 1rem;">
        <!-- Order Table Header -->
        <div class="order-table-header px-3 py-2 text-white fw-bold small d-flex" style="background-color: #1877f2;">
          <div style="flex: 2;">Product</div>
          <div style="flex: 1.5;" class="text-center">Qty</div>
          <div style="flex: 1.2;" class="text-end">Price</div>
          <div style="flex: 1.3;" class="text-end">Total</div>
        </div>

        <!-- Order Items List -->
        <div class="cart-items-body p-2" style="max-height: 280px; min-height: 160px; overflow-y: auto;">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-row d-flex align-items-center py-2 px-1 border-bottom"
          >
            <!-- Product Info with Thumbnail -->
            <div style="flex: 2; min-width: 0;" class="d-flex align-items-center gap-2">
              <img
                v-if="item.product.image"
                :src="item.product.image"
                :alt="item.product.name"
                class="rounded object-fit-cover border bg-light flex-shrink-0"
                style="width: 34px; height: 34px;"
              />
              <div class="text-truncate">
                <div class="small fw-bold text-dark text-truncate">{{ item.product.name }}</div>
                <div class="text-muted" style="font-size: 0.7rem;">{{ item.product.sku }}</div>
              </div>
            </div>

            <!-- Stepper -->
            <div style="flex: 1.5;" class="d-flex align-items-center justify-content-center">
              <div class="qty-stepper d-inline-flex align-items-center border rounded">
                <button
                  type="button"
                  class="btn btn-sm btn-link p-0 text-muted px-2 text-decoration-none"
                  @click="updateQuantity(item.product.id, item.quantity - 1)"
                >
                  -
                </button>
                <span class="small px-2 fw-bold text-dark">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="btn btn-sm btn-link p-0 text-muted px-2 text-decoration-none"
                  :disabled="item.quantity >= item.product.stockQty"
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Price -->
            <div style="flex: 1.2;" class="text-end small text-muted">
              {{ formatCurrency(item.unitPrice) }}
            </div>

            <!-- Total & Remove -->
            <div style="flex: 1.3;" class="text-end small fw-bold text-dark">
              {{ formatCurrency(item.lineTotal) }}
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="text-center py-5 text-muted small">
            <div class="fs-1 mb-2">🛒</div>
            <div class="fw-bold">Cart is empty</div>
            <div class="text-muted">Click products from the catalog to add items</div>
          </div>
        </div>

        <!-- Summary Totals Section -->
        <div class="p-3 bg-white border-top">
          <div class="d-flex justify-content-between mb-1 small">
            <span class="text-muted fw-semibold">Subtotal:</span>
            <span class="fw-bold text-dark">{{ formatCurrency(totals.subtotal) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 small">
            <span class="text-muted fw-semibold">Discount ({{ discountPercent }}%):</span>
            <span class="fw-bold text-success">-{{ formatCurrency(totals.discountTotal) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-2 small">
            <span class="text-muted fw-semibold">Tax ({{ taxPercent }}%):</span>
            <span class="fw-bold text-dark">{{ formatCurrency(totals.taxTotal) }}</span>
          </div>

          <div class="d-flex justify-content-between align-items-baseline pt-2 border-top">
            <span class="fs-6 fw-bolder text-dark">Grand Total:</span>
            <span class="fs-4 fw-bolder text-primary" style="color: #0b1e36 !important;">
              {{ formatCurrency(totals.grandTotal) }}
            </span>
          </div>
        </div>

        <!-- Payment Input & Tendered -->
        <div class="p-3 bg-light border-top">
          <!-- Payment Method -->
          <div class="row g-2 align-items-center mb-2">
            <div class="col-5 small fw-semibold text-muted">Payment Method:</div>
            <div class="col-7">
              <select class="form-select form-select-sm" v-model="paymentMethod">
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>

          <!-- Amount Tendered -->
          <div class="row g-2 align-items-center mb-2">
            <div class="col-5 small fw-semibold text-muted">Amount Tendered:</div>
            <div class="col-7">
              <input
                ref="tenderedInputRef"
                type="number"
                step="0.01"
                min="0"
                class="form-control form-control-sm text-end fw-bold fs-6"
                placeholder="0.00"
                v-model.number="amountTendered"
                @keydown.enter="canSubmit ? handleCompleteSale() : null"
              />
            </div>
          </div>

          <!-- Quick Cash Bill Presets (Single-tap cash tender) -->
          <div class="d-flex flex-wrap gap-1 mb-2">
            <button
              v-for="bill in quickCashBills"
              :key="bill.label"
              type="button"
              class="btn btn-xs btn-outline-secondary flex-grow-1"
              @click="amountTendered = bill.value"
            >
              {{ bill.label }}
            </button>
          </div>

          <!-- Change Banner -->
          <div
            class="change-banner p-2 text-center rounded mb-3 fw-bold small"
            :class="isUnderpaid ? 'bg-danger-subtle text-danger border-danger' : 'bg-success-subtle text-success border-success'"
          >
            <span v-if="isUnderpaid">⚠️ Shortfall: {{ formatCurrency(shortfall) }}</span>
            <span v-else>Change: {{ formatCurrency(changeAmount) }}</span>
          </div>

          <!-- Action Buttons (Complete Sale & Clear) -->
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-primary fw-bold flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-1 shadow-sm"
              style="background-color: #1877f2; border-color: #1877f2;"
              :disabled="!canSubmit"
              @click="handleCompleteSale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Complete Sale</span>
            </button>

            <button
              type="button"
              class="btn btn-outline-secondary px-3 py-2 d-flex align-items-center gap-1"
              title="Clear Cart (Esc)"
              @click="clearCart"
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sale Completed Success Modal / Printable Slip -->
    <div
      v-if="completedSaleModal"
      class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
    >
      <div class="card shadow-lg border-0 bg-white" style="width: 100%; max-width: 440px; border-radius: 14px;">
        <div class="card-header bg-success text-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="mb-0 fw-bold d-flex align-items-center gap-2">
            <span>✅</span>
            <span>Sale Completed Successfully!</span>
          </h6>
          <button type="button" class="btn-close btn-close-white" @click="completedSaleModal = null"></button>
        </div>

        <div class="card-body p-4 text-center">
          <div class="text-muted small mb-1">Receipt Number</div>
          <h4 class="font-monospace fw-bolder text-dark mb-3">{{ completedSaleModal.receiptNo }}</h4>

          <div class="bg-light p-3 rounded-3 text-start small mb-3 border">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Grand Total:</span>
              <span class="fw-bold">{{ formatCurrency(completedSaleModal.grandTotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Cash Tendered:</span>
              <span class="fw-semibold">{{ formatCurrency(completedSaleModal.payment.amountTendered) }}</span>
            </div>
            <div class="d-flex justify-content-between fw-bold text-success border-top pt-1 mt-1">
              <span>Change Returned:</span>
              <span>{{ formatCurrency(completedSaleModal.payment.changeDue) }}</span>
            </div>
          </div>

          <div class="d-flex gap-2">
            <NuxtLink
              :to="`/receipts/${completedSaleModal.id}`"
              class="btn btn-primary flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-1"
            >
              <span>🖨️</span>
              <span>View & Print Receipt</span>
            </NuxtLink>
            <button
              type="button"
              class="btn btn-outline-secondary px-3"
              @click="completedSaleModal = null"
            >
              Next Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import type { Sale } from '~/types/sale'
import { formatCurrency } from '~/utils/currency'
import { useProduct } from '~/composables/useProduct'
import { useCart } from '~/composables/useCart'
import { useSale } from '~/composables/useSale'

const { categories, products, filterProducts, getProductBySku } = useProduct()
const {
  cartItems,
  discountPercent,
  taxPercent,
  totals,
  addToCart,
  updateQuantity,
  clearCart
} = useCart()

const { processCheckout } = useSale()

const searchQuery = ref('')
const selectedCategory = ref<number | 'all'>('all')
const paymentMethod = ref('cash')
const amountTendered = ref<number>(400)
const completedSaleModal = ref<Sale | null>(null)

const searchInputRef = ref<HTMLInputElement | null>(null)
const tenderedInputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  discountPercent.value = 10
  taxPercent.value = 8

  // Pre-seed cart items matching mockup if empty
  if (cartItems.value.length === 0) {
    const mizuno = products.value.find((p) => p.name.includes('Mizuno'))
    const tshirt = products.value.find((p) => p.name.includes('T-Shirt'))
    if (mizuno) addToCart(mizuno, 1)
    if (tshirt) addToCart(tshirt, 2)
    amountTendered.value = 400
  }

  // Keyboard shortcut listener for cashier speed
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === '/' && document.activeElement !== searchInputRef.value) {
    e.preventDefault()
    searchInputRef.value?.focus()
    searchInputRef.value?.select()
  } else if (e.key === 'F4') {
    e.preventDefault()
    if (canSubmit.value) handleCompleteSale()
  } else if (e.key === 'Escape') {
    clearCart()
  }
}

const filteredProducts = computed(() => {
  return filterProducts(searchQuery.value, selectedCategory.value)
})

const handleAddToCart = (product: Product) => {
  addToCart(product, 1)
  if (amountTendered.value < totals.value.grandTotal) {
    amountTendered.value = Math.ceil(totals.value.grandTotal / 50) * 50
  }
}

const handleSkuEnter = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  const exact = getProductBySku(q)
  if (exact && exact.stockQty > 0) {
    handleAddToCart(exact)
    searchQuery.value = ''
  } else if (filteredProducts.value.length === 1 && filteredProducts.value[0].stockQty > 0) {
    handleAddToCart(filteredProducts.value[0])
    searchQuery.value = ''
  }
}

const isUnderpaid = computed(() => {
  return amountTendered.value > 0 && amountTendered.value < totals.value.grandTotal
})

const shortfall = computed(() => {
  return isUnderpaid.value ? Number((totals.value.grandTotal - amountTendered.value).toFixed(2)) : 0
})

const changeAmount = computed(() => {
  if (!amountTendered.value || amountTendered.value < totals.value.grandTotal) return 0
  return Math.max(0, Number((amountTendered.value - totals.value.grandTotal).toFixed(2)))
})

const canSubmit = computed(() => {
  return cartItems.value.length > 0 && amountTendered.value >= totals.value.grandTotal
})

const quickCashBills = computed(() => {
  const g = totals.value.grandTotal
  return [
    { label: 'Exact', value: g },
    { label: '$50', value: 50 },
    { label: '$100', value: 100 },
    { label: '$200', value: 200 },
    { label: '$400', value: 400 }
  ]
})

const handleCompleteSale = () => {
  const result = processCheckout(amountTendered.value)
  if (result.success && result.sale) {
    completedSaleModal.value = result.sale
  }
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #ffffff;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}

.product-card:hover img {
  transform: scale(1.05);
}

.product-img-box {
  height: 85px;
  width: 100%;
}

.product-price {
  color: #ea580c;
}

.category-tab {
  border-radius: 999px;
  font-size: 0.82rem;
  padding: 0.35rem 0.85rem;
}

.qty-stepper {
  background-color: #ffffff;
}

.btn-xs {
  font-size: 0.72rem;
  padding: 0.18rem 0.5rem;
  border-radius: 6px;
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background-color: rgba(11, 30, 54, 0.65);
  z-index: 1050;
  backdrop-filter: blur(4px);
}
</style>
