'use client'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog'
import { ArrowLeft } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { ShippingInfoForm } from '@/components/form/shipping-info'

export const AddShippingInfo = ({
  setIsAddingShipping,
  setIsAddingCard,
}: {
  setIsAddingShipping: Dispatch<SetStateAction<boolean>>
  setIsAddingCard: Dispatch<SetStateAction<boolean>>
}) => (
  <>
    <DialogHeader className="mb-8 flex flex-row items-center space-y-0">
      <a
        onClick={() => setIsAddingShipping(false)}
        className="cursor-pointer mr-4"
      >
        <ArrowLeft />
      </a>
      <DialogTitle>Add Shipping Information</DialogTitle>
    </DialogHeader>
    <ShippingInfoForm />
    <DialogFooter className="flex flex-col md:flex-row text-lg justify-between items-center md:w-full">
      <Button onClick={() => setIsAddingCard(true)}>Add Card Info</Button>
    </DialogFooter>
  </>
)
