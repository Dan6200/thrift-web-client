'use client'
import { ProductImage } from '../image'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Minus, Plus } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { ImgData } from '../types'
import ShippingInfo from '@/components/shipping-info/types'

export const SelectQuantity = ({
  quantity,
  quantityAvailable,
  setQuantity,
  shippingInfo,
  imgData,
  netPrice,
  setIsAddingCard,
  setIsAddingShipping,
  setIsSelectingQuantity,
}: {
  quantity: number
  quantityAvailable: number
  setQuantity: Dispatch<SetStateAction<number>>
  shippingInfo: ShippingInfo | null
  imgData: ImgData
  netPrice: string | number
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
  setIsAddingShipping: Dispatch<SetStateAction<boolean>>
  setIsSelectingQuantity: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader>
      <DialogTitle>Purchase Item</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col md:flex-row items-center w-full">
      <div className="rounded-md bg-white shadow-md border p-0 w-44 sm:w-72 md:w-[50%] flex items-center h-44">
        <ProductImage
          className="object-contain sm:w-[80%] mx-auto max-h-40 object-center"
          imgData={imgData}
        />
      </div>
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
              quantity <= quantityAvailable ? setQuantity(quantity + 1) : null
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
            : (parseFloat(netPrice) * quantity).toLocaleString('en-NG', {
                currency: 'NGN',
                style: 'currency',
              })}
        </p>
      </div>
      {shippingInfo ? (
        <div className="flex flex-col md:flex-row justify-between h-24 md:h-fit">
          <Button
            onClick={() => {
              setIsSelectingQuantity(false)
              setIsAddingCard(true)
            }}
            className="flex mx-auto font-semibold bg-green-600 w-full sm:w-48 md:w-32 h-10 text-lg text-tertiary hover:bg-green-500"
          >
            Checkout
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            setIsSelectingQuantity(false)
            setIsAddingShipping(true)
          }}
          className="flex mx-auto font-semibold bg-green-600 w-full sm:w-48 md:w-32 h-10 text-lg text-tertiary hover:bg-green-500"
        >
          Checkout
        </Button>
      )}
    </DialogFooter>
  </>
)
