import { isProduct } from '@/components/products/types'

export default async function getProductById(id: number) {
  // fetch product
  const response: unknown = await fetch(
    'https://thrift-dev.onrender.com/v1/products/' + id + '?public=true',
    { next: { revalidate: 5 * 60 } }
  ).then((res) => {
    if (res.status === 404) return null
    return res.json()
  })

  if (response == null) throw new Error('Product not found')
  if (!isProduct(response)) throw new Error('Invalid product')

  return response
}
