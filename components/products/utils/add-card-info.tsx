'use client'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { ArrowLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import ShippingInfo from '@/components/shipping-info/types'
import { CardInfoForm } from '@/components/form/card-info'

export const AddCardInfo = ({
  shippingInfo,
  setIsAddingCard,
  setIsAddingShipping,
  setIsSelectingQuantity,
}: {
  shippingInfo: ShippingInfo | null
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
  setIsAddingShipping: Dispatch<SetStateAction<boolean>>
  setIsSelectingQuantity: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader className="mb-8 flex flex-row items-center space-y-0">
      <a
        onClick={() => {
          setIsAddingCard(false)
          shippingInfo
            ? setIsSelectingQuantity(true)
            : setIsAddingShipping(true)
        }}
        className="cursor-pointer mr-4"
      >
        <ArrowLeft />
      </a>
      <DialogTitle>Add Card Information</DialogTitle>
    </DialogHeader>
    <CardInfoForm />
    <DialogFooter className="flex flex-col md:flex-row text-lg justify-between items-center md:w-full">
      <Button className="font-semibold bg-green-600 w-full md:w-72 h-10 text-lg text-tertiary hover:bg-green-500">
        Confirm purchase
      </Button>
    </DialogFooter>
  </>
)
