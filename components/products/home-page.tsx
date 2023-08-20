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
  const itemsPerPage = 30
  const productsToDisplay = products.slice(0, itemsPerPage)

  return (
    <div className="mx-auto px-4">
      <h4 className="w-full mx-auto my-4 text-xl font-bold text-center">
        New Arrivals
      </h4>
      <ProductsSubComponent productsToDisplay={productsToDisplay} />
    </div>
  )
}
