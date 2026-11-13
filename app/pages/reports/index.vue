<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">📊 Daily Sales & Revenue Reports</h5>
        <div class="text-muted small">
          Comprehensive audit breakdown of gross volume, discounts, taxes and product performance
        </div>
      </div>
      <button class="btn btn-outline-secondary btn-sm px-3 d-flex align-items-center gap-1 rounded-pill" @click="printReport">
        <span>🖨️</span>
        <span class="fw-semibold">Print Report</span>
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white rounded-4 hover-lift">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.03em;">Gross Revenue</div>
          <h3 class="fw-bolder text-success mb-0 mt-2 font-monospace">{{ formatCurrency(metrics.totalRevenue) }}</h3>
          <div class="text-muted small mt-1" style="font-size: 0.7rem;">Audited across all transactions</div>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white rounded-4 hover-lift">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.03em;">Discounts Granted</div>
          <h3 class="fw-bolder text-danger mb-0 mt-2 font-monospace">-{{ formatCurrency(metrics.totalDiscountsGiven) }}</h3>
          <div class="text-muted small mt-1" style="font-size: 0.7rem;">10% promotional discounts</div>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white rounded-4 hover-lift">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.03em;">VAT / Taxes Collected</div>
          <h3 class="fw-bolder text-primary mb-0 mt-2 font-monospace">{{ formatCurrency(metrics.totalTaxCollected) }}</h3>
          <div class="text-muted small mt-1" style="font-size: 0.7rem;">8% standard sales tax</div>
        </div>
      </div>

      <div class="col-sm-6 col-xl-3">
        <div class="card p-3 border-0 shadow-sm bg-white rounded-4 hover-lift">
          <div class="text-muted small fw-semibold text-uppercase" style="font-size: 0.72rem; letter-spacing: 0.03em;">Completed Orders</div>
          <h3 class="fw-bolder text-dark mb-0 mt-2 font-monospace">{{ metrics.totalCompletedTransactions }} orders</h3>
          <div class="text-muted small mt-1" style="font-size: 0.7rem;">100% processed without error</div>
        </div>
      </div>
    </div>

    <!-- Top Products Ranking Table -->
    <div class="card shadow-sm border-0 bg-white rounded-4 overflow-hidden">
      <div class="card-header bg-white py-3 px-4 border-0 d-flex justify-content-between align-items-center">
        <div>
          <h6 class="fw-bold text-dark mb-0">Product Sales Ranking by Volume & Revenue</h6>
          <div class="text-muted small" style="font-size: 0.72rem;">Top grossing items by quantity and net sales</div>
        </div>
      </div>
      <div class="table-responsive px-3">
        <table class="table table-hover align-middle mb-0">
          <thead class="small text-uppercase text-muted" style="border-top: 1px solid #f1f5f9; font-size: 0.72rem; letter-spacing: 0.04em;">
            <tr>
              <th scope="col" class="ps-3" style="width: 70px;">Rank</th>
              <th scope="col">Product Name</th>
              <th scope="col">SKU</th>
              <th scope="col" class="text-center">Units Sold</th>
              <th scope="col" class="text-end pe-3">Revenue Generated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prod, idx) in topSellingProducts" :key="prod.productId">
              <td class="ps-3 fw-bold font-monospace">
                <span class="badge rounded-circle" :class="idx === 0 ? 'bg-warning text-dark' : idx === 1 ? 'bg-secondary text-white' : 'bg-light text-muted border'">
                  {{ idx + 1 }}
                </span>
              </td>
              <td class="fw-bold text-dark small">{{ prod.name }}</td>
              <td class="font-monospace text-primary small">{{ prod.sku }}</td>
              <td class="text-center">
                <span class="badge bg-primary-subtle text-primary fw-bold rounded-pill font-monospace">
                  {{ prod.quantitySold }} units
                </span>
              </td>
              <td class="text-end pe-3 fw-bold text-dark font-monospace">{{ formatCurrency(prod.totalRevenue) }}</td>
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
