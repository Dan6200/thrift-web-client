// cspell:disable
// Purpose: Page for displaying all products

import { Product } from '@/components/products/single-product'
import { isProduct, isProducts } from '@/components/products/types'
import getProductById from '../get-product-by-id'

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await getProductById(+id)
  if (!isProduct(product)) {
    throw new Error('Product not found')
  }
  return <Product product={product} />
}

export async function generateStaticParams() {
  const products: unknown = await fetch(
    'https://thrift-dev.onrender.com/v1/public/products?' +
      new URLSearchParams({
        limit: '100',
        sort: 'created_at',
        order: 'desc',
      }),
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())

  if (!isProducts(products)) {
    throw new Error('Failed to fetch products')
  }

  return products.map((product) => ({
    id: product.product_id.toString(),
  }))
}
