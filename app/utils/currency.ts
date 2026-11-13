/**
 * Single Currency Utilities aligned with SRS Section 3:
 * Single shop and single currency ($ USD)
 * Business Rule 1: All monetary calculations use decimal values, not floating point.
 */

export const CURRENCY_SYMBOL = '$'

/**
 * Rounds a number to exactly 2 decimal places using fixed precision to prevent floating-point artifacts.
 */
export function roundToCents(amount: number): number {
  if (isNaN(amount) || !isFinite(amount)) return 0
  return Math.round((amount + Number.EPSILON) * 100) / 100
}

/**
 * Formats a numeric monetary value to standard currency display (e.g. $12.50)
 */
export function formatCurrency(amount: number, symbol: string = CURRENCY_SYMBOL): string {
  const safe = roundToCents(amount)
  return `${symbol}${safe.toFixed(2)}`
}

/**
 * Parses user input string into safe decimal currency number
 */
export function parseCurrency(input: string | number): number {
  if (typeof input === 'number') return roundToCents(input)
  if (!input) return 0
  const cleaned = input.toString().replace(/[^0-9.-]/g, '')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : roundToCents(parsed)
}

