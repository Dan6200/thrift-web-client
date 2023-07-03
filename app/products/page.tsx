// cspell:ignore CldImage, cloudinary, cloudinary's
// Purpose: Page for displaying all products
import Link from 'next/link'
import { ProductImage } from '../../components/products/image'
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

export default async function Products() {
  try {
    const response = await axios.get(
      'https://thrift-dev.up.railway.app/v1/public/products?offset=0&limit=100'
    )
    const products = (await response.data) as Product[]
    return (
      <div className="container mx-auto my-20 w-80">
        <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
          Products
        </h2>
        <div className="flex flex-col w-full mx-auto">
          {products.map((product) => (
            <div className="w-full mx-auto my-4" key={product.product_id}>
              <ProductImage
                src={product.media[0].filename}
                alt={product.media[0].description}
              />
              <Link
                href={`/products/${product.product_id}`}
                passHref
                className="inline-block w-full text-center text-blue-500"
              >
                {product.title.slice(0, 30) + '...'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (err) {
    throw err
  }
}
