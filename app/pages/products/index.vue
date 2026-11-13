<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">📦 Products & Inventory Catalog</h5>
        <div class="text-muted small">
          Maintain active products, SKUs, selling prices and stock levels
        </div>
      </div>
      <div>
        <button
          class="btn btn-primary btn-sm d-flex align-items-center gap-1 shadow-sm px-3"
          @click="openAddModal"
        >
          <span>➕</span>
          <span>Add New Product</span>
        </button>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="card shadow-sm border-0 mb-4 bg-white">
      <div class="card-body p-3">
        <div class="row g-2 align-items-center">
          <div class="col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light border-0">🔍</span>
              <input
                type="text"
                class="form-control form-control-sm border-0 bg-light"
                placeholder="Search product by name or SKU..."
                v-model="searchQuery"
              />
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select form-select-sm border-0 bg-light fw-medium" v-model="selectedCategory">
              <option value="all">All Categories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="col-md-2">
            <button
              class="btn btn-sm btn-outline-secondary w-100"
              type="button"
              @click="resetFilters"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Table -->
    <ProductTable
      :products="filteredProducts"
      :is-admin="true"
      @edit="openEditModal"
      @toggle-active="toggleProductActive"
    />

    <!-- Add / Edit Modal -->
    <ProductForm
      :is-open="isFormOpen"
      :categories="categories"
      :editing-product="selectedProduct"
      @close="isFormOpen = false"
      @save="handleSaveProduct"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import { useProduct } from '~/composables/useProduct'
import { userAuth } from '~/composables/userAuth'
import ProductTable from '~/components/Product/ProductTable.vue'
import ProductForm from '~/components/Product/ProductForm.vue'

const { categories, products, filterProducts, addProduct, updateProduct, toggleProductActive } = useProduct()
const { isAdmin } = userAuth()

const searchQuery = ref('')
const selectedCategory = ref<number | 'all'>('all')

const isFormOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const q = searchQuery.value.trim().toLowerCase()
    const matchesCategory = selectedCategory.value === 'all' || p.categoryId === selectedCategory.value
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const openAddModal = () => {
  selectedProduct.value = null
  isFormOpen.value = true
}

const openEditModal = (prod: Product) => {
  selectedProduct.value = prod
  isFormOpen.value = true
}

const handleSaveProduct = (data: Partial<Product>) => {
  if (selectedProduct.value) {
    updateProduct(selectedProduct.value.id, data)
  } else {
    addProduct(data as Omit<Product, 'id'>)
  }
  isFormOpen.value = false
}
</script>
