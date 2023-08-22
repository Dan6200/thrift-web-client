'use client'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { ArrowLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { ShippingInfoForm } from '@/components/form/shipping-info'
import ShippingInfo from '@/components/shipping-info/types'

export const AddCardInfo = ({
  shippingInfo,
  setIsAddingCard,
}: {
  shippingInfo: ShippingInfo | null
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader className="mb-8 flex flex-row items-center space-y-0">
      <a
        onClick={() => {
          setIsAddingCard(false)
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
        <Button onClick={() => setIsAddingCard(true)}>Add Card Info</Button>
      )}
    </DialogFooter>
  </>
)
