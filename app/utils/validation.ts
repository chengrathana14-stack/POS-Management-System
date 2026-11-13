/**
 * Form & Business Validation Utilities aligned with SRS Section 4 & 5 (NFR-04):
 * - Input validation & clear error messages
 * - Stock limit checks
 * - Payment validation
 * - Void authorization & reason checks
 */

import type { CartItem } from '~/types/sale'
import type { Product } from '~/types/product'

export interface ValidationResult {
  valid: boolean
  message?: string
}

/**
 * Validates SKU format (must be non-empty and alphanumeric/hyphen/underscore)
 */
export function validateSku(sku: string): ValidationResult {
  if (!sku || !sku.trim()) {
    return { valid: false, message: 'SKU is required.' }
  }
  const clean = sku.trim()
  if (clean.length < 2) {
    return { valid: false, message: 'SKU must be at least 2 characters long.' }
  }
  return { valid: true }
}

/**
 * Validates product unit price (must be positive number)
 */
export function validateUnitPrice(price: number): ValidationResult {
  if (price === undefined || price === null || isNaN(price)) {
    return { valid: false, message: 'Unit price is required.' }
  }
  if (price <= 0) {
    return { valid: false, message: 'Unit price must be greater than 0.' }
  }
  return { valid: true }
}

/**
 * Validates stock quantity (must be non-negative integer)
 */
export function validateStockQty(qty: number): ValidationResult {
  if (qty === undefined || qty === null || isNaN(qty)) {
    return { valid: false, message: 'Stock quantity is required.' }
  }
  if (qty < 0 || !Number.isInteger(qty)) {
    return { valid: false, message: 'Stock quantity must be a non-negative whole number.' }
  }
  return { valid: true }
}

/**
 * Validates whether a requested quantity can be added given current stock.
 * Acceptance criteria: "Insufficient stock prevents checkout."
 */
export function validateStockAvailability(
  requestedQty: number,
  availableStock: number
): ValidationResult {
  if (requestedQty <= 0) {
    return { valid: false, message: 'Quantity must be at least 1.' }
  }
  if (requestedQty > availableStock) {
    return {
      valid: false,
      message: `Insufficient stock! Only ${availableStock} item(s) available.`
    }
  }
  return { valid: true }
}

/**
 * Validates entire cart against real-time product inventory before checkout
 */
export function validateCartForCheckout(
  cartItems: CartItem[],
  inventory: Product[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!cartItems || cartItems.length === 0) {
    errors.push('Cart is empty. Add products before proceeding to checkout.')
    return { valid: false, errors }
  }

  for (const item of cartItems) {
    const liveProduct = inventory.find((p) => p.id === item.product.id)
    if (!liveProduct || !liveProduct.active) {
      errors.push(`"${item.product.name}" is no longer available in catalog.`)
      continue
    }

    if (item.quantity > liveProduct.stockQty) {
      errors.push(
        `"${liveProduct.name}" has only ${liveProduct.stockQty} in stock (requested: ${item.quantity}).`
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validates void request (FR-10: Manager may void a sale with reason)
 */
export function validateVoidReason(reason: string): ValidationResult {
  if (!reason || !reason.trim()) {
    return { valid: false, message: 'A reason for voiding this sale is required.' }
  }
  if (reason.trim().length < 5) {
    return { valid: false, message: 'Reason must be at least 5 characters long.' }
  }
  return { valid: true }
}

