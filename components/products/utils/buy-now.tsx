'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'
import { useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom, shippingInfoAtom } from '@/atoms'
import { ImgData } from '../types'
import { AddShippingInfo } from './add-shipping-info'
import { SelectQuantity } from './select-quantity'
import { AddCardInfo } from './add-card-info'

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
  const [isSelectingQuantity, setIsSelectingQuantity] = useState(true)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  console.log('adding shipping', isAddingShipping)
  console.log('adding card', isAddingCard)
  console.log('selecting quantity', isSelectingQuantity)
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
            'Buy Now'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll rounded-md w-[80vw] p-8 py-16 md:p-16 h-[80vh] sm:w-[80vw] md:w-[70vw] max-w-none">
        {isSelectingQuantity ? (
          <SelectQuantity
            quantity={quantity}
            quantityAvailable={quantityAvailable}
            setQuantity={setQuantity}
            shippingInfo={shippingInfo}
            imgData={imgData}
            netPrice={netPrice}
            setIsSelectingQuantity={setIsSelectingQuantity}
            setIsAddingCard={setIsAddingCard}
            setIsAddingShipping={setIsAddingShipping}
          />
        ) : !shippingInfo && isAddingShipping ? (
          <AddShippingInfo
            shippingInfo={shippingInfo}
            setIsAddingCard={setIsAddingCard}
            setIsAddingShipping={setIsAddingShipping}
          />
        ) : isAddingCard ? (
          <AddCardInfo
            shippingInfo={shippingInfo}
            setIsAddingCard={setIsAddingCard}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
