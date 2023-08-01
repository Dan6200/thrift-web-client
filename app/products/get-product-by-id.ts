import getProducts from './get-products'

/** Optimized Version of getProductById **/
export default async function getProductById(id: number) {
  // if product not cached, fetch it
  // Remember: data is sorted by date.
  const { products } = await getProducts()

  return {
    product: products.find((product) => product.product_id === id),
  }
}
