import { Product } from '@/components/products/types'
import axios from 'axios'

export const revalidate = 120 * 60

export default async function getProductById(id: number) {
  const response = await axios.get(
    `https://thrift-dev.up.railway.app/v1/public/products/${id}`
  )
  return (await response.data) as Product
}
