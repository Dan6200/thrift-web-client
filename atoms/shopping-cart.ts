import { Product } from '@/components/products/types'
import { ShoppingCart } from '@/components/shopping-cart/types'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const shoppingCartAtom = atomWithStorage<ShoppingCart | null>(
  'shopping-cart',
  null
)

export const addItemAtom = atom(null, (get, set, product: Product) => {
  const shoppingCart = get(shoppingCartAtom)
  const newShoppingCart = new ShoppingCart(null, shoppingCart)
  newShoppingCart.addItem(product)
  set(shoppingCartAtom, newShoppingCart)
})

export const getTotalAtom = atom((get) => {
  const shoppingCart = get(shoppingCartAtom)
  return shoppingCart?.cartItems.length
})
