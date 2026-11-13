<template>
  <div v-if="isOpen" class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
    <div class="card shadow-lg border-0" style="width: 100%; max-width: 520px; border-radius: 12px;">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 class="mb-0 fw-bold">{{ editingProduct ? '✏️ Edit Product' : '➕ Add New Product' }}</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="$emit('close')"
        ></button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="card-body p-4">
          <!-- SKU -->
          <div class="mb-3">
            <label class="form-label fw-bold small">Product SKU / Barcode <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. BEV-004"
              v-model="form.sku"
              required
            />
          </div>

          <!-- Name -->
          <div class="mb-3">
            <label class="form-label fw-bold small">Product Name <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Green Tea 500ml"
              v-model="form.name"
              required
            />
          </div>

          <!-- Category -->
          <div class="mb-3">
            <label class="form-label fw-bold small">Category <span class="text-danger">*</span></label>
            <select class="form-select" v-model.number="form.categoryId" required>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Price & Stock row -->
          <div class="row g-2 mb-3">
            <div class="col-6">
              <label class="form-label fw-bold small">Selling Price ($) <span class="text-danger">*</span></label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  class="form-control"
                  placeholder="0.00"
                  v-model.number="form.unitPrice"
                  required
                />
              </div>
            </div>
            <div class="col-6">
              <label class="form-label fw-bold small">Initial Stock Qty <span class="text-danger">*</span></label>
              <input
                type="number"
                min="0"
                step="1"
                class="form-control"
                placeholder="0"
                v-model.number="form.stockQty"
                required
              />
            </div>
          </div>

          <!-- Active checkbox -->
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              id="activeSwitch"
              v-model="form.active"
            />
            <label class="form-check-label small" for="activeSwitch">
              Active in catalog (visible at checkout)
            </label>
          </div>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small">
            {{ errorMessage }}
          </div>
        </div>

        <div class="card-footer bg-light p-3 d-flex justify-content-end gap-2 border-top">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary fw-bold"
          >
            {{ editingProduct ? 'Save Changes' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Product, Category } from '~/types/product'
import { validateSku, validateUnitPrice, validateStockQty } from '~/utils/validation'

const props = defineProps<{
  isOpen: boolean
  categories: Category[]
  editingProduct: Product | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Partial<Product>): void
}>()

const form = reactive({
  sku: '',
  name: '',
  categoryId: 1,
  unitPrice: 0,
  stockQty: 0,
  active: true
})

const errorMessage = ref<string | null>(null)

watch(
  () => props.editingProduct,
  (prod) => {
    errorMessage.value = null
    if (prod) {
      form.sku = prod.sku
      form.name = prod.name
      form.categoryId = prod.categoryId
      form.unitPrice = prod.unitPrice
      form.stockQty = prod.stockQty
      form.active = prod.active
    } else {
      form.sku = ''
      form.name = ''
      form.categoryId = props.categories[0]?.id || 1
      form.unitPrice = 1.0
      form.stockQty = 10
      form.active = true
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  errorMessage.value = null

  // Validate
  const skuCheck = validateSku(form.sku)
  if (!skuCheck.valid) {
    errorMessage.value = skuCheck.message || 'Invalid SKU'
    return
  }

  const priceCheck = validateUnitPrice(form.unitPrice)
  if (!priceCheck.valid) {
    errorMessage.value = priceCheck.message || 'Invalid price'
    return
  }

  const stockCheck = validateStockQty(form.stockQty)
  if (!stockCheck.valid) {
    errorMessage.value = stockCheck.message || 'Invalid stock quantity'
    return
  }

  emit('save', { ...form })
}
</script>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
  backdrop-filter: blur(2px);
}
</style>

