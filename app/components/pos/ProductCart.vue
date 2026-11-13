<template>
  <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-2">
    <div
      v-for="product in products"
      :key="product.id"
      class="col"
    >
      <div
        class="card h-100 shadow-sm border-0 product-card position-relative"
        :class="{ 'opacity-50': product.stockQty <= 0 }"
        @click="product.stockQty > 0 ? $emit('select', product) : null"
      >
        <div class="card-body p-3 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-start mb-1">
              <span class="badge bg-light text-secondary border small" style="font-size: 0.7rem;">
                {{ product.sku }}
              </span>
              <span
                class="badge"
                :class="product.stockQty > 5 ? 'bg-success-subtle text-success' : product.stockQty > 0 ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'"
                style="font-size: 0.7rem;"
              >
                {{ product.stockQty > 0 ? `${product.stockQty} in stock` : 'Out of stock' }}
              </span>
            </div>
            <h6 class="card-title text-dark fw-bold mb-1 text-truncate" :title="product.name">
              {{ product.name }}
            </h6>
            <div class="text-muted small mb-2">{{ product.categoryName }}</div>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
            <span class="fs-5 fw-bold text-primary">
              {{ formatCurrency(product.unitPrice) }}
            </span>
            <button
              class="btn btn-sm"
              :class="product.stockQty > 0 ? 'btn-primary' : 'btn-secondary'"
              :disabled="product.stockQty <= 0"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="products.length === 0" class="col-12 py-5 text-center text-muted">
      <h5>No matching products found</h5>
      <p class="small">Try adjusting your search query or category filter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { formatCurrency } from '~/utils/currency'

defineProps<{
  products: Product[]
}>()

defineEmits<{
  (e: 'select', product: Product): void
}>()
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}
</style>

