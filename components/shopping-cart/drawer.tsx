// cspell:ignore Swipeable
import { SwipeableDrawer } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  decreaseItemCountAtom,
  getItemsAtom,
  getTotalAtom,
  increaseItemCountAtom,
  removeItemAtom,
  shippingInfoAtom,
} from '@/atoms'
import { ShoppingCart } from '.'
import { Dispatch, SetStateAction } from 'react'

export function ShoppingCartDrawer({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean
  toggleDrawer: Dispatch<SetStateAction<boolean>>
}) {
  const items = useAtomValue(getItemsAtom)
  const increaseItemCount = useSetAtom(increaseItemCountAtom)
  const decreaseItemCount = useSetAtom(decreaseItemCountAtom)
  const total = useAtomValue(getTotalAtom)
  const shippingInfo = useAtomValue(shippingInfoAtom)
  const removeItem = useSetAtom(removeItemAtom)
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div className="overflow-scroll border h-full w-[50vw] bg-background text-foreground">
        <ShoppingCart
          toggleDrawer={toggleDrawer}
          items={items}
          increaseItemCount={increaseItemCount}
          decreaseItemCount={decreaseItemCount}
          total={total}
          shippingInfo={shippingInfo}
          removeItem={removeItem}
        />
      </div>
    </SwipeableDrawer>
  )
}
