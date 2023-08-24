//cspell:ignore ponyfill
import { isProduct } from '@/components/products/types'
import fetchPonyfill from 'fetch-ponyfill'

export default async function getProductById(id: number) {
  // fetch product
  let response: unknown
  if (process.env.NODE_ENV === 'production') {
    response = await fetch(
      'https://thrift-dev.onrender.com/v1/products/' + id + '?public=true',
      { next: { revalidate: 30 * 60 } }
    ).then((res) => {
      if (res.status === 404) return null
      return res.json()
    })
    if (response == null) throw new Error('Product not found')
    if (!isProduct(response)) throw new Error('Invalid product')
  } else {
    response = await fetchPonyfill()
      .fetch(
        'https://thrift-dev.onrender.com/v1/products/' + id + '?public=true',
        { next: { revalidate: 30 * 60 } }
      )
      .then((res) => {
        if (res.status === 404) return null
        return res.json()
      })
    if (response == null) throw new Error('Product not found')
    if (!isProduct(response)) throw new Error('Invalid product')
  }
  return response
}
