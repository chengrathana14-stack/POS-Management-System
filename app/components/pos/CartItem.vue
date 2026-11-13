<template>
  <div class="list-group-item d-flex align-items-center justify-content-between p-2 py-3 border-start-0 border-end-0">
    <div class="flex-grow-1 me-2" style="min-width: 0;">
      <div class="fw-semibold text-truncate">{{ item.product.name }}</div>
      <div class="text-muted small">
        <span class="badge bg-light text-dark border me-1">{{ item.product.sku }}</span>
        <span>{{ formatCurrency(item.unitPrice) }} each</span>
      </div>
    </div>

    <!-- Quantity Stepper -->
    <div class="d-flex align-items-center me-3">
      <div class="input-group input-group-sm" style="width: 105px;">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="decrease"
        >
          -
        </button>
        <input
          type="number"
          class="form-control text-center px-1"
          :value="item.quantity"
          min="1"
          :max="item.product.stockQty"
          @change="onInputChange"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          :disabled="item.quantity >= item.product.stockQty"
          @click="increase"
        >
          +
        </button>
      </div>
    </div>

    <!-- Line Total & Remove -->
    <div class="text-end d-flex align-items-center gap-2">
      <div class="fw-bold text-dark" style="min-width: 65px;">
        {{ formatCurrency(item.lineTotal) }}
      </div>
      <button
        class="btn btn-sm btn-outline-danger p-1 lh-1"
        title="Remove item"
        @click="$emit('remove', item.product.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types/sale'
import { formatCurrency } from '~/utils/currency'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'update-quantity', productId: number, quantity: number): void
  (e: 'remove', productId: number): void
}>()

const increase = () => {
  emit('update-quantity', props.item.product.id, props.item.quantity + 1)
}

const decrease = () => {
  emit('update-quantity', props.item.product.id, props.item.quantity - 1)
}

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = parseInt(target.value, 10)
  if (!isNaN(val)) {
    emit('update-quantity', props.item.product.id, val)
  }
}
</script>

