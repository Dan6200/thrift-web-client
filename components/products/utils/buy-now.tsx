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
  isProductPage,
  imgData,
  netPrice,
  quantityAvailable,
}: {
  imgData: ImgData
  netPrice: string | number
  listPrice: string | number
  quantityAvailable: number
  isProductPage?: boolean
}) => {
  const shippingInfo = useAtomValue(shippingInfoAtom)
  const [isAddingShipping, setIsAddingShipping] = useState(false)
  const [isSelectingQuantity, setIsSelectingQuantity] = useState(true)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isProductPage ? (
          <Button className="text-base text-primary-foreground hover:transition-colors font-bold w-full bg-secondary flex-1 bg-gradient-to-r hover:bg-gradient-to-l from-secondary to-primary">
            Buy Now
          </Button>
        ) : (
          <Button
            className="hover:bg-green-500 p-1 h-9 w-full"
            variant="outline"
          >
            {/*isSmallScreen ? (
              <>
                <ShoppingCart />
                <Check className="w-4" />
              </>
            ) : (
              'Buy Now'
						)*/}
            Buy Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="transition-all ease-in-out overflow-y-scroll rounded-md w-[90vw] p-8 py-16 md:p-16 h-[90vh] sm:h-[80vh] sm:w-[80vw] md:w-[70vw] max-w-none">
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
        ) : isAddingShipping ? (
          <AddShippingInfo
            shippingInfo={shippingInfo}
            setIsAddingCard={setIsAddingCard}
            setIsAddingShipping={setIsAddingShipping}
            setIsSelectingQuantity={setIsSelectingQuantity}
          />
        ) : isAddingCard ? (
          <AddCardInfo
            shippingInfo={shippingInfo}
            setIsAddingCard={setIsAddingCard}
            setIsAddingShipping={setIsAddingShipping}
            setIsSelectingQuantity={setIsSelectingQuantity}
          />
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  )
}
