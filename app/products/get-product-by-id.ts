//cspell:ignore ponyfill
import { isProduct } from '@/components/products/types'

export default async function getProductById(id: number) {
  // fetch product
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER + '/products/' + id + '?public=true',
    { next: { revalidate: 30 * 60 } }
  ).then((res) => {
    if (res.status === 404) return null
    return res.json()
  })
  if (response == null) throw new Error('Product not found')
  if (!isProduct(response)) throw new Error('Invalid product')
  return response
}
