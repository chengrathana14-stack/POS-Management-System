<template>
  <div>
    <!-- 4 High-End Vibrant Gradient Metric Cards (Balanced Layout & No Empty Space) -->
    <div class="row g-3 mb-4">
      <!-- 1. Today's Sales (Blue) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-4 shadow-md position-relative overflow-hidden" style="background: linear-gradient(135deg, #1877f2 0%, #1e40af 100%);">
          <!-- Subtle watermark graphic on the right to fill background -->
          <div class="card-watermark position-absolute end-0 bottom-0 mb-n2 me-n2 text-white" style="opacity: 0.08; pointer-events: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </div>

          <!-- Top Row: Icon Box + Title + Trend Pill -->
          <div class="d-flex justify-content-between align-items-center mb-3 position-relative z-1">
            <div class="d-flex align-items-center gap-2">
              <div class="glass-icon-box rounded-3 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </div>
              <span class="small fw-semibold text-white">Today's Sales</span>
            </div>

            <!-- Trend Pill with Visible White Text -->
            <span class="glass-badge font-monospace">
              ↑ 12.4%
            </span>
          </div>

          <!-- Bottom Row: Big Figure on Left + Interactive Sparkline on Right -->
          <div class="d-flex justify-content-between align-items-end position-relative z-1">
            <div>
              <h3 class="fw-bolder mb-0 font-monospace text-white">$1,250.00</h3>
              <div class="text-white-50 mt-1" style="font-size: 0.72rem;">+ $140.00 vs yesterday</div>
            </div>

            <!-- Right-Side Mini Sparkline -->
            <div class="sparkline-box text-end">
              <svg width="74" height="30" viewBox="0 0 74 30" fill="none">
                <path d="M2 24 L14 18 L26 21 L38 10 L52 14 L70 4" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="70" cy="4" r="3.2" fill="#ffffff" />
              </svg>
              <div class="text-white-50 font-monospace" style="font-size: 0.65rem;">Trending Up</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Transactions (Emerald Green) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-4 shadow-md position-relative overflow-hidden" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%);">
          <div class="card-watermark position-absolute end-0 bottom-0 mb-n2 me-n2 text-white" style="opacity: 0.08; pointer-events: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3 position-relative z-1">
            <div class="d-flex align-items-center gap-2">
              <div class="glass-icon-box rounded-3 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <span class="small fw-semibold text-white">Transactions</span>
            </div>

            <span class="glass-badge font-monospace">
              ● Live
            </span>
          </div>

          <div class="d-flex justify-content-between align-items-end position-relative z-1">
            <div>
              <h3 class="fw-bolder mb-0 font-monospace text-white">25</h3>
              <div class="text-white-50 mt-1" style="font-size: 0.72rem;">Avg: $50.00 / order</div>
            </div>

            <!-- Right-Side Wave Sparkline -->
            <div class="sparkline-box text-end">
              <svg width="74" height="30" viewBox="0 0 74 30" fill="none">
                <path d="M2 16 Q 18 4, 36 16 T 70 8" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" fill="none" />
                <circle cx="70" cy="8" r="3.2" fill="#ffffff" />
              </svg>
              <div class="text-white-50 font-monospace" style="font-size: 0.65rem;">Active Shift</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Total Products (Violet / Purple) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-4 shadow-md position-relative overflow-hidden" style="background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);">
          <div class="card-watermark position-absolute end-0 bottom-0 mb-n2 me-n2 text-white" style="opacity: 0.08; pointer-events: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3 position-relative z-1">
            <div class="d-flex align-items-center gap-2">
              <div class="glass-icon-box rounded-3 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              <span class="small fw-semibold text-white">Total Products</span>
            </div>

            <span class="glass-badge font-monospace">
              Catalog
            </span>
          </div>

          <div class="d-flex justify-content-between align-items-end position-relative z-1">
            <div>
              <h3 class="fw-bolder mb-0 font-monospace text-white">120</h3>
              <div class="text-white-50 mt-1" style="font-size: 0.72rem;">Across 3 categories</div>
            </div>

            <!-- Right-Side Mini Bars -->
            <div class="sparkline-box text-end">
              <svg width="74" height="26" viewBox="0 0 74 26" fill="none">
                <rect x="4" y="14" width="8" height="12" rx="2" fill="#ffffff" fill-opacity="0.4" />
                <rect x="18" y="8" width="8" height="18" rx="2" fill="#ffffff" fill-opacity="0.6" />
                <rect x="32" y="4" width="8" height="22" rx="2" fill="#ffffff" fill-opacity="0.8" />
                <rect x="46" y="10" width="8" height="16" rx="2" fill="#ffffff" fill-opacity="0.5" />
                <rect x="60" y="2" width="8" height="24" rx="2" fill="#ffffff" />
              </svg>
              <div class="text-white-50 font-monospace" style="font-size: 0.65rem;">Stock Levels</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Low Stock Alert (Orange / Amber) -->
      <div class="col-sm-6 col-xl-3">
        <div class="card metric-card text-white p-3 border-0 rounded-4 shadow-md position-relative overflow-hidden" style="background: linear-gradient(135deg, #c2410c 0%, #f97316 100%);">
          <div class="card-watermark position-absolute end-0 bottom-0 mb-n2 me-n2 text-white" style="opacity: 0.08; pointer-events: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3 position-relative z-1">
            <div class="d-flex align-items-center gap-2">
              <div class="glass-icon-box rounded-3 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
              </div>
              <span class="small fw-semibold text-white">Low Stock</span>
            </div>

            <span class="glass-badge font-monospace text-warning bg-warning bg-opacity-25" style="border: 1px solid rgba(253, 224, 71, 0.4);">
              ⚠️ Action
            </span>
          </div>

          <div class="d-flex justify-content-between align-items-end position-relative z-1">
            <div>
              <h3 class="fw-bolder mb-0 font-monospace text-white">3</h3>
              <div class="text-white-50 mt-1" style="font-size: 0.72rem;">Items &lt; 5 quantity left</div>
            </div>

            <!-- Right-Side Alert Badge / Indicator -->
            <div class="sparkline-box text-end">
              <div class="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill" style="background: rgba(0, 0, 0, 0.2); font-size: 0.72rem;">
                <span class="pulse-dot-amber"></span>
                <span class="fw-bold font-monospace">Needs Reorder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Top Performance Row -->
    <div class="row g-3">
      <!-- Sales Overview Area Chart (Left) -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4 p-4 h-100 bg-white">
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <div class="d-flex align-items-center gap-2">
                <h6 class="fw-bold text-dark mb-0">Sales Overview</h6>
                <span class="badge bg-primary bg-opacity-10 text-primary font-monospace" style="font-size: 0.7rem;">+18.5% Growth</span>
              </div>
              <div class="text-muted small" style="font-size: 0.75rem;">Daily revenue trajectory across the active period</div>
            </div>

            <!-- Time Filter Pills -->
            <div class="btn-group btn-group-sm p-1 bg-light rounded-pill border">
              <button
                type="button"
                class="btn btn-sm rounded-pill px-3 py-1 fw-semibold"
                :class="selectedPeriod === 'week' ? 'btn-primary text-white shadow-xs' : 'btn-light border-0 text-muted'"
                @click="selectedPeriod = 'week'"
              >
                This Week
              </button>
              <button
                type="button"
                class="btn btn-sm rounded-pill px-3 py-1 fw-semibold"
                :class="selectedPeriod === 'month' ? 'btn-primary text-white shadow-xs' : 'btn-light border-0 text-muted'"
                @click="selectedPeriod = 'month'"
              >
                This Month
              </button>
            </div>
          </div>

          <!-- SVG High-Fidelity Smooth Area Chart with Floating Tooltip -->
          <div class="chart-container position-relative" style="height: 260px;">
            <svg viewBox="0 0 600 240" class="w-100 h-100" preserveAspectRatio="none">
              <!-- Horizontal Grid Lines -->
              <line x1="50" y1="30" x2="580" y2="30" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="90" x2="580" y2="90" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="150" x2="580" y2="150" stroke="#f1f5f9" stroke-width="1.5" />
              <line x1="50" y1="210" x2="580" y2="210" stroke="#f1f5f9" stroke-width="1.5" />

              <!-- Y-Axis Labels -->
              <text x="40" y="35" text-anchor="end" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono'">1,500</text>
              <text x="40" y="95" text-anchor="end" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono'">1,000</text>
              <text x="40" y="155" text-anchor="end" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono'">500</text>
              <text x="40" y="215" text-anchor="end" fill="#94a3b8" font-size="11" font-family="'JetBrains Mono'">0</text>

              <!-- Chart Gradient Fill -->
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
                </linearGradient>
              </defs>

              <!-- Smooth Area Fill -->
              <path
                d="M 60,190 L 140,165 L 220,150 L 300,150 L 380,85 L 460,115 L 540,140 L 540,210 L 60,210 Z"
                fill="url(#chartGradient)"
              />

              <!-- Smooth Line Stroke -->
              <path
                d="M 60,190 L 140,165 L 220,150 L 300,150 L 380,85 L 460,115 L 540,140"
                fill="none"
                stroke="#2563eb"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <!-- Data Points with Hover Glow -->
              <circle cx="60" cy="190" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="140" cy="165" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="220" cy="150" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="300" cy="150" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="380" cy="85" r="7" fill="#2563eb" stroke="#ffffff" stroke-width="3" />
              <circle cx="460" cy="115" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <circle cx="540" cy="140" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />

              <!-- Peak indicator badge -->
              <g transform="translate(380, 55)">
                <rect x="-42" y="-18" width="84" height="22" rx="11" fill="#1e3a8a" />
                <text x="0" y="-3" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" font-family="'JetBrains Mono'">$1,250.00</text>
              </g>

              <!-- X-Axis Labels -->
              <text x="60" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Mon</text>
              <text x="140" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Tue</text>
              <text x="220" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Wed</text>
              <text x="300" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Thu</text>
              <text x="380" y="232" text-anchor="middle" fill="#2563eb" font-size="11" font-weight="bold">Fri (Peak)</text>
              <text x="460" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Sat</text>
              <text x="540" y="232" text-anchor="middle" fill="#64748b" font-size="11" font-weight="500">Sun</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Top Selling Products (Right) -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4 p-4 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 class="fw-bold text-dark mb-0">Top Selling Products</h6>
              <div class="text-muted small" style="font-size: 0.72rem;">Highest volume items this week</div>
            </div>
            <NuxtLink to="/products" class="small text-primary text-decoration-none fw-semibold">
              View All →
            </NuxtLink>
          </div>

          <!-- Ranked List -->
          <div class="d-flex flex-column gap-3">
            <div
              v-for="(item, idx) in topProducts"
              :key="item.name"
              class="top-product-card p-3 rounded-3 border bg-light d-flex align-items-center gap-3 transition-all"
            >
              <!-- Medal Badge -->
              <div class="rank-badge rounded-circle d-flex align-items-center justify-content-center fw-bold small flex-shrink-0" :class="getRankClass(idx)">
                {{ idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉' }}
              </div>

              <!-- Product Image -->
              <img
                :src="item.image"
                :alt="item.name"
                class="rounded-3 border object-fit-contain bg-white p-1 flex-shrink-0"
                style="width: 44px; height: 44px;"
              />

              <!-- Info & Progress Bar -->
              <div class="flex-grow-1" style="min-width: 0;">
                <div class="d-flex justify-content-between align-items-baseline mb-1">
                  <span class="small fw-bold text-dark text-truncate">{{ item.name }}</span>
                  <span class="small fw-bolder font-monospace text-primary">{{ item.sold }} sold</span>
                </div>
                <!-- Progress bar -->
                <div class="progress" style="height: 5px;">
                  <div
                    class="progress-bar rounded-pill"
                    :class="idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-success' : 'bg-info'"
                    :style="{ width: `${(item.sold / 50) * 100}%` }"
                  ></div>
                </div>
                <div class="text-muted small mt-1 font-monospace" style="font-size: 0.68rem;">
                  Rev: {{ formatCurrency(item.revenue) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatCurrency } from '~/utils/currency'

const selectedPeriod = ref('week')

const topProducts = [
  {
    name: 'Mizuno Shoes',
    sold: 45,
    revenue: 45 * 320.00,
    image: '/images/products/shoes.jpg'
  },
  {
    name: 'Nike T-Shirt',
    sold: 38,
    revenue: 38 * 25.00,
    image: '/images/products/tshirt.jpg'
  },
  {
    name: 'Water Bottle',
    sold: 30,
    revenue: 30 * 10.00,
    image: '/images/products/bottle.jpg'
  }
]

const getRankClass = (idx: number) => {
  if (idx === 0) return 'bg-warning-subtle text-warning'
  if (idx === 1) return 'bg-secondary-subtle text-secondary'
  return 'bg-danger-subtle text-danger'
}
</script>

<style scoped>
.metric-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-3px);
}

.glass-icon-box {
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.glass-badge {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.28);
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.sparkline-box {
  opacity: 0.9;
}

.pulse-dot-amber {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #facc15;
  box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.35);
}

.rank-badge {
  width: 32px;
  height: 32px;
  font-size: 1.1rem;
}

.top-product-card {
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.top-product-card:hover {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  transform: translateX(2px);
}
</style>