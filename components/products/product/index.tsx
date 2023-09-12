'use client'
import { addItemAtom, getTotalCountAtom, shoppingCartAtom } from '@/atoms'
import { useToast } from '@/components/ui/use-toast'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { MoveLeft } from 'lucide-react'
import { ShoppingCart } from '@/components/shopping-cart/types'
import { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { GoBackLink } from '../go-back-link'
import { ProductImage } from '../image'
import { Product } from '../types'
import { BuyNow } from '../utils/buy-now'
import { Price } from './utils/price'

export function Product({ product }: { product: Product }) {
  const displayImg = product?.media?.find((img) => img?.is_display_image)
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
    <div className="container mx-auto p-5 my-20">
      <GoBackLink className="cursor-pointer text-sm text-blue-700 dark:text-blue-200 mb-8 block">
        <MoveLeft className="inline mr-4" />
        Go back
      </GoBackLink>
      <h2 className="sm:text-2xl sm:w-[80%] font-bold text-justify mb-16 break-words">
        {/* remove &nbsp;, that breaks the ui */}
        {product?.title.replace(/\u00A0/, ' ')}
      </h2>
      <Card className="flex flex-col sm:flex-row items-center rounded-sm py-4 w-full">
        <CardContent
          className="flex flex-col w-full sm:w-[50%] py-8 sm:h-full items-center justify-between"
          key={product?.product_id}
        >
          <div className="bg-white h-96 sm:mt-16 sm:h-[27rem] rounded-md">
            <ProductImage
              imgData={displayImg}
              className="object-cover py-4 border-b w-full h-full sm:w-96 rounded-md"
            />
          </div>
          <div className="flex flex-col my-4 p-2 sm:p-4 w-full sm:w-96 justify-between sm:h-48">
            <Price
              netPrice={product?.net_price}
              listPrice={product?.list_price}
            />
            <div className="flex mb-4">
              <p>
                items left:{'\u00A0'.repeat(4)}
                {product.quantity_available}
              </p>
            </div>
            <div className="flex w-full mb-4 justify-between">
              <Button
                className="w-28"
                onClick={() => {
                  shoppingCart
                    ? addItem(product)
                    : setShoppingCart(new ShoppingCart(product, null))
                  setShowToast(true)
                }}
              >
                Add To Cart
              </Button>
              <BuyNow
                imgData={displayImg}
                netPrice={product?.net_price}
                listPrice={product?.list_price}
                quantityAvailable={product?.quantity_available}
                isProductPage={true}
              />
            </div>
          </div>
        </CardContent>
        <div className="border-b-2 sm:border-l-2 sm:border-b-0 block w-[80%] sm:w-[.5pt] sm:h-80"></div>
        <CardContent className="w-full sm:w-[50%]">
          <h3 className="w-full mx-auto text-xl sm:text-2xl my-10 sm:my-16 font-bold text-center">
            About This Product
          </h3>
          {product?.description && (
            <div className="my-10 sm:mb-16">
              {product?.description?.map((desc, index) => (
                <p className="mb-4 text-md break-words" key={index}>
                  {/* remove &nbsp; that breaks ui */}
                  {desc.replace(/\u00A0/, ' ')}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
