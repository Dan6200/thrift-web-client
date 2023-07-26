// cspell:disable
// Purpose: Page for displaying all products

import { Nav } from '@/components/nav'
import { Product } from '@/components/products/single-product'
import {
  isProduct,
  isProductData,
  isProducts,
} from '@/components/products/types'
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
  return (
    <>
      <Nav /> <Product product={product} />
    </>
  )
}

export async function generateStaticParams() {
  const data: unknown = await fetch(
    'https://thrift-dev.onrender.com/v1/products?' +
      new URLSearchParams({
        public: 'true',
        limit: '100',
        sort: 'created_at',
        order: 'desc',
      }),
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())

  if (!isProductData(data)) {
    throw new Error('Failed to fetch products')
  }

  const { products } = data

  return products.map((product) => ({
    id: product.product_id.toString(),
  }))
}
