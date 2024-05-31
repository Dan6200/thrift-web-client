import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Product } from '@/components/products/types'
import { UserAccount } from '@/components/user-account/types'
import ShippingInfo from '@/components/shipping-info/types'
import { CardInfo } from '@/components/card-info/types'
export * from './shopping-cart'

export const pageAtom = atom(0)
export const productsAtom = atom<Product[]>([])
export const isSmallScreenAtom = atom(false)
export const pageNumAtom = atom(1)
export const cardInfo = atom<CardInfo | null>(null)
export const userAtom = atomWithStorage<UserAccount | null>(
  'user_account_details',
  null
)
export const shippingInfoAtom = atomWithStorage<ShippingInfo | null>(
  'shipping-info',
  null
)
