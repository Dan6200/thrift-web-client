//cspell: ignore semibold jotai
'use client'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ProductImage } from './image'
import { Product } from './types'

/** Display products in a grid
 * for home page only
 * @returns A grid of products
 * @description This component displays pre-fetched products in a grid. It also
 * fetches more products from the API when the last page is reached
 * */

export const ProductsHome = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 50
  const productsToDisplay = products.slice(0, itemsPerPage)
  const CUT_OFF = 30

  return (
    <div className="mx-auto">
      <h2 className="w-full mx-auto my-8 text-xl font-bold text-center">
        All Categories
      </h2>
      <div className="w-full mx-auto place-items-center grid grid-cols-2 gap-2">
        {productsToDisplay.map((product) => (
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="active:bg-blue-100"
            key={product?.product_id}
          >
            <Card className="w-[10.5rem] h-[22rem] overflow-hidden rounded-sm">
              <CardContent className="bg-white border-b p-0 w-full flex items-center h-44">
                <ProductImage
                  className="object-contain w-40 max-h-40"
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                />
              </CardContent>
              <CardFooter className="p-2 flex flex-col items-center justify-between h-40">
                <h4 className="my-4">
                  {product?.title.slice(0, CUT_OFF) + '...'}
                </h4>
                <div className="w-full flex justify-between">
                  <p className="">
                    {product?.net_price.toLocaleString('en-NG', {
                      currency: 'NGN',
                      style: 'currency',
                    })}
                  </p>
                  {((product?.list_price - product?.net_price) /
                    product?.list_price) *
                    100 >
                    5 && (
                    <p className="">
                      {Math.ceil(
                        ((product?.list_price - product?.net_price) /
                          product?.list_price) *
                          100
                      )}
                      % off
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
