//cspell: ignore semibold
import Link from 'next/link'
import { ProductImage } from './image'
import { Product } from './types'

export const Products = ({ products }: { products: Product[] }) => (
  <div className="container mx-auto p-8 my-20">
    <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
      All Products
    </h2>
    <div className="w-full mx-auto grid grid-cols-2 gap-4">
      {products.map((product) => (
        <Link
          href={`/products/${product?.product_id}`}
          passHref
          className="active:dark:bg-slate-800 w-fit"
          key={product?.product_id}
        >
          <Card
            className="w-full p-2 mx-auto text-center my-4 h-64 bg-stone-100 dark:bg-neutral-800 border-[.5pt] border-stone-200 shadow-md dark:border-none rounded-md"
            key={product?.product_id}
          >
            <div className="bg-white dark:bg-white rounded-sm">
              <ProductImage
                className="object-contain w-full h-32"
                imgData={product?.media?.find((img) => img?.is_display_image)}
              />
            </div>
            <div className="flex flex-col justify-between h-24 mt-4">
              <h4 className="whitespace-pre-wrap text-sm font-semibold text-left text-blue-500 dark:text-blue-300">
                {product?.title.slice(0, 50) + '...'}
              </h4>
              <div className="flex flex-row my-2 w-full mx-auto justify-between">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
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
          </Card>
        </Link>
      ))}
    </div>
  </div>
)

function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}
