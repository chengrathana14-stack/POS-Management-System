/**
 * Monetary & Cart Calculations aligned with SRS Section 4 (FR-04, FR-05) & Section 7 (BR-1):
 * - Consistent decimal math
 * - Subtotal, discounts, tax, grand total
 * - Change calculation & underpayment check
 */

import { roundToCents } from './currency'
import type { CartItem, CartTotals } from '~/types/sale'

/**
 * Calculates line total for an item: quantity * unit_price (BR-1 & BR-2)
 */
export function calculateLineTotal(quantity: number, unitPrice: number): number {
  const qty = Math.max(0, quantity || 0)
  const price = Math.max(0, unitPrice || 0)
  return roundToCents(qty * price)
}

/**
 * Calculates overall cart totals:
 * - Subtotal: sum of all line totals
 * - Discount: percentage of subtotal
 * - Tax: percentage of taxable amount (subtotal - discount)
 * - Grand Total: subtotal - discount + tax
 */
export function calculateCartTotals(
  items: CartItem[],
  discountPercent: number = 0,
  taxPercent: number = 0
): CartTotals {
  const safeDiscountPercent = Math.max(0, Math.min(100, discountPercent || 0))
  const safeTaxPercent = Math.max(0, taxPercent || 0)

  // Subtotal
  const subtotal = items.reduce((sum, item) => {
    return roundToCents(sum + calculateLineTotal(item.quantity, item.unitPrice))
  }, 0)

  // Discount total
  const discountTotal = roundToCents(subtotal * (safeDiscountPercent / 100))
  const afterDiscount = Math.max(0, roundToCents(subtotal - discountTotal))

  // Tax total
  const taxTotal = roundToCents(afterDiscount * (safeTaxPercent / 100))

  // Grand total
  const grandTotal = roundToCents(afterDiscount + taxTotal)

  const itemCount = items.reduce((count, item) => count + (item.quantity || 0), 0)

  return {
    subtotal,
    discountPercent: safeDiscountPercent,
    discountTotal,
    taxPercent: safeTaxPercent,
    taxTotal,
    grandTotal,
    itemCount
  }
}

/**
 * Cash Payment & Change Calculation (FR-05)
 * Returns changeDue or flags underpayment
 */
export function calculateChange(
  amountTendered: number,
  grandTotal: number
): { isUnderpaid: boolean; changeDue: number; shortfall: number } {
  const tendered = roundToCents(amountTendered || 0)
  const total = roundToCents(grandTotal || 0)

  if (tendered < total) {
    return {
      isUnderpaid: true,
      changeDue: 0,
      shortfall: roundToCents(total - tendered)
    }
  }

  return {
    isUnderpaid: false,
    changeDue: roundToCents(tendered - total),
    shortfall: 0
  }
}

