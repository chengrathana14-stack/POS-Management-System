/**
 * Sales, Cart & Receipt types aligned with SRS Section 4 & 6:
 * sales(id, receipt_no UNIQUE, cashier_id, subtotal, discount_total, tax_total, grand_total, status, created_at)
 * sale_items(id, sale_id, product_id, quantity, unit_price, line_total)
 * payments(id, sale_id, method, amount_tendered, change_due)
 */

import type { Product } from './product'
import type { User } from './user'

export type SaleStatus = 'completed' | 'voided'
export type PaymentMethod = 'cash'

export interface CartItem {
  product: Product
  quantity: number
  unitPrice: number // Retains price charged at checkout (Business Rule 2)
  lineTotal: number
}

export interface SaleItem {
  id?: number
  saleId?: number
  productId: number
  productName: string
  productSku: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface Payment {
  id?: number
  saleId?: number
  method: PaymentMethod
  amountTendered: number
  changeDue: number
}

export interface Sale {
  id: number
  receiptNo: string // UNIQUE
  cashierId: number
  cashierName?: string
  subtotal: number
  discountPercent: number
  discountTotal: number
  taxPercent: number
  taxTotal: number
  grandTotal: number
  status: SaleStatus
  createdAt: string
  items: SaleItem[]
  payment: Payment
  voidReason?: string
  voidedBy?: number
  voidedByName?: string
  voidedAt?: string
}

export interface CartTotals {
  subtotal: number
  discountPercent: number
  discountTotal: number
  taxPercent: number
  taxTotal: number
  grandTotal: number
  itemCount: number
}

export interface SalesHistoryFilter {
  dateFrom?: string
  dateTo?: string
  cashierId?: number | 'all'
  receiptNo?: string
  status?: SaleStatus | 'all'
}

