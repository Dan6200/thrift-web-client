'use client'
import { ProductImage } from '../image'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { CardContent } from '@/components/ui/card'
import { Dispatch, SetStateAction } from 'react'
import { ImgData } from '../types'
import ShippingInfo from '@/components/shipping-info/types'
import { ShippingInfoForm } from '@/components/form/shipping-info'

export const AddShippingInfo = ({
  quantity,
  quantityAvailable,
  setQuantity,
  shippingInfo,
  imgData,
  netPrice,
  setIsAddingShipping,
  setIsAddingCard,
}: {
  quantity: number
  quantityAvailable: number
  setQuantity: Dispatch<SetStateAction<number>>
  shippingInfo: ShippingInfo | null
  imgData: ImgData
  netPrice: string | number
  setIsAddingShipping: Dispatch<SetStateAction<boolean>>
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader className="mb-8 flex flex-row">
      <a onClick={() => setIsAddingShipping(false)} className="mr-4">
        <ArrowLeft />
      </a>
      <DialogTitle>Add Shipping Information</DialogTitle>
    </DialogHeader>
    <ShippingInfoForm />
    <DialogFooter className="flex flex-col md:flex-row text-lg justify-between sm:justify-between md:justify-between items-center md:w-full">
      <Button onClick={() => setIsAddingCard(true)}>
        Continue With Purchase
      </Button>
    </DialogFooter>
  </>
)
