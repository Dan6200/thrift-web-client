// cspell:disable
// Purpose: Page for displaying all products

import { Product } from '@/components/products/single-product'
import getProductById from '../get-product-by-id'

export default async function ProductPage({
  params: { id },
}: {
  params: { id: number }
}) {
  const product = await getProductById(id)
  return <Product product={product} />
}
