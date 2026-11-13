/**
 * Product & Inventory catalog seeded with products matching the UI mockups
 */

import type { Product, Category, StockMovement } from '~/types/product'

const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Shoes & Footwear', description: 'Athletic and casual footwear' },
  { id: 2, name: 'Apparel', description: 'T-shirts, shorts and sportswear' },
  { id: 3, name: 'Accessories', description: 'Caps, socks and water bottles' }
]

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: 'SHOE-001',
    name: 'Mizuno Shoes',
    categoryId: 1,
    categoryName: 'Shoes & Footwear',
    unitPrice: 320.00,
    stockQty: 45,
    active: true,
    image: '/images/products/shoes.jpg'
  },
  {
    id: 2,
    sku: 'TSH-002',
    name: 'Nike T-Shirt',
    categoryId: 2,
    categoryName: 'Apparel',
    unitPrice: 25.00,
    stockQty: 80,
    active: true,
    image: '/images/products/tshirt.jpg'
  },
  {
    id: 3,
    sku: 'SHR-003',
    name: 'Adidas Short',
    categoryId: 2,
    categoryName: 'Apparel',
    unitPrice: 20.00,
    stockQty: 60,
    active: true,
    image: '/images/products/shorts.jpg'
  },
  {
    id: 4,
    sku: 'BOT-004',
    name: 'Water Bottle',
    categoryId: 3,
    categoryName: 'Accessories',
    unitPrice: 10.00,
    stockQty: 35,
    active: true,
    image: '/images/products/bottle.jpg'
  },
  {
    id: 5,
    sku: 'CAP-005',
    name: 'Cap',
    categoryId: 3,
    categoryName: 'Accessories',
    unitPrice: 8.00,
    stockQty: 25,
    active: true,
    image: '/images/products/cap.jpg'
  },
  {
    id: 6,
    sku: 'SOK-006',
    name: 'Socks',
    categoryId: 3,
    categoryName: 'Accessories',
    unitPrice: 5.00,
    stockQty: 2,
    active: true,
    image: '/images/products/socks.jpg'
  }
]

export function useProduct() {
  const categories = useState<Category[]>('pos_categories', () => INITIAL_CATEGORIES)
  const products = useState<Product[]>('pos_products', () => INITIAL_PRODUCTS)
  const stockMovements = useState<StockMovement[]>('pos_stock_movements', () => [])

  const filterProducts = (query: string = '', categoryId: number | 'all' = 'all') => {
    const q = query.trim().toLowerCase()
    return products.value.filter((p) => {
      if (!p.active) return false
      const matchesCategory = categoryId === 'all' || p.categoryId === categoryId
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }

  const getProductById = (id: number) => {
    return products.value.find((p) => p.id === id)
  }

  const getProductBySku = (sku: string) => {
    return products.value.find((p) => p.sku.toLowerCase() === sku.trim().toLowerCase())
  }

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = products.value.length ? Math.max(...products.value.map((p) => p.id)) + 1 : 1
    const category = categories.value.find((c) => c.id === productData.categoryId)
    const newProduct: Product = {
      ...productData,
      id: newId,
      categoryName: category?.name || 'Unassigned'
    }
    products.value.push(newProduct)
    return newProduct
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
      return products.value[index]
    }
    return null
  }

  const toggleProductActive = (id: number) => {
    const product = getProductById(id)
    if (product) {
      product.active = !product.active
    }
  }

  const decrementStock = (productId: number, qty: number, saleId: number) => {
    const product = getProductById(productId)
    if (product) {
      product.stockQty = Math.max(0, product.stockQty - qty)
      stockMovements.value.push({
        id: stockMovements.value.length + 1,
        productId,
        saleId,
        quantityDelta: -qty,
        reason: 'sale',
        createdAt: new Date().toISOString()
      })
    }
  }

  const restoreStock = (productId: number, qty: number, saleId: number) => {
    const product = getProductById(productId)
    if (product) {
      product.stockQty += qty
      stockMovements.value.push({
        id: stockMovements.value.length + 1,
        productId,
        saleId,
        quantityDelta: qty,
        reason: 'void_restoration',
        createdAt: new Date().toISOString()
      })
    }
  }

  return {
    categories,
    products,
    stockMovements,
    filterProducts,
    getProductById,
    getProductBySku,
    addProduct,
    updateProduct,
    toggleProductActive,
    decrementStock,
    restoreStock
  }
}
