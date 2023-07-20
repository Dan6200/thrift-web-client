import Link from 'next/link'
import { ProductImage } from './image'
import { Product } from './types'

export const Products = ({ products }: { products: Product[] }) => (
  <div className="container mx-auto my-20">
    <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
      All Products
    </h2>
    <div className="w-full mx-auto grid grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          className="w-full p-2 mx-auto my-4 h-64 border-[.5pt] dark:border-gray-500 rounded-md"
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
            <div className="flex flex-col justify-between h-24 mt-4">
              <h4 className="whitespace-pre-wrap text-sm font-semibold text-left dark:text-blue-300">
                {product?.title.slice(0, 30) + '...'}
              </h4>
              <div className="flex flex-row my-2 w-[90%] mx-auto justify-between">
                <p className="text-xs font-semibold dark:text-gray-100">
                  {product?.net_price.toLocaleString('en-NG', {
                    currency: 'NGN',
                    style: 'currency',
                  })}
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
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
)
