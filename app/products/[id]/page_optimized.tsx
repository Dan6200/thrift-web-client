// cspell:disable
// Purpose: Page for displaying all products

import { Nav } from '@/components/nav'
import { Product } from '@/components/products/single-product'
import { isProductData } from '@/components/products/types'
import getProductById from '../get-product-by-id'
import getProducts from '../get-products'
import { ITEMS_PER_PAGE } from '../page'

/** Optimized version of Product page */
export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  let numOfPages = 3
  let apiPageNum = 0
  let response = await getProductById(
    +id,
    apiPageNum,
    ITEMS_PER_PAGE,
    numOfPages,
    []
  )
  let { product, noMoreProducts, productsFetched } = response
  while (!product && !noMoreProducts) {
    ;({ product, productsFetched, noMoreProducts } = await getProductById(
      +id,
      ++apiPageNum,
      ITEMS_PER_PAGE,
      numOfPages,
      productsFetched
    ))
  }
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
  const apiPageNum = 0
  const numOfPages = 1
  const data: unknown = await getProducts(
    apiPageNum,
    ITEMS_PER_PAGE,
    numOfPages
  )
  if (!isProductData(data)) {
    throw new Error('Failed to fetch products')
  }

  const { products } = data

  return products.map((product) => ({
    id: product.product_id.toString(),
  }))
}
