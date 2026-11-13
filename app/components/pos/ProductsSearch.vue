<template>
  <div class="card shadow-sm border-0 mb-3">
    <div class="card-body p-3">
      <div class="row g-2 align-items-center">
        <!-- Search input -->
        <div class="col-md-7">
          <div class="input-group">
            <span class="input-group-text bg-white">🔍</span>
            <input
              type="text"
              class="form-control"
              placeholder="Search product name or scan SKU / Barcode..."
              :value="searchQuery"
              @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
              @keydown.enter="$emit('sku-enter')"
            />
            <button
              v-if="searchQuery"
              class="btn btn-outline-secondary"
              type="button"
              @click="$emit('update:searchQuery', '')"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Category pills/select -->
        <div class="col-md-5">
          <select
            class="form-select"
            :value="selectedCategory"
            @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value === 'all' ? 'all' : Number(($event.target as HTMLSelectElement).value))"
          >
            <option value="all">All Categories</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/product'

defineProps<{
  searchQuery: string
  selectedCategory: number | 'all'
  categories: Category[]
}>()

defineEmits<{
  (e: 'update:searchQuery', val: string): void
  (e: 'update:selectedCategory', val: number | 'all'): void
  (e: 'sku-enter'): void
}>()
</script>

