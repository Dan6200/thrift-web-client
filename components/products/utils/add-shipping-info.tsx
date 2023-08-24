'use client'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { ArrowLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { ShippingInfoForm } from '@/components/form/shipping-info'
import ShippingInfo from '@/components/shipping-info/types'

export const AddShippingInfo = ({
  shippingInfo,
  setIsAddingShipping,
  setIsAddingCard,
  setIsSelectingQuantity,
}: {
  shippingInfo: ShippingInfo | null
  setIsAddingShipping: Dispatch<SetStateAction<boolean>>
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
  setIsSelectingQuantity: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader className="mb-8 flex flex-row items-center space-y-0">
      <a
        onClick={() => {
          setIsAddingShipping(false)
          setIsSelectingQuantity(true)
        }}
        className="cursor-pointer mr-4"
      >
        <ArrowLeft />
      </a>
      <DialogTitle>Add Shipping Information</DialogTitle>
    </DialogHeader>
    <ShippingInfoForm />
    <DialogFooter className="flex flex-col md:flex-row text-lg justify-between items-center md:w-full">
      {shippingInfo && (
        <Button
          onClick={() => {
            setIsAddingCard(true)
            setIsAddingShipping(false)
          }}
        >
          Add Card Info
        </Button>
      )}
    </DialogFooter>
  </>
)
