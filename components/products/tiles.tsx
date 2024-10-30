'use client'
import Paginate from '../pagination'
import { Product } from './types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  addItemAtom,
  getTotalCountAtom,
  isSmallScreenAtom,
  shoppingCartAtom,
} from '@/atoms'
import { useToast } from '../ui/use-toast'
import { useEffect, useState } from 'react'
import ProductCard from './utils/product-card'

export const ProductsTiles = ({
  totalProducts,
  itemsPerPage,
  productsToDisplay,
}: {
  totalProducts?: number
  itemsPerPage?: number
  productsToDisplay: Product[]
}) => {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const MAX_TITLE_LEN = isSmallScreen ? 50 : 90
  const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom)
  const addItem = useSetAtom(addItemAtom)
  const totalItems = useAtomValue(getTotalCountAtom)
  const { toast } = useToast()
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    if (showToast)
      toast({
        title: `${totalItems} Items Added To Cart.`,
      })
  }, [toast, showToast, totalItems])
  return (
    <div className="mx-auto">
      {totalProducts && itemsPerPage && totalProducts > itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
      <div className="w-full sm:px-2 sm:py-2 md:px-4 md:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {productsToDisplay.map((product) => (
          <ProductCard
            key={product?.product_id}
            {...{
              setShoppingCart,
              addItem,
              setShowToast,
              shoppingCart,
              product,
              MAX_TITLE_LEN,
              isSmallScreen,
            }}
          />
        ))}
      </div>
      {totalProducts && itemsPerPage && totalProducts > itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
    </div>
  )
}
