<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">📊 Daily Sales & Revenue Reports</h5>
        <div class="text-muted small">
          Comprehensive audit breakdown of gross volume, discounts, sales taxes and product performance (FR-09)
        </div>
      </div>
      <button class="btn btn-outline-secondary btn-sm px-3 d-flex align-items-center gap-1" @click="printReport">
        <span>🖨️</span>
        <span>Print Report</span>
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem;">Gross Revenue</div>
          <h4 class="fw-bolder text-success mb-0 mt-1">{{ formatCurrency(metrics.totalRevenue) }}</h4>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem;">Discounts Granted</div>
          <h4 class="fw-bolder text-danger mb-0 mt-1">-{{ formatCurrency(metrics.totalDiscountsGiven) }}</h4>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem;">VAT / Taxes Collected</div>
          <h4 class="fw-bolder text-primary mb-0 mt-1">{{ formatCurrency(metrics.totalTaxCollected) }}</h4>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem;">Completed Orders</div>
          <h4 class="fw-bolder text-dark mb-0 mt-1">{{ metrics.totalCompletedTransactions }} orders</h4>
        </div>
      </div>
    </div>

    <!-- Top Products Ranking Table -->
    <div class="card shadow-sm border-0 bg-white">
      <div class="card-header bg-white py-3 border-0">
        <h6 class="fw-bold text-dark mb-0">Product Sales Ranking by Volume & Revenue</h6>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light small text-uppercase text-muted">
            <tr>
              <th scope="col" style="width: 60px;">Rank</th>
              <th scope="col">Product Name</th>
              <th scope="col">SKU</th>
              <th scope="col" class="text-center">Units Sold</th>
              <th scope="col" class="text-end">Revenue Generated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prod, idx) in topSellingProducts" :key="prod.productId">
              <td class="fw-bold font-monospace text-muted">#{{ idx + 1 }}</td>
              <td class="fw-bold text-dark">{{ prod.name }}</td>
              <td class="font-monospace text-primary small">{{ prod.sku }}</td>
              <td class="text-center">
                <span class="badge bg-primary-subtle text-primary fw-bold">{{ prod.quantitySold }} units</span>
              </td>
              <td class="text-end fw-bold text-dark">{{ formatCurrency(prod.totalRevenue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReports } from '~/composables/useReports'
import { formatCurrency } from '~/utils/currency'

const { metrics, topSellingProducts } = useReports()

const printReport = () => {
  window.print()
}
</script>
