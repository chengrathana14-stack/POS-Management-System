<template>
  <div class="card shadow-sm border-0">
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light small text-uppercase text-muted">
          <tr>
            <th scope="col">SKU</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col" class="text-end">Selling Price</th>
            <th scope="col" class="text-center">Stock Quantity</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-end" v-if="isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" :class="{ 'opacity-50': !product.active }">
            <td class="fw-bold font-monospace text-primary">
              {{ product.sku }}
            </td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="rounded object-fit-contain border bg-light flex-shrink-0"
                  style="width: 32px; height: 32px;"
                />
                <div class="fw-semibold text-dark">{{ product.name }}</div>
              </div>
            </td>
            <td>
              <span class="badge bg-light text-secondary border">
                {{ product.categoryName || 'Unassigned' }}
              </span>
            </td>
            <td class="text-end fw-bold">
              {{ formatCurrency(product.unitPrice) }}
            </td>
            <td class="text-center">
              <span
                class="badge"
                :class="product.stockQty > 5 ? 'bg-success' : product.stockQty > 0 ? 'bg-warning text-dark' : 'bg-danger'"
              >
                {{ product.stockQty }} units
              </span>
            </td>
            <td class="text-center">
              <span class="badge" :class="product.active ? 'bg-success-subtle text-success' : 'bg-secondary'">
                {{ product.active ? 'Active' : 'Archived' }}
              </span>
            </td>
            <td class="text-end" v-if="isAdmin">
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="$emit('edit', product)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="product.active ? 'btn-outline-warning' : 'btn-outline-success'"
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

