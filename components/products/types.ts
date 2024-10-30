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
  vendor_id: string
  media: {
    filename: string
    description: string
    is_thumbnail_image: boolean
    is_landing_image: boolean
    is_video: boolean
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
    isObj(product) &&
    !isNull(product) &&
    isNumber((product as Product).product_id) &&
    isString((product as Product).title) &&
    !isNull((product as Product).description) &&
    isObj((product as Product).description) &&
    isNumber((product as Product).category_id) &&
    isString((product as Product).category_name) &&
    isNumber((product as Product).subcategory_id) &&
    isString((product as Product).subcategory_name) &&
    isString((product as Product).vendor_id) &&
    isNumberOrString((product as Product).list_price) &&
    isNumberOrString((product as Product).net_price) &&
    isString((product as Product).created_at) &&
    isNumber((product as Product).quantity_available) &&
    !isNull((product as Product).media) &&
    isObj((product as Product).media) &&
    (product as Product).media.every((media) => isString(media.filename))
  )
}

function isObj(obj: unknown): obj is object {
  const condition = typeof obj === 'object'
  if (!condition) throw new Error('must be of type object: ' + obj)
  return condition
}

function isString(val: unknown): val is string {
  const condition = typeof val === 'string'
  if (!condition) throw new Error('must be of type string: ' + val)
  return condition
}

function isNumberOrString(val: unknown): val is number | string {
  const condition = typeof val === 'number' || typeof val === 'string'
  if (!condition) throw new Error('must be of type number or string: ' + val)
  return condition
}

function isNumber(val: unknown): val is number {
  const condition = typeof val === 'number'
  if (!condition) throw new Error('must be of type number: ' + val)
  return condition
}

function isNull(val: unknown): val is null {
  const condition = val === null
  if (condition) throw new Error('value is null: ' + val)
  return condition
}

export type ImgData =
  | {
      filename: string
      description: string
      is_thumbnail_image: boolean
      is_landing_image: boolean
      is_video: boolean
    }
  | undefined
