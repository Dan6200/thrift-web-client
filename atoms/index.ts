import { atom } from 'jotai'
import { Product } from '@/components/products/types'

export const pageAtom = atom(0)
export const productsAtom = atom<Product[]>([])
export const isSmallScreenAtom = atom(true)
export const pageNumAtom = atom(1)
export const userTokenAtom = atom('')
