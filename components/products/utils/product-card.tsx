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
    <Card
      key={product?.product_id}
      className="w-full sm:w-[30vw] md:w-[25vw] lg:w-[22vw] h-[26rem] overflow-hidden rounded-sm"
    >
      <Link
        href={`/products/${product?.product_id}`}
        passHref
        className="hover:bg-primary/20"
      >
        <CardContent className="bg-white border-b p-0 w-full flex items-center h-48">
          <ProductImage
            className="object-contain w-full max-h-40"
            imgData={product?.media?.find((img) => img?.is_display_image)}
          />
        </CardContent>
      </Link>
      <CardFooter className="p-2 sm:p-4 flex flex-col items-center justify-between h-56">
        <Link
          href={`/products/${product?.product_id}`}
          passHref
          className="active:bg-blue-100 flex flex-col justify-between h-40"
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
        <div className="flex w-full mt-4 justify-between">
          <Button
            className="shadow-around p-1 h-9 w-16 sm:w-[9vw]"
            variant="outline"
            onClick={() => {
              shoppingCart
                ? addItem(product)
                : setShoppingCart(new ShoppingCart(product, null))
              setShowToast(true)
            }}
          >
            {isSmallScreen ? (
              <>
                <ShoppingCartIcon />
                <Plus className="w-4" />
              </>
            ) : (
              'Add To Cart'
            )}
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
