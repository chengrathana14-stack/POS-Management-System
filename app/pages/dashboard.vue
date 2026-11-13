<template>
  <div>
    <!-- 4 Colorful Metric Cards Row (Matching Bottom-Left Mockup) -->
    <div class="row g-3 mb-4">
      <!-- 1. Today's Sales (Blue) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-3 shadow-sm" style="background-color: #1877f2;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="metric-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </span>
            <span class="small fw-semibold text-white-50">Today's Sales</span>
          </div>
          <div class="d-flex align-items-baseline justify-content-between">
            <h3 class="fw-bolder mb-0">$1,250.00</h3>
            <span class="badge bg-white bg-opacity-25 text-white small" style="font-size: 0.72rem;">↑ 12%</span>
          </div>
        </div>
      </div>

      <!-- 2. Transactions (Green) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-3 shadow-sm" style="background-color: #10b981;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="metric-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </span>
            <span class="small fw-semibold text-white-50">Transactions</span>
          </div>
          <div class="d-flex align-items-baseline justify-content-between">
            <h3 class="fw-bolder mb-0">25</h3>
            <span class="badge bg-white bg-opacity-25 text-white small" style="font-size: 0.72rem;">Completed</span>
          </div>
        </div>
      </div>

      <!-- 3. Total Products (Purple) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-3 shadow-sm" style="background-color: #8b5cf6;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="metric-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </span>
            <span class="small fw-semibold text-white-50">Total Products</span>
          </div>
          <div class="d-flex align-items-baseline justify-content-between">
            <h3 class="fw-bolder mb-0">120</h3>
            <span class="badge bg-white bg-opacity-25 text-white small" style="font-size: 0.72rem;">In Catalog</span>
          </div>
        </div>
      </div>

      <!-- 4. Low Stock (Orange) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-3 shadow-sm" style="background-color: #f97316;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="metric-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            </span>
            <span class="small fw-semibold text-white-50">Low Stock</span>
          </div>
          <div class="d-flex align-items-baseline justify-content-between">
            <h3 class="fw-bolder mb-0">3</h3>
            <span class="badge bg-white bg-opacity-25 text-white small" style="font-size: 0.72rem;">Attention</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Performance Row -->
    <div class="row g-3">
      <!-- Sales Overview Area Chart (Left) -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-3 p-4 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 class="fw-bold text-dark mb-0">Sales Overview</h6>
              <div class="text-muted small" style="font-size: 0.75rem;">Revenue trajectory across current period</div>
            </div>
            <select class="form-select form-select-sm border-light bg-light fw-medium" style="width: 125px;" v-model="selectedPeriod">
              <option value="week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <!-- SVG Smooth Area / Line Chart with Tooltips -->
          <div class="chart-container position-relative" style="height: 250px;">
            <svg viewBox="0 0 600 240" class="w-100 h-100" preserveAspectRatio="none">
              <!-- Horizontal Grid Lines -->
              <line x1="50" y1="30" x2="580" y2="30" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="90" x2="580" y2="90" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="150" x2="580" y2="150" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="210" x2="580" y2="210" stroke="#f1f5f9" stroke-width="1.5" />

              <!-- Y-Axis Labels -->
              <text x="40" y="35" text-anchor="end" fill="#94a3b8" font-size="11">1,500</text>
              <text x="40" y="95" text-anchor="end" fill="#94a3b8" font-size="11">1,000</text>
              <text x="40" y="155" text-anchor="end" fill="#94a3b8" font-size="11">500</text>
              <text x="40" y="215" text-anchor="end" fill="#94a3b8" font-size="11">0</text>

              <!-- Chart Gradient Fill -->
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#1877f2" stop-opacity="0.30"/>
                  <stop offset="100%" stop-color="#1877f2" stop-opacity="0.0"/>
                </linearGradient>
              </defs>

              <!-- Area Fill -->
              <path
                d="M 60,190 L 140,165 L 220,150 L 300,150 L 380,85 L 460,115 L 540,140 L 540,210 L 60,210 Z"
                fill="url(#chartGradient)"
              />

              <!-- Line Stroke -->
              <path
                d="M 60,190 L 140,165 L 220,150 L 300,150 L 380,85 L 460,115 L 540,140"
                fill="none"
                stroke="#1877f2"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- Data Point Dots -->
              <circle cx="60" cy="190" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="140" cy="165" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="220" cy="150" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="300" cy="150" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="380" cy="85" r="6" fill="#1877f2" stroke="#ffffff" stroke-width="3" />
              <circle cx="460" cy="115" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="540" cy="140" r="5" fill="#1877f2" stroke="#ffffff" stroke-width="2.5" />

              <!-- Peak indicator value -->
              <text x="380" y="70" text-anchor="middle" fill="#1877f2" font-size="11" font-weight="bold">$1,250</text>

              <!-- X-Axis Labels -->
              <text x="60" y="232" text-anchor="middle" fill="#64748b" font-size="11">Mon</text>
              <text x="140" y="232" text-anchor="middle" fill="#64748b" font-size="11">Tue</text>
              <text x="220" y="232" text-anchor="middle" fill="#64748b" font-size="11">Wed</text>
              <text x="300" y="232" text-anchor="middle" fill="#64748b" font-size="11">Thu</text>
              <text x="380" y="232" text-anchor="middle" fill="#64748b" font-size="11">Fri</text>
              <text x="460" y="232" text-anchor="middle" fill="#64748b" font-size="11">Sat</text>
              <text x="540" y="232" text-anchor="middle" fill="#64748b" font-size="11">Sun</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Top Selling Products (Right) -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-3 p-4 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h6 class="fw-bold text-dark mb-0">Top Selling Products</h6>
            <NuxtLink to="/products" class="btn btn-xs btn-link text-decoration-none text-primary p-0">View All</NuxtLink>
          </div>

          <div class="d-flex flex-column gap-3">
            <!-- 1. Mizuno Shoes -->
            <div class="d-flex align-items-center justify-content-between p-2 rounded-2 hover-bg">
              <div class="d-flex align-items-center gap-3">
                <div class="product-thumb d-flex align-items-center justify-content-center bg-light rounded overflow-hidden border p-1" style="width: 46px; height: 46px;">
                  <img src="/images/products/shoes.jpg" alt="Mizuno Shoes" class="img-fluid object-fit-contain" />
                </div>
                <div>
                  <div class="fw-bold text-dark small">Mizuno Shoes</div>
                  <div class="text-muted" style="font-size: 0.72rem;">$320.00 • Shoe-001</div>
                </div>
              </div>
              <span class="badge bg-primary-subtle text-primary fw-bold" style="font-size: 0.78rem;">45 sold</span>
            </div>

            <!-- 2. T-Shirt -->
            <div class="d-flex align-items-center justify-content-between p-2 rounded-2 hover-bg">
              <div class="d-flex align-items-center gap-3">
                <div class="product-thumb d-flex align-items-center justify-content-center bg-light rounded overflow-hidden border p-1" style="width: 46px; height: 46px;">
                  <img src="/images/products/tshirt.jpg" alt="T-Shirt" class="img-fluid object-fit-contain" />
                </div>
                <div>
                  <div class="fw-bold text-dark small">T-Shirt</div>
                  <div class="text-muted" style="font-size: 0.72rem;">$25.00 • TSH-002</div>
                </div>
              </div>
              <span class="badge bg-primary-subtle text-primary fw-bold" style="font-size: 0.78rem;">38 sold</span>
            </div>

            <!-- 3. Water Bottle -->
            <div class="d-flex align-items-center justify-content-between p-2 rounded-2 hover-bg">
              <div class="d-flex align-items-center gap-3">
                <div class="product-thumb d-flex align-items-center justify-content-center bg-light rounded overflow-hidden border p-1" style="width: 46px; height: 46px;">
                  <img src="/images/products/bottle.jpg" alt="Water Bottle" class="img-fluid object-fit-contain" />
                </div>
                <div>
                  <div class="fw-bold text-dark small">Water Bottle</div>
                  <div class="text-muted" style="font-size: 0.72rem;">$10.00 • BOT-004</div>
                </div>
              </div>
              <span class="badge bg-primary-subtle text-primary fw-bold" style="font-size: 0.78rem;">30 sold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedPeriod = ref('week')
</script>

<style scoped>
.metric-card {
  transition: all 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12) !important;
}

.metric-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.hover-bg:hover {
  background-color: #f8fafc;
}

.btn-xs {
  font-size: 0.75rem;
}
</style>
