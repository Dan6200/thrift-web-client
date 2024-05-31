//cspell: ignore semibold jotai
'use client'
import { ProductsTiles } from './tiles'
import { Product } from './types'

/** Display products in a grid
 * for home page only
 * @returns A grid of products
 * @description This component displays pre-fetched products in a grid. It also
 * fetches more products from the API when the last page is reached
 * */

export const ProductsHome = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 10
  const productsToDisplay = products.slice(0, itemsPerPage)

  return (
    <div className="mx-auto">
      <h4 className="w-full mx-auto my-4 text-xl font-bold text-center">
        New Arrivals
      </h4>
      <ProductsTiles productsToDisplay={productsToDisplay} />
    </div>
  )
}
