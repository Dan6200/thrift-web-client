'use client'
import { Product } from './types'
import { useAtomValue } from 'jotai'
import { pageNumAtom } from '@/atoms'
import { ProductsTiles } from './tiles'

// One based to work well with mui component

export const Products = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 50
  const totalProducts = products.length
  const pageNum = useAtomValue(pageNumAtom)
  const productsToDisplay = products.slice(
    pageNum * itemsPerPage - itemsPerPage,
    pageNum * itemsPerPage
  )

  return (
    <div className="container p-4">
      <ProductsTiles
        itemsPerPage={itemsPerPage}
        totalProducts={totalProducts}
        productsToDisplay={productsToDisplay}
      />
    </div>
  )
}
