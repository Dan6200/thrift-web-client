// cspell:disable
// Purpose: Page for displaying all products

import { Product as ProductComp } from '@/components/products/single-product'
import { Product } from '@/components/products/types'
import getProductById from '../get-product-by-id'

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await getProductById(+id)
  if (product === undefined) {
    throw new Error('Product not found')
  }
  return <ProductComp product={product} />
}

export async function generateStaticParams() {
  const products: Product[] = await fetch(
    'https://thrift-dev.up.railway.app/v1/public/products',
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())

  return products.map((product) => ({
    id: product.product_id.toString(),
  }))
}
