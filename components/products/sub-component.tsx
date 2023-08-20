'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'
import { Price } from './utils/price'
import { Button } from '@/components/ui/button'
import { Plus, ShoppingCart } from 'lucide-react'

export const ProductsSubComponent = ({
  totalProducts,
  itemsPerPage,
  productsToDisplay,
}: {
  totalProducts?: number
  itemsPerPage?: number
  productsToDisplay: Product[]
}) => {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const MAX_TITLE_LEN = isSmallScreen ? 40 : 80
  return (
    <div className="mx-auto">
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
      <div className="w-full sm:px-4 sm:py-2 md:px-8 md:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {productsToDisplay.map((product) => (
          <Link
            href={`/products/${product?.product_id}`}
            passHref
            className="active:bg-blue-100"
            key={product?.product_id}
          >
            <Card className="w-full sm:w-[30vw] md:w-[25vw] lg:w-[22vw] h-[23rem] overflow-hidden rounded-sm">
              <CardContent className="bg-white border-b p-0 w-full flex items-center h-40">
                <ProductImage
                  className="object-contain w-full max-h-40"
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                />
              </CardContent>
              <CardFooter className="p-2 sm:p-4 flex flex-col items-center justify-between h-52">
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
                <div className="flex w-full mt-4 justify-between">
                  <Button className="p-1 h-9 w-20 sm:w-32" variant={'outline'}>
                    {isSmallScreen ? (
                      <>
                        <ShoppingCart />
                        <Plus className="w-4" />
                      </>
                    ) : (
                      'Add To Cart'
                    )}
                  </Button>
                  <Button className="p-1 h-9 w-20 sm:w-32" variant="outline">
                    Buy Now
                  </Button>
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
