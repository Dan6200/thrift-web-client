import { Product } from '@/components/products/types'

export default async function getProductById(id: number) {
  const products: Product[] = await fetch(
    'https://thrift-app-v2.onrender.com/v1/public/products?limit=100,sort=created_at',
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())
  return products.find((product) => product.product_id === id)
}
