'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'

export const ProductsSubComponent = ({
  MAX_TITLE_LEN,
  totalProducts,
  itemsPerPage,
  productsToDisplay,
}: {
  MAX_TITLE_LEN: number
  totalProducts?: number
  itemsPerPage?: number
  productsToDisplay: Product[]
}) => (
  <div className="mx-auto">
    {totalProducts && itemsPerPage && (
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
    )}
    <div className="w-full sm:px-8 sm:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:grid-cols-4">
      {productsToDisplay.map((product) => (
        <Link
          href={`/products/${product?.product_id}`}
          passHref
          className="active:bg-blue-100"
          key={product?.product_id}
        >
          <Card className="w-full sm:w-72 h-[22rem] overflow-hidden rounded-sm">
            <CardContent className="bg-white border-b p-0 w-full flex items-center h-44">
              <ProductImage
                className="object-contain w-full max-h-40"
                imgData={product?.media?.find((img) => img?.is_display_image)}
              />
            </CardContent>
            <CardFooter className="p-2 sm:p-4 flex flex-col items-center justify-between h-40">
              <h4 className="my-4 w-full whitespace-normal break-words">
                {/* remove &nbsp; that breaks ui */}
                {product?.title
                  .slice(0, MAX_TITLE_LEN)
                  .replace(/\u00A0/g, ' ') + '...'}
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
