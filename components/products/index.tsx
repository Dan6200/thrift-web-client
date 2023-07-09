import Link from 'next/link'
import { ProductImage } from './image'
import { Product } from './types'

export const Products = ({ products }: { products: Product[] }) => (
  <div className="container mx-auto my-20 w-80">
    <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
      Products
    </h2>
    <div className="w-full mx-auto grid grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          className="w-full p-2 mx-auto my-4 border-[.5pt] dark:border-gray-500 rounded-md"
          key={product?.product_id}
        >
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="inline-block w-full text-center"
          >
            <ProductImage
              className="object-cover w-full h-32"
              imgData={product?.media?.find((img) => img?.is_display_image)}
            />
            <h4 className="text-sm font-semibold dark:text-blue-300">
              {product?.title.slice(0, 30) + '...'}
            </h4>
            <div className="flex flex-row my-2 w-[90%] mx-auto justify-between">
              <p className="text-xs font-semibold dark:text-gray-100">
                N {product?.net_price}
              </p>
              {((product?.list_price - product?.net_price) /
                product?.list_price) *
                100 >
                5 && (
                <p className="text-xs font-light dark:text-gray-300">
                  {Math.ceil(
                    ((product?.list_price - product?.net_price) /
                      product?.list_price) *
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
