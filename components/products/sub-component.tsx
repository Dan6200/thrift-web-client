'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'
import { useAtom } from 'jotai'
import { isMobileAtom } from '@/atoms'
import { Price } from './utils/price'

export const ProductsSubComponent = ({
  totalProducts,
  itemsPerPage,
  productsToDisplay,
}: {
  totalProducts?: number
  itemsPerPage?: number
  productsToDisplay: Product[]
}) => {
  const [isMobile, setIsMobile] = useAtom(isMobileAtom)
  if (typeof window !== 'undefined') {
    if (window.innerWidth > 400) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }
  const MAX_TITLE_LEN = isMobile ? 40 : 80
  return (
    <div className="mx-auto">
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
      <div className="w-full sm:px-4 sm:py-2 md:px-8 md:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {productsToDisplay.map((product) => (
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="active:bg-blue-100"
            key={product?.product_id}
          >
            <Card className="w-full sm:w-[30vw] md:w-[27vw] lg:w-[25vw] h-[22rem] overflow-hidden rounded-sm">
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
                <div className="w-full flex flex-wrap justify-between">
                  <Price
                    netPrice={product?.net_price}
                    listPrice={product?.list_price}
                  />
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
}
