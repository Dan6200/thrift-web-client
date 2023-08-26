// cspell:ignore Swipeable
import { SwipeableDrawer } from '@mui/material'
import { ProductImage } from '../products/image'
import { Card, CardContent } from '../ui/card'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  decreaseItemCountAtom,
  getItemsAtom,
  getTotalAtom,
  increaseItemCountAtom,
  shippingInfoAtom,
} from '@/atoms'
import { Item } from './types'
import { Button } from '../ui/button'
import { Minus, PanelRightClose, Plus } from 'lucide-react'
import { ShoppingCart } from '.'

export function ShoppingCartDrawer({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean
  toggleDrawer: any
}) {
  const items = useAtomValue(getItemsAtom)
  const increaseItemCount = useSetAtom(increaseItemCountAtom)
  const decreaseItemCount = useSetAtom(decreaseItemCountAtom)
  const total = useAtomValue(getTotalAtom)
  const shippingInfo = useAtomValue(shippingInfoAtom)
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div className="overflow-scroll border h-full w-[50vw]">
        <ShoppingCart
          toggleDrawer={toggleDrawer}
          items={items}
          increaseItemCount={increaseItemCount}
          decreaseItemCount={decreaseItemCount}
          total={total}
          shippingInfo={shippingInfo}
        />
      </div>
    </SwipeableDrawer>
  )
}
