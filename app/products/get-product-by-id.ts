// cspell:ignore productid jotai

import { Product } from '@/components/products/types'
import getProducts from './get-products'

/** Optimized Version of getProductById **/
export default async function getProduct(
  id: number,
  apiPageNum: number,
  itemsPerPage: number,
  numOfPages: number,
  productsFetched: Product[]
) {
  debugger
  {
    const lastIdx = productsFetched.length - 1
    const productCached =
      lastIdx < 0
        ? undefined
        : productsFetched[0].product_id === id
        ? productsFetched[0]
        : productsFetched[lastIdx].product_id === id
        ? productsFetched[lastIdx]
        : productsFetched.find((product) => product.product_id === id)

    if (productCached) {
      return {
        product: productCached,
        noMoreProducts: false,
        productsFetched,
      }
    }
  }
  // if product not cached, fetch it
  // Remember: data is sorted by date.
  const { products } = await getProducts(apiPageNum, itemsPerPage, numOfPages)
  const noMoreProducts = products.length === 0

  const lastIdx = products.length - 1
  const product =
    lastIdx < 0
      ? undefined
      : products[0].product_id === id
      ? products[0]
      : products[lastIdx].product_id === id
      ? products[lastIdx]
      : products.find((product) => product.product_id === id)

  return {
    product,
    noMoreProducts,
    productsFetched: [
      ...productsFetched.slice(0, (numOfPages - 1) * itemsPerPage),
      ...products,
    ],
  }
}
