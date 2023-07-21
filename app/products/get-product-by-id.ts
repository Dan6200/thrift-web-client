import { isProducts } from '@/components/products/types'
import getProducts from './get-products'

export default async function getProductById(id: number) {
  const products = await getProducts()

  if (!isProducts(products)) {
    throw new Error('Failed to fetch products')
  }

  return products.find((product) => product.product_id === id)
}
