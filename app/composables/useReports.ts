/**
 * Reports & Daily Sales Dashboard Composable aligned with SRS FR-09:
 * - Summarize revenue, transaction count and top-selling products
 * - Daily sales metrics
 * - Completed vs Voided metrics
 */

import { useSale } from './useSale'
import { roundToCents } from '~/utils/currency'

export interface TopProductSummary {
  productId: number
  sku: string
  name: string
  quantitySold: number
  totalRevenue: number
}

export function useReports() {
  const { salesHistory } = useSale()

  /**
   * Daily Summary Metrics
   */
  const metrics = computed(() => {
    const completedSales = salesHistory.value.filter((s) => s.status === 'completed')
    const voidedSales = salesHistory.value.filter((s) => s.status === 'voided')

    const totalRevenue = completedSales.reduce((sum, s) => roundToCents(sum + s.grandTotal), 0)
    const totalTaxCollected = completedSales.reduce((sum, s) => roundToCents(sum + s.taxTotal), 0)
    const totalDiscountsGiven = completedSales.reduce((sum, s) => roundToCents(sum + s.discountTotal), 0)

    const averageOrderValue = completedSales.length > 0 ? roundToCents(totalRevenue / completedSales.length) : 0

    return {
      totalCompletedTransactions: completedSales.length,
      totalVoidedTransactions: voidedSales.length,
      totalRevenue,
      totalTaxCollected,
      totalDiscountsGiven,
      averageOrderValue
    }
  })

  /**
   * Top-selling products ranked by quantity sold
   */
  const topSellingProducts = computed<TopProductSummary[]>(() => {
    const map = new Map<number, TopProductSummary>()
    const completedSales = salesHistory.value.filter((s) => s.status === 'completed')

    for (const sale of completedSales) {
      for (const item of sale.items) {
        const existing = map.get(item.productId)
        if (existing) {
          existing.quantitySold += item.quantity
          existing.totalRevenue = roundToCents(existing.totalRevenue + item.lineTotal)
        } else {
          map.set(item.productId, {
            productId: item.productId,
            sku: item.productSku,
            name: item.productName,
            quantitySold: item.quantity,
            totalRevenue: item.lineTotal
          })
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => b.quantitySold - a.quantitySold)
  })

  return {
    metrics,
    topSellingProducts
  }
}

