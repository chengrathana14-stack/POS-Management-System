<template>
  <div class="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="small text-uppercase text-muted" style="border-top: 1px solid #f1f5f9; font-size: 0.72rem; letter-spacing: 0.04em;">
          <tr>
            <th scope="col" class="ps-4">SKU</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col" class="text-end">Selling Price</th>
            <th scope="col" class="text-center">Stock Quantity</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-end pe-4" v-if="isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" :class="{ 'opacity-50': !product.active }">
            <td class="ps-4 fw-bold font-monospace text-primary small">
              {{ product.sku }}
            </td>
            <td>
              <div class="d-flex align-items-center gap-3">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="rounded-3 object-fit-contain border bg-light flex-shrink-0 p-1"
                  style="width: 38px; height: 38px;"
                />
                <div>
                  <div class="fw-bold text-dark small">{{ product.name }}</div>
                  <div class="text-muted font-monospace" style="font-size: 0.7rem;">ID: #{{ product.id }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="badge bg-light text-secondary border rounded-pill px-2 py-1 small">
                {{ product.categoryName || 'Unassigned' }}
              </span>
            </td>
            <td class="text-end fw-bold font-monospace small text-dark">
              {{ formatCurrency(product.unitPrice) }}
            </td>
            <td class="text-center">
              <span
                class="badge rounded-pill font-monospace"
                :class="product.stockQty > 5 ? 'bg-success-subtle text-success' : product.stockQty > 0 ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'"
                style="font-size: 0.75rem;"
              >
                {{ product.stockQty }} units
              </span>
            </td>
            <td class="text-center">
              <span class="badge rounded-pill" :class="product.active ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'">
                {{ product.active ? '● Active' : '○ Disabled' }}
              </span>
            </td>
            <td class="text-end pe-4" v-if="isAdmin">
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm rounded-pill px-3 me-1"
                  @click="$emit('edit', product)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-sm rounded-pill px-3"
                  :class="product.active ? 'btn-outline-danger' : 'btn-outline-success'"
                  @click="$emit('toggle-active', product.id)"
                >
                  {{ product.active ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="products.length === 0">
            <td :colspan="isAdmin ? 7 : 6" class="text-center py-5 text-muted">
              <h6>No products match the filter criteria</h6>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { formatCurrency } from '~/utils/currency'

defineProps<{
  products: Product[]
  isAdmin: boolean
}>()

defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'toggle-active', id: number): void
}>()
</script>
