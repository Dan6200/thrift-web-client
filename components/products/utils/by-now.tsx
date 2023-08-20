'use client'
import { ProductImage } from '../image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { UserAccount } from '../../user-account/types'
import { Price } from './price'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { CardContent } from '@/components/ui/card'

export const BuyNow = ({
  user,
  imgData,
  netPrice,
  listPrice,
}: {
  user: UserAccount
  imgData:
    | {
        filename: string
        filepath: string
        description: string
        is_display_image: boolean
      }
    | undefined
  netPrice: string | number
  listPrice: string | number
}) => {
  const [quantity, setQuantity] = useState(1)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-neutral-700 p-1 h-9 w-20 sm:w-[9vw]"
          variant="outline"
        >
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] p-16 h-[80vh] sm:w-[80vw] md:w-[70vw] max-w-none">
        <DialogHeader>
          <DialogTitle>Purchase Item</DialogTitle>
        </DialogHeader>
        <div className="flex items-end">
          <CardContent className="bg-white border-b p-0 w-44 flex items-center h-44">
            <ProductImage
              className="object-contain w-[20vw] max-h-40"
              imgData={imgData}
            />
          </CardContent>
          <div className="flex items-center">
            <p className="ml-8">Quantity:</p>
            <div className="flex h-fit items-center border w-32 justify-between ml-8 rounded-sm">
              <Button
                onClick={() => {
                  quantity ? setQuantity(quantity - 1) : null
                }}
                variant={'outline'}
                className="p-2"
              >
                <Minus className="w-4" />
              </Button>
              <p className="mx-auto p-2">{quantity}</p>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                variant={'outline'}
                className="p-2"
              >
                <Plus className="w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          {user ? (
            <Button>Continue With Purchase</Button>
          ) : (
            <Button>Add Shipping Info</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
