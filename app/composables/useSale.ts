import type { Sale, SaleItem, SaleStatus } from '~/types/sale'
import { calculateChange } from '~/utils/calculation'
import { validateCartForCheckout, validateVoidReason } from '~/utils/validation'
import { useCart } from './useCart'
import { useProduct } from './useProduct'
import { userAuth } from './userAuth'

const INITIAL_SALES: Sale[] = [
  {
    id: 125,
    receiptNo: 'RCP-00125',
    cashierId: 1,
    cashierName: 'Rathana',
    subtotal: 370.00,
    discountPercent: 10,
    discountTotal: 37.00,
    taxPercent: 8,
    taxTotal: 26.40,
    grandTotal: 359.40,
    status: 'completed',
    createdAt: '2026-11-13T18:20:00',
    items: [
      {
        id: 1,
        saleId: 125,
        productId: 1,
        productName: 'Mizuno Shoes',
        productSku: 'SHOE-001',
        quantity: 1,
        unitPrice: 320.00,
        lineTotal: 320.00
      },
      {
        id: 2,
        saleId: 125,
        productId: 2,
        productName: 'T-Shirt',
        productSku: 'TSH-002',
        quantity: 2,
        unitPrice: 25.00,
        lineTotal: 50.00
      }
    ],
    payment: {
      saleId: 125,
      method: 'cash',
      amountTendered: 400.00,
      changeDue: 40.60
    }
  },
  {
    id: 124,
    receiptNo: 'RCP-00124',
    cashierId: 1,
    cashierName: 'Rathana',
    subtotal: 215.00,
    discountPercent: 5,
    discountTotal: 10.75,
    taxPercent: 8,
    taxTotal: 16.34,
    grandTotal: 210.00,
    status: 'completed',
    createdAt: '2026-11-13T17:45:00',
    items: [
      {
        id: 1,
        saleId: 124,
        productId: 2,
        productName: 'Nike T-Shirt',
        productSku: 'TSH-002',
        quantity: 4,
        unitPrice: 25.00,
        lineTotal: 100.00
      },
      {
        id: 2,
        saleId: 124,
        productId: 3,
        productName: 'Adidas Short',
        productSku: 'SHR-003',
        quantity: 5,
        unitPrice: 20.00,
        lineTotal: 100.00
      }
    ],
    payment: {
      saleId: 124,
      method: 'cash',
      amountTendered: 220.00,
      changeDue: 10.00
    }
  },
  {
    id: 123,
    receiptNo: 'RCP-00123',
    cashierId: 2,
    cashierName: 'Dara',
    subtotal: 125.00,
    discountPercent: 0,
    discountTotal: 0,
    taxPercent: 0,
    taxTotal: 0,
    grandTotal: 125.00,
    status: 'completed',
    createdAt: '2026-11-12T15:30:00',
    items: [
      {
        id: 1,
        saleId: 123,
        productId: 2,
        productName: 'Nike T-Shirt',
        productSku: 'TSH-002',
        quantity: 5,
        unitPrice: 25.00,
        lineTotal: 125.00
      }
    ],
    payment: {
      saleId: 123,
      method: 'cash',
      amountTendered: 150.00,
      changeDue: 25.00
    }
  },
  {
    id: 122,
    receiptNo: 'RCP-00122',
    cashierId: 1,
    cashierName: 'Rathana',
    subtotal: 280.00,
    discountPercent: 5,
    discountTotal: 14.00,
    taxPercent: 8,
    taxTotal: 21.28,
    grandTotal: 275.50,
    status: 'completed',
    createdAt: '2026-11-12T14:20:00',
    items: [
      {
        id: 1,
        saleId: 122,
        productId: 1,
        productName: 'Mizuno Shoes',
        productSku: 'SHOE-001',
        quantity: 1,
        unitPrice: 280.00,
        lineTotal: 280.00
      }
    ],
    payment: {
      saleId: 122,
      method: 'cash',
      amountTendered: 300.00,
      changeDue: 24.50
    }
  },
  {
    id: 121,
    receiptNo: 'RCP-00121',
    cashierId: 2,
    cashierName: 'Dara',
    subtotal: 90.00,
    discountPercent: 5,
    discountTotal: 4.50,
    taxPercent: 8,
    taxTotal: 6.84,
    grandTotal: 89.00,
    status: 'completed',
    createdAt: '2026-11-11T16:10:00',
    items: [
      {
        id: 1,
        saleId: 121,
        productId: 3,
        productName: 'Adidas Short',
        productSku: 'SHR-003',
        quantity: 3,
        unitPrice: 20.00,
        lineTotal: 60.00
      },
      {
        id: 2,
        saleId: 121,
        productId: 4,
        productName: 'Water Bottle',
        productSku: 'BOT-004',
        quantity: 3,
        unitPrice: 10.00,
        lineTotal: 30.00
      }
    ],
    payment: {
      saleId: 121,
      method: 'cash',
      amountTendered: 100.00,
      changeDue: 11.00
    }
  }
]

export function useSale() {
  const salesHistory = useState<Sale[]>('pos_sales_history', () => INITIAL_SALES)
  const lastCompletedSale = useState<Sale | null>('pos_last_completed_sale', () => INITIAL_SALES[0])
  const isProcessingCheckout = ref(false)

  const cart = useCart()
  const productCatalog = useProduct()
  const auth = userAuth()

  const generateReceiptNo = (): string => {
    const nextSeq = salesHistory.value.length + 121
    return `RCP-00${nextSeq}`
  }

  const processCheckout = (
    amountTendered: number
  ): { success: boolean; error?: string; sale?: Sale } => {
    isProcessingCheckout.value = true

    try {
      const items = cart.cartItems.value
      const totals = cart.totals.value

      const cartValidation = validateCartForCheckout(items, productCatalog.products.value)
      if (!cartValidation.valid) {
        return { success: false, error: cartValidation.errors.join(' ') }
      }

      const paymentCheck = calculateChange(amountTendered, totals.grandTotal)
      if (paymentCheck.isUnderpaid) {
        return {
          success: false,
          error: `Underpayment! Shortfall: $${paymentCheck.shortfall.toFixed(2)}.`
        }
      }

      const newSaleId = salesHistory.value.length ? Math.max(...salesHistory.value.map((s) => s.id)) + 1 : 126
      const receiptNo = generateReceiptNo()

      const saleItems: SaleItem[] = items.map((item, index) => ({
        id: index + 1,
        saleId: newSaleId,
        productId: item.product.id,
        productName: item.product.name,
        productSku: item.product.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal
      }))

      const completedSale: Sale = {
        id: newSaleId,
        receiptNo,
        cashierId: auth.currentUser.value?.id || 1,
        cashierName: auth.currentUser.value?.name || 'Rathana',
        subtotal: totals.subtotal,
        discountPercent: totals.discountPercent,
        discountTotal: totals.discountTotal,
        taxPercent: totals.taxPercent,
        taxTotal: totals.taxTotal,
        grandTotal: totals.grandTotal,
        status: 'completed',
        createdAt: new Date().toISOString(),
        items: saleItems,
        payment: {
          saleId: newSaleId,
          method: 'cash',
          amountTendered,
          changeDue: paymentCheck.changeDue
        }
      }

      for (const item of saleItems) {
        productCatalog.decrementStock(item.productId, item.quantity, newSaleId)
      }

      salesHistory.value.unshift(completedSale)
      lastCompletedSale.value = completedSale
      cart.clearCart()

      return { success: true, sale: completedSale }
    } finally {
      isProcessingCheckout.value = false
    }
  }

  const voidSale = (
    saleId: number,
    reason: string
  ): { success: boolean; error?: string } => {
    const reasonValidation = validateVoidReason(reason)
    if (!reasonValidation.valid) {
      return { success: false, error: reasonValidation.message }
    }

    const sale = salesHistory.value.find((s) => s.id === saleId)
    if (!sale) return { success: false, error: 'Sale record not found.' }
    if (sale.status === 'voided') return { success: false, error: 'Already voided.' }

    for (const item of sale.items) {
      productCatalog.restoreStock(item.productId, item.quantity, sale.id)
    }

    sale.status = 'voided'
    sale.voidReason = reason.trim()
    sale.voidedBy = auth.currentUser.value?.id
    sale.voidedByName = auth.currentUser.value?.name
    sale.voidedAt = new Date().toISOString()

    return { success: true }
  }

  const searchSales = (
    query: string = '',
    dateFilter: string = '',
    status: SaleStatus | 'all' = 'all'
  ) => {
    const q = query.trim().toLowerCase()
    return salesHistory.value.filter((sale) => {
      const matchesStatus = status === 'all' || sale.status === status
      const matchesDate = !dateFilter || sale.createdAt.startsWith(dateFilter)
      const matchesQuery =
        !q ||
        sale.receiptNo.toLowerCase().includes(q) ||
        (sale.cashierName && sale.cashierName.toLowerCase().includes(q))
      return matchesStatus && matchesDate && matchesQuery
    })
  }

  const getSaleById = (id: number): Sale | undefined => {
    return salesHistory.value.find((s) => s.id === id)
  }

  const getSaleByReceiptNo = (receiptNo: string): Sale | undefined => {
    return salesHistory.value.find((s) => s.receiptNo.toLowerCase() === receiptNo.trim().toLowerCase())
  }

  const createSale = (payload?: any): Sale | null => {
    if (payload && payload.amountTendered) {
      const res = processCheckout(payload.amountTendered)
      if (res.success && res.sale) return res.sale
    }
    return lastCompletedSale.value
  }

  return {
    salesHistory,
    sales: salesHistory,
    lastCompletedSale,
    isProcessingCheckout,
    processCheckout,
    createSale,
    voidSale,
    searchSales,
    getSaleById,
    getSaleByReceiptNo
  }
}
