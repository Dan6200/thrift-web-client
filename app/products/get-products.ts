import axios from 'axios'
export interface Product {
  product_id: number
  title: string
  category: string
  description: string[]
  list_price: number
  net_price: number
  quantity_available: number
  media: { filename: string; description: string }[]
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(
      'https://thrift-dev.up.railway.app/v1/public/products?offset=0&limit=100'
    )
    const products = (await response.data) as Product[]
    return products
  } catch (err) {
    throw err
  }
}
