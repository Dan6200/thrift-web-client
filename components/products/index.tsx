//cspell: ignore semibold jotai
'use client'
import Link from 'next/link'
import { Card } from './card'
import { ProductImage } from './image'
import { Product } from './types'
import { atom, useAtom } from 'jotai'
import Paginate from '../pagination'
import { CardContent, CardFooter } from '../ui/card'

// One based to work well with mui component
export const pageNumAtom = atom(1)

/** Display products in a grid
 * @param products - The products to display
 * @param lastPage - Whether the last page has been reached
 * @param apiPageNum - The page number to fetch from the API
 * @returns A grid of products
 * @description This component displays pre-fetched products in a grid. It also
 * fetches more products from the API when the last page is reached
 * */

export const Products = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 50
  const CUT_OFF = 30
  const totalProducts = products.length
  const [pageNum] = useAtom(pageNumAtom)
  const productsToDisplay = products.slice(
    pageNum * itemsPerPage - itemsPerPage,
    pageNum * itemsPerPage
  )

  return (
    <div className="container p-2 mx-auto">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        All Categories
      </h2>
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
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
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
    </div>
  )
}
