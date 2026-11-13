/**
 * Product & Inventory types aligned with SRS Section 6:
 * categories(id, name)
 * products(id, sku UNIQUE, name, category_id, unit_price, stock_qty, active)
 * stock_movements(id, product_id, sale_id NULL, quantity_delta, reason, created_at)
 */

export interface Category {
  id: number
  name: string
  description?: string
}

export interface Product {
  id: number
  sku: string // Unique SKU / Barcode for search/scanner entry
  name: string
  categoryId: number
  unitPrice: number
  stockQty: number
  active: boolean
  categoryName?: string
  image?: string
}

export interface StockMovement {
  id: number
  productId: number
  saleId: number | null
  quantityDelta: number // Negative for sale decrement, positive for void restock / restock
  reason: 'sale' | 'void_restoration' | 'manual_adjustment' | 'restock'
  createdAt: string
}

export interface ProductFilter {
  query?: string
  categoryId?: number | 'all'
  inStockOnly?: boolean
}

