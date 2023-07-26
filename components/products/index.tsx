//cspell: ignore semibold
'use client'
import getProducts from '@/app/products/get-products'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card } from './card'
import { ProductImage } from './image'
import { PageButton } from './page-button'
import { isProductData, Product } from './types'

/** Display products in a grid
 * @param products - The products to display
 * @param lastPage - Whether the last page has been reached
 * @param apiPageNum - The page number to fetch from the API
 * @returns A grid of products
 * @description This component displays pre-fetched products in a grid. It also
 * fetches more products from the API when the last page is reached
 * */

export const Products = ({
  products,
  totalProducts: total,
  apiPageNum: _apiPageNum,
  itemsPerPage,
}: {
  products: Product[]
  totalProducts: number
  apiPageNum: number
  itemsPerPage: number
}) => {
  const [pageNum, setPageNum] = useState(0)
  const [apiPageNum, setApiPageNum] = useState(_apiPageNum)
  const [allProducts, setAllProducts] = useState<Product[]>(products)
  const productsToDisplay = allProducts.slice(
    pageNum * itemsPerPage,
    pageNum * itemsPerPage + itemsPerPage
  )
  const [totalProducts, setTotalProducts] = useState(total)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchMoreProducts() {
      setLoading((_) => true)
      const productData: unknown = await getProducts(apiPageNum, itemsPerPage)
      if (!isProductData(productData)) {
        throw new Error('Failed to fetch products')
      }
      const { products: newProducts, total_products } = productData
      console.log('new products: ', newProducts.length)
      setAllProducts([...allProducts, ...newProducts])
      setLoading((_) => false)
      setApiPageNum(apiPageNum + 1)
      setTotalProducts(+total_products)
    }

    console.log(
      '\napi page num: ',
      apiPageNum + 1,
      '\n page num: ',
      pageNum + 1,
      '\nall products fetched: ',
      allProducts.length,
      '\ntotal products: ',
      totalProducts
    )

    if (allProducts.length < totalProducts) {
      fetchMoreProducts()
    }
  }, [pageNum])

  return (
    <div className="container mx-auto p-8 my-20">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        All Products
      </h2>
      <PagingProducts
        loading={loading}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalProducts={totalProducts}
        itemsPerPage={itemsPerPage}
      />
      <div className="w-full mx-auto grid grid-cols-2 gap-4">
        {loading && <p className="w-full text-center">Loading...</p>}
        {productsToDisplay.map((product) => (
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="active:dark:bg-slate-800 w-fit"
            key={product?.product_id}
          >
            <Card className="w-full p-2 mx-auto text-center my-4 h-64 bg-neutral-100 dark:bg-neutral-800 border-[.5pt] border-neutral-200 shadow-md dark:border-none rounded-md">
              <div className="bg-white dark:bg-white rounded-sm">
                <ProductImage
                  className="object-contain w-full h-32"
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                />
              </div>
              <div className="flex flex-col justify-between h-24 mt-4">
                <h4 className="whitespace-pre-wrap text-sm font-semibold text-left text-blue-500 dark:text-blue-300">
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
      <PagingProducts
        loading={loading}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalProducts={totalProducts}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}

export function PagingProducts({
  loading,
  pageNum,
  setPageNum,
  totalProducts,
  itemsPerPage,
}: React.PropsWithChildren<{
  loading: boolean
  pageNum: number
  setPageNum: (pageNum: number) => void
  totalProducts: number
  itemsPerPage: number
}>) {
  const disablePrev = pageNum === 0
  const disableNext =
    pageNum * itemsPerPage >= totalProducts ||
    loading ||
    Math.floor(totalProducts / itemsPerPage) === pageNum
  return (
    <div className="flex text-sm flex-row justify-between w-full mx-auto">
      <PageButton
        onClick={() => setPageNum(pageNum - 1)}
        disabled={disablePrev}
        className={
          disablePrev
            ? 'dark:border-gray-700 dark:text-gray-700 border-gray-400 text-gray-400 border-[.5pt] rounded-md px-4 py-2'
            : undefined
        }
      >
        Previous
      </PageButton>
      <span className="align-middle my-2">{pageNum + 1}</span>
      <PageButton
        onClick={() => setPageNum(pageNum + 1)}
        disabled={disableNext}
        className={
          disableNext
            ? 'dark:border-gray-700 dark:text-gray-700 border-gray-400 text-gray-400 border-[.5pt] rounded-md px-4 py-2'
            : undefined
        }
      >
        Next
      </PageButton>
    </div>
  )
}
