<template>
  <div class="row g-3">
    <!-- Left Column: Search, Category Tabs & Product Catalog Grid -->
    <div class="col-lg-7 col-xl-7">
      <!-- Search & Category Card -->
      <div class="card shadow-sm border-0 mb-3 p-3 bg-white rounded-3">
        <!-- Search Input with Barcode & Keyboard shortcut -->
        <div class="input-group search-bar-wrapper mb-3 rounded-pill overflow-hidden border">
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
          <button
            v-if="searchQuery"
            type="button"
            class="btn btn-link text-muted pe-2 py-0 text-decoration-none"
            @click="searchQuery = ''"
          >
            ✕
          </button>
          <span class="input-group-text bg-white border-0 pe-3 text-muted small">
            <kbd class="bg-light text-muted border px-2 py-1 rounded small font-monospace">/ search</kbd>
          </span>
        </div>

        <!-- Category Filter Chips -->
        <div class="d-flex align-items-center gap-2 overflow-auto category-scroll pb-1">
          <button
            type="button"
            class="btn btn-sm category-chip d-flex align-items-center gap-1"
            :class="selectedCategory === 'all' ? 'active shadow-glow-blue' : 'btn-light border text-secondary'"
            @click="selectedCategory = 'all'"
          >
            <span>All Products</span>
            <span class="badge rounded-pill" :class="selectedCategory === 'all' ? 'bg-white text-primary' : 'bg-secondary bg-opacity-10 text-muted'">
              {{ products.length }}
            </span>
          </button>

          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="btn btn-sm category-chip d-flex align-items-center gap-1 text-nowrap"
            :class="selectedCategory === cat.id ? 'active shadow-glow-blue' : 'btn-light border text-secondary'"
            @click="selectedCategory = cat.id"
          >
            <span>{{ cat.name }}</span>
            <span class="badge rounded-pill" :class="selectedCategory === cat.id ? 'bg-white text-primary' : 'bg-secondary bg-opacity-10 text-muted'">
              {{ getCategoryCount(cat.id) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Toast Feedback on Add to Cart -->
      <transition name="fade">
        <div v-if="addedToastMessage" class="toast-alert shadow-md d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-dark text-white position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3">
          <span class="text-success">✓</span>
          <span class="small fw-medium">{{ addedToastMessage }}</span>
        </div>
      </transition>

      <!-- Products Grid -->
      <div class="row row-cols-2 row-cols-md-3 g-3">
        <div v-for="product in filteredProducts" :key="product.id" class="col">
          <div
            class="card product-card h-100 border-0 p-3 text-center position-relative cursor-pointer hover-lift"
            :class="{ 'opacity-50 pointer-events-none': product.stockQty <= 0 }"
            @click="product.stockQty > 0 ? handleAddToCart(product) : null"
          >
            <!-- Badges -->
            <div class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1 align-items-end">
              <span
                v-if="product.stockQty <= 3 && product.stockQty > 0"
                class="badge bg-danger text-white rounded-pill px-2 py-1 shadow-xs"
                style="font-size: 0.65rem;"
              >
                Only {{ product.stockQty }} left
              </span>
              <span
                v-else-if="product.stockQty <= 0"
                class="badge bg-secondary text-white rounded-pill px-2 py-1 shadow-xs"
                style="font-size: 0.65rem;"
              >
                Out of Stock
              </span>
              <span
                v-else
                class="badge bg-light text-muted border rounded-pill px-2 py-1"
                style="font-size: 0.65rem;"
              >
                Stock: {{ product.stockQty }}
              </span>
            </div>

            <!-- Real Product Image with Frame -->
            <div class="product-img-box mb-3 d-flex align-items-center justify-content-center mx-auto rounded-3 bg-light">
              <img
                :src="product.image"
                :alt="product.name"
                class="img-fluid rounded object-fit-contain product-img"
                loading="lazy"
              />
            </div>

            <!-- Product Details -->
            <div class="fw-bold text-dark small mb-1 text-truncate" :title="product.name">
              {{ product.name }}
            </div>
            
            <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
              <div class="product-price fw-bolder fs-6 text-primary">
                {{ formatCurrency(product.unitPrice) }}
              </div>
              <button
                type="button"
                class="btn btn-sm btn-quick-add rounded-circle p-0 d-flex align-items-center justify-content-center"
                title="Add to cart"
                :disabled="product.stockQty <= 0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="col-12 py-5 text-center text-muted card bg-white border-0">
          <div class="fs-1 mb-2">🔍</div>
          <div class="fw-bold text-dark">No products found</div>
          <div class="small text-muted">Try adjusting your search query or category filter</div>
        </div>
      </div>
    </div>

    <!-- Right Column: Order Checkout Cart Panel -->
    <div class="col-lg-5 col-xl-5">
      <div class="card shadow-md border-0 rounded-3 overflow-hidden sticky-top" style="top: 1rem;">
        <!-- Order Header with Order ID and Clear Action -->
        <div class="order-panel-header px-4 py-3 d-flex justify-content-between align-items-center text-white" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);">
          <div class="d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span class="fw-bold">Current Order</span>
            <span class="badge bg-white bg-opacity-25 rounded-pill small">
              {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }}
            </span>
          </div>

          <button
            v-if="cartItems.length > 0"
            type="button"
            class="btn btn-sm btn-outline-light py-0 px-2 rounded-pill small text-white border-white border-opacity-50"
            style="font-size: 0.75rem;"
            @click="clearCart"
            title="Clear Cart (Esc)"
          >
            Clear (Esc)
          </button>
        </div>

        <!-- Order Table Columns -->
        <div class="px-3 py-2 bg-light border-bottom text-muted small fw-bold d-flex" style="font-size: 0.72rem; letter-spacing: 0.03em;">
          <div style="flex: 2;">PRODUCT</div>
          <div style="flex: 1.5;" class="text-center">QTY</div>
          <div style="flex: 1.2;" class="text-end">PRICE</div>
          <div style="flex: 1.3;" class="text-end">TOTAL</div>
        </div>

        <!-- Order Items List -->
        <div class="cart-items-body p-3" style="max-height: 280px; min-height: 160px; overflow-y: auto;">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-row d-flex align-items-center py-2 border-bottom border-light"
          >
            <!-- Product Info with Thumbnail -->
            <div style="flex: 2; min-width: 0;" class="d-flex align-items-center gap-2">
              <img
                v-if="item.product.image"
                :src="item.product.image"
                :alt="item.product.name"
                class="rounded-3 object-fit-contain border bg-light flex-shrink-0 p-1"
                style="width: 38px; height: 38px;"
              />
              <div class="text-truncate">
                <div class="small fw-bold text-dark text-truncate">{{ item.product.name }}</div>
                <div class="text-muted font-monospace" style="font-size: 0.7rem;">{{ item.product.sku }}</div>
              </div>
            </div>

            <!-- Stepper -->
            <div style="flex: 1.5;" class="d-flex align-items-center justify-content-center">
              <div class="qty-stepper d-inline-flex align-items-center bg-light border rounded-pill px-1">
                <button
                  type="button"
                  class="btn btn-sm btn-link p-0 text-muted px-2 text-decoration-none fw-bold"
                  @click="updateQuantity(item.product.id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="small px-1 fw-bold text-dark font-monospace">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="btn btn-sm btn-link p-0 text-primary px-2 text-decoration-none fw-bold"
                  :disabled="item.quantity >= item.product.stockQty"
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Price -->
            <div style="flex: 1.2;" class="text-end small text-muted font-monospace">
              {{ formatCurrency(item.unitPrice) }}
            </div>

            <!-- Total & Remove -->
            <div style="flex: 1.3;" class="text-end small fw-bold text-dark font-monospace">
              {{ formatCurrency(item.lineTotal) }}
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="text-center py-5 text-muted small">
            <div class="fs-1 mb-2">🛒</div>
            <div class="fw-bold text-dark">Cart is Empty</div>
            <div class="text-muted">Click products from the catalog to add items</div>
          </div>
        </div>

        <!-- Summary Totals Section -->
        <div class="p-3 bg-white border-top">
          <div class="d-flex justify-content-between mb-1 small">
            <span class="text-muted fw-semibold">Subtotal:</span>
            <span class="fw-bold text-dark font-monospace">{{ formatCurrency(totals.subtotal) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 small align-items-center">
            <span class="text-muted fw-semibold d-flex align-items-center gap-1">
              <span>Discount ({{ discountPercent }}%):</span>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill" style="font-size: 0.65rem;">Promo</span>
            </span>
            <span class="fw-bold text-success font-monospace">-{{ formatCurrency(totals.discountTotal) }}</span>
          </div>

          <div class="d-flex justify-content-between mb-2 small">
            <span class="text-muted fw-semibold">Tax ({{ taxPercent }}%):</span>
            <span class="fw-bold text-secondary font-monospace">{{ formatCurrency(totals.taxTotal) }}</span>
          </div>

          <!-- Grand Total Hero Box -->
          <div class="d-flex justify-content-between align-items-baseline p-3 rounded-3 bg-light border mt-2">
            <div>
              <span class="fs-6 fw-bolder text-dark d-block">Grand Total:</span>
              <span class="text-muted small" style="font-size: 0.7rem;">Includes discount & tax</span>
            </div>
            <span class="fs-3 fw-bolder text-primary font-monospace">
              {{ formatCurrency(totals.grandTotal) }}
            </span>
          </div>
        </div>

        <!-- Payment Input & Tendered -->
        <div class="p-3 bg-light border-top">
          <!-- Payment Method Tabs -->
          <div class="d-flex gap-2 mb-3">
            <button
              type="button"
              class="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              :class="paymentMethod === 'cash' ? 'btn-primary' : 'btn-white border text-dark'"
              @click="paymentMethod = 'cash'"
            >
              <span>💵</span>
              <span>Cash</span>
            </button>
            <button
              type="button"
              class="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              :class="paymentMethod === 'card' ? 'btn-primary' : 'btn-white border text-secondary'"
              @click="paymentMethod = 'card'"
            >
              <span>💳</span>
              <span>Card</span>
            </button>
            <button
              type="button"
              class="btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1"
              :class="paymentMethod === 'qr' ? 'btn-primary' : 'btn-white border text-secondary'"
              @click="paymentMethod = 'qr'"
            >
              <span>📱</span>
              <span>QR Pay</span>
            </button>
          </div>

          <!-- Amount Tendered -->
          <div class="mb-2">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="small fw-semibold text-muted">Amount Tendered:</span>
              <span class="small text-muted font-monospace">Due: {{ formatCurrency(totals.grandTotal) }}</span>
            </div>
            <div class="input-group">
              <span class="input-group-text bg-white fw-bold text-muted">$</span>
              <input
                ref="tenderedInputRef"
                type="number"
                step="0.01"
                min="0"
                class="form-control text-end fw-bold fs-5 font-monospace"
                placeholder="0.00"
                v-model.number="amountTendered"
                @keydown.enter="canSubmit ? handleCompleteSale() : null"
              />
            </div>
          </div>

          <!-- Quick Cash Bill Presets (Single-tap cash tender) -->
          <div class="d-flex flex-wrap gap-1 mb-3">
            <button
              v-for="bill in quickCashBills"
              :key="bill.label"
              type="button"
              class="btn btn-xs quick-bill-chip flex-grow-1 font-monospace"
              :class="amountTendered === bill.value ? 'active' : ''"
              @click="amountTendered = bill.value"
            >
              {{ bill.label }}
            </button>
          </div>

          <!-- Change Banner -->
          <div
            class="change-banner p-3 text-center rounded-3 mb-3 fw-bold font-monospace transition-all"
            :class="isUnderpaid ? 'bg-danger-subtle text-danger border border-danger' : 'bg-success-subtle text-success border border-success shadow-sm'"
          >
            <div v-if="isUnderpaid" class="d-flex align-items-center justify-content-center gap-2">
              <span>⚠️ Shortfall:</span>
              <span class="fs-6">{{ formatCurrency(shortfall) }}</span>
            </div>
            <div v-else class="d-flex align-items-center justify-content-between px-2">
              <span class="small text-success text-uppercase">Change Due:</span>
              <span class="fs-5 fw-bolder">{{ formatCurrency(changeAmount) }}</span>
            </div>
          </div>

          <!-- Complete Sale Button -->
          <div class="d-grid gap-2">
            <button
              type="button"
              class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 shadow-glow-blue py-3 fw-bold"
              :disabled="!canSubmit"
              @click="handleCompleteSale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Complete Sale</span>
              <span class="badge bg-white bg-opacity-25 text-white font-monospace small ms-1">F4</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt Modal Dialog after Checkout -->
    <div
      v-if="lastCompletedSale"
      class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
      @click.self="lastCompletedSale = null"
    >
      <div class="card shadow-xl border-0 p-4 bg-white rounded-4" style="max-width: 420px; width: 100%;">
        <div class="text-center mb-3">
          <div class="check-icon-circle mx-auto mb-2 text-white shadow-glow-green">
            ✓
          </div>
          <h5 class="fw-bold text-dark mb-1">Sale Completed!</h5>
          <div class="text-muted small">Receipt No: <span class="font-monospace fw-bold text-dark">{{ lastCompletedSale.receiptNo }}</span></div>
        </div>

        <div class="p-3 bg-light rounded-3 mb-3 small font-monospace">
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Total Paid:</span>
            <span class="fw-bold">{{ formatCurrency(lastCompletedSale.amountTendered) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span class="text-muted">Grand Total:</span>
            <span class="fw-bold">{{ formatCurrency(lastCompletedSale.grandTotal) }}</span>
          </div>
          <div class="d-flex justify-content-between pt-1 border-top text-success fw-bold">
            <span>Change Returned:</span>
            <span>{{ formatCurrency(lastCompletedSale.changeDue) }}</span>
          </div>
        </div>

        <div class="d-grid gap-2">
          <NuxtLink :to="`/receipts/${lastCompletedSale.id}`" class="btn btn-primary d-flex align-items-center justify-content-center gap-2">
            <span>🖨️ View & Print Receipt Slip</span>
          </NuxtLink>
          <button type="button" class="btn btn-light border" @click="lastCompletedSale = null">
            Start Next Sale
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { useProduct } from '~/composables/useProduct'
import { useSale } from '~/composables/useSale'
import { userAuth } from '~/composables/userAuth'
import { formatCurrency } from '~/utils/currency'
import type { Product } from '~/types/product'

const {
  items: cartItems,
  discountPercent,
  taxPercent,
  totals,
  addToCart,
  updateQuantity,
  clearCart
} = useCart()

const { products } = useProduct()
const { createSale } = useSale()
const { currentUser } = userAuth()

const searchQuery = ref('')
const selectedCategory = ref('all')
const paymentMethod = ref<'cash' | 'card' | 'qr'>('cash')
const amountTendered = ref<number>(400.00)
const lastCompletedSale = ref<any>(null)
const addedToastMessage = ref('')
let toastTimer: any = null

const searchInputRef = ref<HTMLInputElement | null>(null)
const tenderedInputRef = ref<HTMLInputElement | null>(null)

const categories = [
  { id: 'cat_shoes', name: 'Footwear' },
  { id: 'cat_shirts', name: 'Apparel' },
  { id: 'cat_acc', name: 'Accessories' }
]

const getCategoryCount = (catId: string) => {
  return products.value.filter(p => p.categoryId === catId).length
}

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesCategory = selectedCategory.value === 'all' || p.categoryId === selectedCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
})

const changeAmount = computed(() => {
  if (amountTendered.value === undefined || amountTendered.value === null) return 0
  const diff = amountTendered.value - totals.value.grandTotal
  return diff > 0 ? Math.round(diff * 100) / 100 : 0
})

const shortfall = computed(() => {
  if (amountTendered.value === undefined || amountTendered.value === null) return totals.value.grandTotal
  const diff = totals.value.grandTotal - amountTendered.value
  return diff > 0 ? Math.round(diff * 100) / 100 : 0
})

const isUnderpaid = computed(() => {
  if (cartItems.value.length === 0) return false
  return (amountTendered.value ?? 0) < totals.value.grandTotal
})

const canSubmit = computed(() => {
  return (
    cartItems.value.length > 0 &&
    (amountTendered.value ?? 0) >= totals.value.grandTotal
  )
})

const quickCashBills = computed(() => {
  const g = totals.value.grandTotal
  return [
    { label: 'Exact', value: g },
    { label: '$20', value: 20 },
    { label: '$50', value: 50 },
    { label: '$100', value: 100 },
    { label: '$400', value: 400 }
  ]
})

const handleAddToCart = (product: Product) => {
  addToCart(product, 1)
  if (amountTendered.value < totals.value.grandTotal) {
    amountTendered.value = totals.value.grandTotal
  }
  addedToastMessage.value = `Added ${product.name} to cart`
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    addedToastMessage.value = ''
  }, 1800)
}

const handleSkuEnter = () => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return
  const exact = products.value.find(p => p.sku.toLowerCase() === q || p.name.toLowerCase() === q)
  if (exact && exact.stockQty > 0) {
    handleAddToCart(exact)
    searchQuery.value = ''
  }
}

const handleCompleteSale = () => {
  if (!canSubmit.value) return
  const sale = createSale({
    items: cartItems.value.map(i => ({ ...i })),
    subtotal: totals.value.subtotal,
    discountPercent: discountPercent.value,
    discountTotal: totals.value.discountTotal,
    taxPercent: taxPercent.value,
    taxTotal: totals.value.taxTotal,
    grandTotal: totals.value.grandTotal,
    amountTendered: amountTendered.value,
    changeDue: changeAmount.value,
    paymentMethod: paymentMethod.value,
    cashierId: currentUser.value?.id || 'usr_01',
    cashierName: currentUser.value?.name || 'Rathana'
  })

  lastCompletedSale.value = sale
  clearCart()
  amountTendered.value = 0
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === '/' && document.activeElement !== searchInputRef.value) {
    e.preventDefault()
    searchInputRef.value?.focus()
  } else if (e.key === 'F4') {
    e.preventDefault()
    if (canSubmit.value) {
      handleCompleteSale()
    } else {
      tenderedInputRef.value?.focus()
    }
  } else if (e.key === 'Escape') {
    if (lastCompletedSale.value) {
      lastCompletedSale.value = null
    } else if (cartItems.value.length > 0) {
      clearCart()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (cartItems.value.length === 0 && products.value.length >= 2) {
    const shoes = products.value.find(p => p.sku === 'SKU-001')
    const tshirt = products.value.find(p => p.sku === 'SKU-002')
    if (shoes) addToCart(shoes, 1)
    if (tshirt) addToCart(tshirt, 2)
    amountTendered.value = 400.00
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  clearTimeout(toastTimer)
})
</script>

<style scoped>
.search-bar-wrapper {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.search-bar-wrapper:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.category-chip {
  border-radius: 999px;
  padding: 6px 14px;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-chip.active {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border-color: transparent;
}

.category-scroll::-webkit-scrollbar {
  height: 4px;
}

.product-card {
  border-radius: 16px !important;
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-img-box {
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: #f8fafc;
}

.product-img {
  height: 85px;
  width: auto;
  max-width: 100%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

.btn-quick-add {
  width: 28px;
  height: 28px;
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  transition: all 0.15s ease;
}

.product-card:hover .btn-quick-add {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.quick-bill-chip {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  padding: 4px 6px;
  transition: all 0.15s ease;
}

.quick-bill-chip:hover {
  background-color: #f1f5f9;
  border-color: #94a3b8;
}

.quick-bill-chip.active {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1050;
}

.check-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.toast-alert {
  animation: slide-up 0.25s ease-out;
}

@keyframes slide-up {
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}
</style>