'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  addItemAtom,
  getTotalCountAtom,
  isSmallScreenAtom,
  shoppingCartAtom,
} from '@/atoms'
import { Price } from './utils/price'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BuyNow } from './utils/buy-now'
import { useToast } from '../ui/use-toast'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { ShoppingCart } from '../shopping-cart/types'
import { useEffect, useState } from 'react'

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
  const MAX_TITLE_LEN = isSmallScreen ? 50 : 90
  const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom)
  const addItem = useSetAtom(addItemAtom)
  const totalItems = useAtomValue(getTotalCountAtom)
  const { toast } = useToast()
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if (showToast)
      toast({
        title: `${totalItems} Items Added To Cart.`,
      })
  }, [showToast, totalItems])
  return (
    <div className="mx-auto">
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
      <div className="w-full sm:px-2 sm:py-2 md:px-4 md:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {productsToDisplay.map((product) => (
          <Card
            key={product?.product_id}
            className="w-full sm:w-[30vw] md:w-[25vw] lg:w-[22vw] h-[25rem] overflow-hidden rounded-sm"
          >
            <Link
              href={`/products/${product?.product_id}`}
              passHref
              className="hover:bg-primary/20"
            >
              <CardContent className="bg-white border-b p-0 w-full flex items-center h-48">
                <ProductImage
                  className="object-contain w-full max-h-40"
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                />
              </CardContent>
            </Link>
            <CardFooter className="p-2 sm:p-4 flex flex-col items-center justify-between h-52">
              <Link
                href={`/products/${product?.product_id}`}
                passHref
                className="active:bg-blue-100 flex flex-col justify-between h-40"
              >
                <h4 className="hover:text-primary dark:hover:text-secondary my-2 w-full whitespace-normal break-words">
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
              </Link>
              <div className="flex w-full mt-4 justify-between">
                <Button
                  className="shadow-around p-1 h-9 w-16 sm:w-[9vw]"
                  variant="outline"
                  onClick={() => {
                    shoppingCart
                      ? addItem(product)
                      : setShoppingCart(new ShoppingCart(product, null))
                    setShowToast(true)
                  }}
                >
                  {isSmallScreen ? (
                    <>
                      <ShoppingCartIcon />
                      <Plus className="w-4" />
                    </>
                  ) : (
                    'Add To Cart'
                  )}
                </Button>
                <BuyNow
                  imgData={product?.media?.find((img) => img?.is_display_image)}
                  netPrice={product?.net_price}
                  listPrice={product?.list_price}
                  quantityAvailable={product?.quantity_available}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
    </div>
  )
}
