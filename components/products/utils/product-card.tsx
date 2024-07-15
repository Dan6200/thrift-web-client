import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ShoppingCartIcon, Plus } from 'lucide-react'
import { ShoppingCart } from '../../shopping-cart/types'
import { Button } from '@/components/ui/button'
import { ProductImage } from '../image'
import { Product } from '../types'
import { BuyNow } from './buy-now'
import { Price } from './price'
import { Dispatch, SetStateAction } from 'react'
import { useSetAtom } from 'jotai'

type AddItem = ReturnType<typeof useSetAtom<null, [newProduct: Product], void>>
type SetShoppingCart = ReturnType<typeof useSetAtom<null, [ShoppingCart], void>>

export default function ProductCard({
  shoppingCart,
  product,
  MAX_TITLE_LEN,
  isSmallScreen,
  setShowToast,
  addItem,
  setShoppingCart,
}: {
  setShowToast: Dispatch<SetStateAction<boolean>>
  addItem: AddItem
  setShoppingCart: SetShoppingCart
  shoppingCart: ShoppingCart | null
  product: Product
  MAX_TITLE_LEN: number
  isSmallScreen: boolean
}) {
  return (
    <Card className="flex flex-col w-full sm:w-[30vw] lg:w-[22vw] h-[28rem] overflow-hidden rounded-sm">
      <Link
        href={`/products/${product?.product_id}`}
        passHref
        className="hover:bg-primary/20"
      >
        <CardContent className="bg-white border-b p-2 w-full flex items-center">
          <ProductImage
            className="object-contain w-full h-44"
            imgData={product?.media?.find((img) => img?.is_display_image)}
          />
        </CardContent>
      </Link>
      <CardFooter className="p-2 sm:p-4 flex flex-col flex-1 justify-between">
        <Link
          href={`/products/${product?.product_id}`}
          passHref
          className="active:text-accent h-[50%] lg:h-[65%] flex flex-col justify-between"
        >
          <h4 className="hover:text-primary dark:hover:text-secondary my-2 w-full whitespace-normal break-words">
            {/* remove &nbsp; that breaks ui */}
            {product?.title.slice(0, MAX_TITLE_LEN).replace(/\u00A0/g, ' ') +
              '...'}
          </h4>
          <div className="w-full flex flex-wrap justify-between">
            <Price
              netPrice={product?.net_price}
              listPrice={product?.list_price}
            />
          </div>
        </Link>
        <div className="flex flex-col lg:flex-row gap-2 w-full justify-between">
          <Button
            className="hover:bg-primary shadow-around p-1 h-9 w-full"
            variant="outline"
            onClick={() => {
              shoppingCart
                ? addItem(product)
                : setShoppingCart(new ShoppingCart(product, null))
              setShowToast(true)
            }}
          >
            {/*isSmallScreen ? (
              <>
                <ShoppingCartIcon />
                <Plus className="w-4" />
              </>
            ) : (
              'Add To Cart'
						)*/}
            Add To Cart
          </Button>
          <BuyNow
            imgData={product?.media?.find((img) => img?.is_display_image)}
            netPrice={product?.net_price}
            listPrice={product?.list_price}
            quantityAvailable={product?.quantity_available}
          />
        </div>
      </CardFooter>
    </Card>
  )
}
