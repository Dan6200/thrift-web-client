import { isProductData } from '@/components/products/types'
import getProducts from './get-products'

const pageNum = 0

export default async function getProductById(id: number) {
  const productData: unknown = await getProducts(pageNum, 50, 1)
  if (!isProductData(productData)) {
    throw new Error('Invalid product data')
  }

  const { products } = productData

  return products.find((product) => product.product_id === id)
}
