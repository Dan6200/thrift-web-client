'use client'
import { ProductImage } from '../image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { useState } from 'react'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import { CardContent } from '@/components/ui/card'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom, shippingInfoAtom } from '@/atoms'
import { ImgData } from '../types'

export const BuyNow = ({
  imgData,
  netPrice,
  quantityAvailable,
}: {
  imgData: ImgData
  netPrice: string | number
  listPrice: string | number
  quantityAvailable: number
}) => {
  const shippingInfo = useAtomValue(shippingInfoAtom)
  const [isAddingShipping, setIsAddingShipping] = useState(false)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-neutral-700 p-1 h-9 w-16 sm:w-[9vw]"
          variant="outline"
        >
          {isSmallScreen ? (
            <>
              <ShoppingCart />
              <Check className="w-4" />
            </>
          ) : (
            'Add To Cart'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] p-8 py-16 md:p-16 h-[80vh] sm:w-[80vw] md:w-[70vw] max-w-none">
        {isAddingShipping ? (
          isAddingCard ? null : null
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Purchase Item</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row items-center w-full">
              <CardContent className="rounded-md bg-white border-b p-0 w-44 flex items-center h-44">
                <ProductImage
                  className="object-contain md:w-[20vw] max-h-40 object-center"
                  imgData={imgData}
                />
              </CardContent>
              <div className="flex flex-col md:flex-row mx-auto mt-8 w-full items-center">
                <p className="md:ml-8 md:mb-0 mb-4">Quantity:</p>
                <div className="flex h-fit items-center border w-28 justify-between p-0 md:ml-8 rounded-md">
                  <Button
                    onClick={() => {
                      quantity > 1 ? setQuantity(quantity - 1) : null
                    }}
                    variant={'outline'}
                    className="p-2 border-r border-y-0 border-l-0 h-9 rounded-none m-0"
                  >
                    <Minus className="w-4" />
                  </Button>
                  <p className="mx-auto p-2">{quantity}</p>
                  <Button
                    onClick={() => {
                      quantity <= quantityAvailable
                        ? setQuantity(quantity + 1)
                        : null
                    }}
                    variant={'outline'}
                    className="p-2 border-l border-y-0 border-r-0 h-9 rounded-none m-0"
                  >
                    <Plus className="w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col md:flex-row text-lg justify-between sm:justify-between md:justify-between items-center md:w-full">
              <div className="flex items-center">
                <DialogTitle className="mr-8 text-xl">Total:</DialogTitle>
                <p className="font-bold">
                  {typeof netPrice === 'number'
                    ? (netPrice * quantity).toLocaleString('en-NG', {
                        currency: 'NGN',
                        style: 'currency',
                      })
                    : (parseFloat(netPrice) * quantity).toLocaleString(
                        'en-NG',
                        {
                          currency: 'NGN',
                          style: 'currency',
                        }
                      )}
                </p>
              </div>
              {shippingInfo ? (
                <Button>Continue With Purchase</Button>
              ) : (
                <Button>Add Shipping Info</Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
