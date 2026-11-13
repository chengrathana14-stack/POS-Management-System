<template>
  <div class="card shadow-sm border-0 h-100">
    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
      <h6 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
        <span>⚠️ Low Stock Alert</span>
        <span class="badge bg-danger rounded-pill">{{ lowStockProducts.length }}</span>
      </h6>
      <NuxtLink to="/products" class="btn btn-outline-secondary btn-sm" style="font-size: 0.75rem;">
        Manage Inventory
      </NuxtLink>
    </div>

    <div class="card-body p-0">
      <div v-if="lowStockProducts.length > 0" class="list-group list-group-flush">
        <div
          v-for="prod in lowStockProducts"
          :key="prod.id"
          class="list-group-item d-flex justify-content-between align-items-center p-3"
        >
          <div class="d-flex align-items-center gap-2">
            <img
              v-if="prod.image"
              :src="prod.image"
              :alt="prod.name"
              class="rounded object-fit-contain border bg-light flex-shrink-0"
              style="width: 36px; height: 36px;"
            />
            <div>
              <div class="fw-semibold text-dark">{{ prod.name }}</div>
              <div class="text-muted small font-monospace">{{ prod.sku }} • {{ prod.categoryName }}</div>
            </div>
          </div>
          <span
            class="badge"
            :class="prod.stockQty === 0 ? 'bg-danger' : 'bg-warning text-dark'"
          >
            {{ prod.stockQty === 0 ? 'Out of stock' : `${prod.stockQty} remaining` }}
          </span>
        </div>
      </div>

      <div v-else class="text-center py-4 text-muted small">
        ✅ All product inventory levels are healthy!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProduct } from '~/composables/useProduct'

const { products } = useProduct()

const lowStockProducts = computed(() => {
  return products.value.filter((p) => p.active && p.stockQty <= 5)
})
</script>
