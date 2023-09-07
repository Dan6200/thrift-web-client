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
    <DialogHeader className="mb-2 sm:mb-8 flex h-16 sm:h-8 sm:flex-row flex-col justify-between items-start space-y-0">
      <a
        onClick={() => {
          setIsAddingShipping(false)
          setIsSelectingQuantity(true)
        }}
        className="cursor-pointer mr-2 sm:mr-4"
      >
        <ArrowLeft />
      </a>
      <DialogTitle className="w-full text-center">
        Add Shipping Information
      </DialogTitle>
    </DialogHeader>
    <ShippingInfoForm />
    <DialogFooter className="flex flex-col md:flex-row text-lg justify-between md:justify-end items-center md:w-full">
      {shippingInfo && (
        <Button
          onClick={() => {
            setIsAddingCard(true)
            setIsAddingShipping(false)
          }}
          className="flex font-semibold bg-green-600 w-full md:w-64 h-10 text-lg text-tertiary hover:bg-green-500"
        >
          Continue With Checkout
        </Button>
      )}
    </DialogFooter>
  </>
)
