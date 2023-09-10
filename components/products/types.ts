export interface Product {
  product_id: number
  title: string
  category_id: number
  category_name: string
  subcategory_id: number
  subcategory_name: string
  description: string[]
  list_price: number | string
  net_price: number | string
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
    typeof (product as Product).category_id === 'number' &&
    typeof (product as Product).category_name === 'string' &&
    typeof (product as Product).subcategory_id === 'number' &&
    typeof (product as Product).subcategory_name === 'string' &&
    (typeof (product as Product).list_price === 'number' ||
      typeof (product as Product).list_price === 'string') &&
    (typeof (product as Product).net_price === 'number' ||
      typeof (product as Product).net_price === 'string') &&
    typeof (product as Product).quantity_available === 'number' &&
    typeof (product as Product).created_at === 'string' &&
    typeof (product as Product).media === 'object' &&
    typeof (product as Product).media !== null &&
    (product as Product).media.every(
      (media) => typeof media.filename === 'string'
    ) &&
    (product as Product).media.every(
      (media) => typeof media.filepath === 'string'
    )
  )
}

export type ImgData =
  | {
      filename: string
      filepath: string
      description: string
      is_display_image: boolean
    }
  | undefined
