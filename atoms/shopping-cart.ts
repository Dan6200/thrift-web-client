import { Product } from '@/components/products/types'
import { ShoppingCart } from '@/components/shopping-cart/types'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const shoppingCartAtom = atomWithStorage<ShoppingCart | null>(
  'shopping-cart',
  null
)

export const addItemAtom = atom(null, (get, set, newProduct: Product) => {
  const shoppingCart = get(shoppingCartAtom)
  const newShoppingCart = new ShoppingCart(null, shoppingCart)
  newShoppingCart.addItem(newProduct) && set(shoppingCartAtom, newShoppingCart)
})

export const removeItemAtom = atom(null, (get, set, newProduct: Product) => {
  const shoppingCart = get(shoppingCartAtom)
  if (
    shoppingCart?.cartItems.find(
      ({ product }) => product.product_id === newProduct.product_id
    )
  ) {
    const newShoppingCart = new ShoppingCart(null, shoppingCart)
    newShoppingCart.removeItem(newProduct)
    set(shoppingCartAtom, newShoppingCart)
  }
})

export const getTotalAtom = atom((get) => {
  const shoppingCart = get(shoppingCartAtom)
  return shoppingCart?.cartItems.length
})

export const getItemsAtom = atom((get) => {
  const shoppingCart = get(shoppingCartAtom)
  if (shoppingCart) return [...shoppingCart?.cartItems]
  return []
})

export const increaseItemCountAtom = atom(null, (get, set, index: number) => {
  const shoppingCart = get(shoppingCartAtom)
  const newShoppingCart = new ShoppingCart(null, shoppingCart)
  newShoppingCart.increaseCount(index) && set(shoppingCartAtom, newShoppingCart)
})

export const decreaseItemCountAtom = atom(null, (get, set, index: number) => {
  const shoppingCart = get(shoppingCartAtom)
  const newShoppingCart = new ShoppingCart(null, shoppingCart)
  newShoppingCart.decreaseCount(index) && set(shoppingCartAtom, newShoppingCart)
})
