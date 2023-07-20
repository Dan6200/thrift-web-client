import { isProducts } from '@/components/products/types'

export default async function getProducts() {
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
  return products
}
