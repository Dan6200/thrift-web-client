'use client'
import { Product } from './types'
import { useAtomValue } from 'jotai'
import { ProductsSubComponent } from './sub-component'
import { pageNumAtom } from '@/atoms'

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
      <ProductsSubComponent
        itemsPerPage={itemsPerPage}
        totalProducts={totalProducts}
        productsToDisplay={productsToDisplay}
      />
    </div>
  )
}
