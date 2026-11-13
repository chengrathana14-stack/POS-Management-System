/**
 * Cart Composable aligned with SRS FR-03, FR-04 & Section 7 (BR-2):
 * - Add/remove items, update quantity
 * - Retain unit price charged at checkout
 * - Prevent adding quantity higher than available stock
 * - Dynamic subtotal, discount, tax, grand total
 */

import type { Product } from '~/types/product'
import type { CartItem, CartTotals } from '~/types/sale'
import { calculateCartTotals, calculateLineTotal } from '~/utils/calculation'
import { validateStockAvailability } from '~/utils/validation'

export function useCart() {
  const cartItems = useState<CartItem[]>('pos_cart_items', () => [])
  const discountPercent = useState<number>('pos_cart_discount', () => 0)
  const taxPercent = useState<number>('pos_cart_tax', () => 10) // 10% default VAT/Tax
  const cartError = useState<string | null>('pos_cart_error', () => null)

  const totals = computed<CartTotals>(() => {
    return calculateCartTotals(cartItems.value, discountPercent.value, taxPercent.value)
  })

  /**
   * Add a product to the cart (or increment quantity if already exists)
   */
  const addToCart = (product: Product, quantity: number = 1): { success: boolean; message?: string } => {
    cartError.value = null
    const existingIndex = cartItems.value.findIndex((item) => item.product.id === product.id)
    const currentQtyInCart = existingIndex !== -1 ? cartItems.value[existingIndex].quantity : 0
    const desiredTotalQty = currentQtyInCart + quantity

    // Validate against product inventory stock
    const stockCheck = validateStockAvailability(desiredTotalQty, product.stockQty)
    if (!stockCheck.valid) {
      cartError.value = stockCheck.message || 'Insufficient stock'
      return { success: false, message: cartError.value }
    }

    if (existingIndex !== -1) {
      cartItems.value[existingIndex].quantity = desiredTotalQty
      cartItems.value[existingIndex].lineTotal = calculateLineTotal(
        desiredTotalQty,
        cartItems.value[existingIndex].unitPrice
      )
    } else {
      cartItems.value.push({
        product,
        quantity,
        unitPrice: product.unitPrice, // BR-2: retain price charged at checkout
        lineTotal: calculateLineTotal(quantity, product.unitPrice)
      })
    }

    return { success: true }
  }

  /**
   * Update quantity of an item already in the cart
   */
  const updateQuantity = (productId: number, newQuantity: number): { success: boolean; message?: string } => {
    cartError.value = null
    const item = cartItems.value.find((i) => i.product.id === productId)
    if (!item) return { success: false, message: 'Item not found in cart.' }

    if (newQuantity <= 0) {
      removeFromCart(productId)
      return { success: true }
    }

    const stockCheck = validateStockAvailability(newQuantity, item.product.stockQty)
    if (!stockCheck.valid) {
      cartError.value = stockCheck.message || 'Insufficient stock'
      return { success: false, message: cartError.value }
    }

    item.quantity = newQuantity
    item.lineTotal = calculateLineTotal(newQuantity, item.unitPrice)
    return { success: true }
  }

  /**
   * Remove a specific item from the cart
   */
  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((i) => i.product.id !== productId)
    cartError.value = null
  }

  /**
   * Clear the entire cart
   */
  const clearCart = () => {
    cartItems.value = []
    discountPercent.value = 0
    cartError.value = null
  }

  return {
    cartItems,
    items: cartItems,
    discountPercent,
    taxPercent,
    cartError,
    totals,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
}

