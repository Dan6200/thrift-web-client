'use client'
import {
  getItemsAtom,
  increaseItemCountAtom,
  decreaseItemCountAtom,
  getTotalAtom,
  shippingInfoAtom,
  removeItemAtom,
} from '@/atoms'
import { Nav } from '@/components/nav'
import { ShoppingCart } from '@/components/shopping-cart'
import { useAtomValue, useSetAtom } from 'jotai'

export default function ShoppingCartPage() {
  const items = useAtomValue(getItemsAtom)
  const increaseItemCount = useSetAtom(increaseItemCountAtom)
  const decreaseItemCount = useSetAtom(decreaseItemCountAtom)
  const total = useAtomValue(getTotalAtom)
  const shippingInfo = useAtomValue(shippingInfoAtom)
  const removeItem = useSetAtom(removeItemAtom)

  return (
    <>
      <Nav />
      <ShoppingCart
        items={items}
        increaseItemCount={increaseItemCount}
        decreaseItemCount={decreaseItemCount}
        removeItem={removeItem}
        total={total}
        shippingInfo={shippingInfo}
      />
    </>
  )
}
