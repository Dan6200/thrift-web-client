export interface Product {
  product_id: number
  title: string
  category: string
  description: string[]
  list_price: number
  net_price: number
  quantity_available: number
  created_at: string
  media: {
    filename: string
    filepath: string
    description: string
    is_display_image: boolean
  }[]
}

export type ProductData = {
  products: Product[]
  total_products: number
}

export function isProductData(
  productData: unknown
): productData is ProductData {
  debugger
  return (
    typeof productData === 'object' &&
    productData !== null &&
    typeof (productData as ProductData).products === 'object' &&
    typeof (productData as ProductData).products !== null &&
    typeof (productData as ProductData).total_products === 'string'
  )
}

export function isProducts(products: unknown): products is Product[] {
  return (
    Array.isArray(products) && products.every((product) => isProduct(product))
  )
}

export function isProduct(product: unknown): product is Product {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof (product as Product).product_id === 'number' &&
    typeof (product as Product).title === 'string' &&
    typeof (product as Product).description === 'object' &&
    typeof (product as Product).description !== null &&
    typeof (product as Product).category === 'string' &&
    typeof (product as Product).list_price === 'number' &&
    typeof (product as Product).net_price === 'number' &&
    typeof (product as Product).quantity_available === 'number' &&
    typeof (product as Product).created_at === 'string' &&
    typeof (product as Product).media === 'object' &&
    typeof (product as Product).media !== null &&
    typeof (product as Product).media[0].filename === 'string'
  )
}
