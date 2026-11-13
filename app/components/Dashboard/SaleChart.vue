<template>
  <div class="card shadow-sm border-0 h-100">
    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
      <h6 class="mb-0 fw-bold text-dark">📊 Top-Selling Products Performance</h6>
      <span class="badge bg-light text-muted border">Units Sold</span>
    </div>

    <div class="card-body p-3">
      <div v-if="topSellingProducts.length > 0" class="d-flex flex-column gap-3">
        <div v-for="item in topSellingProducts.slice(0, 5)" :key="item.productId">
          <div class="d-flex justify-content-between small mb-1">
            <span class="fw-semibold text-dark">{{ item.name }}</span>
            <span class="text-muted">{{ item.quantitySold }} sold ({{ formatCurrency(item.totalRevenue) }})</span>
          </div>
          <div class="progress" style="height: 10px;">
            <div
              class="progress-bar bg-primary"
              role="progressbar"
              :style="{ width: `${Math.min(100, (item.quantitySold / maxSold) * 100)}%` }"
              :aria-valuenow="item.quantitySold"
              aria-valuemin="0"
              :aria-valuemax="maxSold"
            ></div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5 text-muted small">
        No sales completed yet today. Checkout sales on the POS register to see analytics.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useReports } from '~/composables/useReports'
import { formatCurrency } from '~/utils/currency'

const { topSellingProducts } = useReports()

const maxSold = computed(() => {
  if (topSellingProducts.value.length === 0) return 1
  return Math.max(...topSellingProducts.value.map((p) => p.quantitySold))
})
</script>
