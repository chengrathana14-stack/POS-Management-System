<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">🏷️ Item Categories</h5>
        <div class="text-muted small">Organize catalog items into fast-access retail classifications</div>
      </div>
    </div>

    <!-- Categories Table Card -->
    <div class="card shadow-sm border-0 bg-white rounded-4 overflow-hidden">
      <div class="table-responsive px-3">
        <table class="table table-hover align-middle mb-0">
          <thead class="small text-uppercase text-muted" style="border-top: 1px solid #f1f5f9; font-size: 0.72rem; letter-spacing: 0.04em;">
            <tr>
              <th scope="col" class="ps-3" style="width: 70px;">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col" class="text-center pe-3">Associated Products</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in categories" :key="cat.id">
              <td class="ps-3 font-monospace text-muted small">#{{ cat.id }}</td>
              <td>
                <div class="fw-bold text-primary small">{{ cat.name }}</div>
              </td>
              <td class="text-muted small">{{ cat.description }}</td>
              <td class="text-center pe-3">
                <span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill font-monospace fw-bold">
                  {{ products.filter(p => p.categoryId === cat.id).length }} items
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '~/composables/useProduct'

const { categories, products } = useProduct()
</script>
