import { Product } from '@/components/products/types'

export default async function getProductById(id: number) {
  const products: Product[] = await fetch(
    'https://thrift-dev.up.railway.app/v1/public/products',
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())
  return products.find((product) => product.product_id === id)
}
