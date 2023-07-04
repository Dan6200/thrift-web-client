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
        <div className="w-full mx-auto grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              className="w-full p-2 mx-auto my-4 border-2 border-cyan-100 rounded-md"
              key={product.product_id}
            >
              <ProductImage
                src={product.media[0].filename}
                alt={product.media[0].description}
              />
              <Link
                href={`/products/${product.product_id}`}
                passHref
                className="inline-block w-full my-4 text-center"
              >
                <h4 className="text-sm font-semibold dark:text-blue-300">
                  {product.title.slice(0, 30) + '...'}
                </h4>
                <div className="flex flex-row my-2 w-[90%] mx-auto justify-between">
                  <p className="text-xs font-semibold dark:text-gray-100">
                    N {product.net_price}
                  </p>
                  {((product.list_price - product.net_price) /
                    product.list_price) *
                    100 >
                    5 && (
                    <p className="text-xs font-light dark:text-gray-500">
                      {Math.ceil(
                        ((product.list_price - product.net_price) /
                          product.list_price) *
                          100
                      )}
                      % off
                    </p>
                  )}
                </div>
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
