<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">🏷️ Item Categories</h5>
        <div class="text-muted small">Organize catalog items into fast-access retail classifications</div>
      </div>
    </div>

    <div class="card shadow-sm border-0 bg-white">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light small text-uppercase text-muted">
            <tr>
              <th scope="col" style="width: 60px;">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Description</th>
              <th scope="col" class="text-center">Associated Products</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in categories" :key="cat.id">
              <td class="font-monospace text-muted small">#{{ cat.id }}</td>
              <td class="fw-bold text-primary">{{ cat.name }}</td>
              <td class="text-muted small">{{ cat.description }}</td>
              <td class="text-center">
                <span class="badge bg-light text-dark border fw-bold">
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
