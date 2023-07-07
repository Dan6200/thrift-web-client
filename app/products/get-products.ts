import { Product } from '@/components/products/types'
import axios from 'axios'

export const revalidate = 30 * 60

export default async function getProducts() {
  try {
    const response = await axios.get(
      'https://thrift-dev.up.railway.app/v1/public/products'
    )
    return (await response.data) as Product[]
  } catch (e) {
    console.error(e)
  }
}
