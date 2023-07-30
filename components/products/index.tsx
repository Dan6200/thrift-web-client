//cspell: ignore semibold jotai
'use client'
import Link from 'next/link'
import { Card } from './card'
import { ProductImage } from './image'
import { PageButton } from './page-button'
import { Product } from './types'
import { atom, useAtom } from 'jotai'
import Paginate from '../pagination'

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
  const totalProducts = products.length
  const [pageNum] = useAtom(pageNumAtom)
  const productsToDisplay = products.slice(
    pageNum * itemsPerPage - itemsPerPage,
    pageNum * itemsPerPage
  )

  return (
    <div className="mx-auto">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        All Categories
      </h2>
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      <div className="w-full mx-auto place-items-center grid grid-cols-2 gap-2">
        {productsToDisplay.map((product) => (
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="active:dark:bg-slate-800 w-fit"
            key={product?.product_id}
          >
            <Card className="w-full p-2 mx-auto text-center my-4 h-64 bg-neutral-100 dark:bg-neutral-800 border-[.5pt] border-neutral-200 shadow-md dark:border-none rounded-md">
              <div className="w-full h-32 bg-white dark:bg-white rounded-sm">
                <ProductImage
                  className="object-contain w-full max-w-[8rem] h-full"
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                />
              </div>
              <div className="flex flex-col justify-between h-24 w-fit mt-4">
                <h4 className="max-w-[9rem] w-36 whitespace-normal break-words text-sm font-semibold text-left text-blue-500 dark:text-blue-300">
                  {product?.title.slice(0, 25) + '...'}
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
      <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
    </div>
  )
}
