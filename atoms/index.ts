import { atom } from 'jotai'
import { Product } from '@/components/products/types'

export const pageAtom = atom(0)
export const productsAtom = atom<Product[]>([])
