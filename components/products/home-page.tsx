//cspell: ignore semibold jotai
'use client'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ProductImage } from './image'
import { Product } from './types'
import { ProductsSubComponent } from './sub-component'

/** Display products in a grid
 * for home page only
 * @returns A grid of products
 * @description This component displays pre-fetched products in a grid. It also
 * fetches more products from the API when the last page is reached
 * */

export const ProductsHome = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 50
  const productsToDisplay = products.slice(0, itemsPerPage)
  const CUT_OFF = 30

  return (
    <ProductsSubComponent
      cutOff={CUT_OFF}
      productsToDisplay={productsToDisplay}
    />
  )
}
