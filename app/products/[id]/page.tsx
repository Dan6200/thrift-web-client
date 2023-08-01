// Purpose: Page for displaying all products

import { Nav } from '@/components/nav'
import { Product } from '@/components/products/product'
import { isProductData } from '@/components/products/types'
import getProductById from '../get-product-by-id'
import getProducts from '../get-products'

/** Optimized version of Product page */
export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  let response = await getProductById(+id)
  let { product } = response
  if (product === undefined) {
    // TODO: Add 404 page
    throw new Error('Product not found')
  }

  return (
    <>
      <Nav />
      <Product product={product} />
    </>
  )
}

/**
 * Generate static paths for a few pages
 */
export async function generateStaticParams() {
  const data: unknown = await getProducts()
  if (!isProductData(data)) {
    throw new Error('Failed to fetch products')
  }
  const { products } = data

  return products.map((product) => ({
    id: product.product_id.toString(),
  }))
}
