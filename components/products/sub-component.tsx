// cspell: ignore semibold jotai
'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'

export const ProductsSubComponent = ({
  cutOff,
  totalProducts,
  itemsPerPage,
  productsToDisplay,
}: {
  cutOff: number
  totalProducts?: number
  itemsPerPage?: number
  productsToDisplay: Product[]
}) => (
  <div className="mx-auto">
    <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
      All Categories
    </h2>
    {totalProducts && itemsPerPage && (
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
    )}
    <div className="w-full mx-auto place-items-center grid grid-cols-2 gap-2">
      {productsToDisplay.map((product) => (
        <Link
          href={`/products/${product?.product_id}`}
          passHref
          className="active:bg-blue-100"
          key={product?.product_id}
        >
          <Card className="w-full h-[22rem] overflow-hidden rounded-sm">
            <CardContent className="bg-white border-b p-0 w-full flex items-center h-44">
              <ProductImage
                className="object-contain w-full max-h-40"
                imgData={product?.media?.find((img) => img?.is_display_image)}
              />
            </CardContent>
            <CardFooter className="p-2 flex flex-col items-center justify-between h-40">
              <h4 className="my-4">
                {product?.title.slice(0, cutOff) + '...'}
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
    {totalProducts && itemsPerPage && (
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
    )}
  </div>
)
