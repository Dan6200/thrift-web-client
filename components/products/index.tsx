'use client'
import { Product } from './types'
import { atom, useAtom } from 'jotai'
import { ProductsSubComponent } from './sub-component'

// One based to work well with mui component
export const pageNumAtom = atom(1)

export const Products = ({ products }: { products: Product[] }) => {
  const itemsPerPage = 50
  let MAX_TITLE_LEN = 40
  if (typeof window !== 'undefined') {
    if (window.innerWidth > 400) MAX_TITLE_LEN = 80
  }
  const totalProducts = products.length
  const [pageNum] = useAtom(pageNumAtom)
  const productsToDisplay = products.slice(
    pageNum * itemsPerPage - itemsPerPage,
    pageNum * itemsPerPage
  )
  return (
    <div className="container p-4">
      <ProductsSubComponent
        itemsPerPage={itemsPerPage}
        totalProducts={totalProducts}
        MAX_TITLE_LEN={MAX_TITLE_LEN}
        productsToDisplay={productsToDisplay}
      />
    </div>
  )
}
