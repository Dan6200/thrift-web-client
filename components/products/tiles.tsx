'use client'
import Link from 'next/link'
import { ProductImage } from './image'
import Paginate from '../pagination'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from './types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  addItemAtom,
  getTotalCountAtom,
  isSmallScreenAtom,
  shoppingCartAtom,
} from '@/atoms'
import { Price } from './utils/price'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BuyNow } from './utils/buy-now'
import { useToast } from '../ui/use-toast'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { ShoppingCart } from '../shopping-cart/types'
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
  }, [showToast, totalItems])
  return (
    <div className="mx-auto">
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
      <div className="w-full sm:px-2 sm:py-2 md:px-4 md:py-4 mx-auto place-items-center grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {productsToDisplay.map((product) => (
          <ProductCard
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
      {totalProducts && itemsPerPage && (
        <Paginate count={Math.ceil(totalProducts / itemsPerPage)} />
      )}
    </div>
  )
}
