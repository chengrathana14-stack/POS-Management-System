<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label fw-semibold small">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <div class="input-group" :class="{ 'input-group-sm': size === 'sm', 'input-group-lg': size === 'lg' }">
      <span v-if="prefix" class="input-group-text">{{ prefix }}</span>
      <input
        :id="id"
        :type="type || 'text'"
        class="form-control"
        :class="{ 'is-invalid': !!error }"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
      />
      <span v-if="suffix" class="input-group-text">{{ suffix }}</span>
      <div v-if="error" class="invalid-feedback d-block">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  modelValue?: string | number
  type?: string
  placeholder?: string
  prefix?: string
  suffix?: string
  size?: 'sm' | 'lg'
  error?: string
  required?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', val: string | number): void
  (e: 'blur', event: FocusEvent): void
}>()
</script>

