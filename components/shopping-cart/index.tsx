'use client'
// cspell:ignore Swipeable
import { ProductImage } from '../products/image'
import { Card, CardContent } from '../ui/card'
import { Item } from './types'
import { Button } from '../ui/button'
import { Minus, PanelRightClose, Plus, Trash2 } from 'lucide-react'
import ShippingInfo from '../shipping-info/types'
import { useSetAtom } from 'jotai'
import { Product } from '../products/types'
import { Dispatch, SetStateAction } from 'react'

type RemoveItem = ReturnType<
  typeof useSetAtom<null, [newProduct: Product], void>
>

type IncreaseItemCount = ReturnType<
  typeof useSetAtom<null, [index: number], void>
>

type DecreaseItemCount = ReturnType<
  typeof useSetAtom<null, [index: number], void>
>

export function ShoppingCart({
  removeItem,
  toggleDrawer,
  items,
  increaseItemCount,
  decreaseItemCount,
  total,
}: {
  shippingInfo: ShippingInfo | null
  items: Item[]
  increaseItemCount: IncreaseItemCount
  decreaseItemCount: DecreaseItemCount
  total?: number
  toggleDrawer?: Dispatch<SetStateAction<boolean>>
  removeItem?: RemoveItem
}) {
  return (
    <div className="flex flex-col justify-between container p-4 bg-background text-foreground ">
      {toggleDrawer && (
        <Button
          onClick={() => toggleDrawer(false)}
          variant="outline"
          size="icon"
          className="border-none relative"
        >
          <PanelRightClose />
        </Button>
      )}
      <h2 className="text-center p8 font-semibold text-2xl w-full my-8">
        Items in Cart
      </h2>
      <div className="space-y-4">
        {items.length ? (
          items.map(({ product, count }: Item, index: number) => {
            return (
              <Card
                key={product.product_id}
                className="flex items-center w-full"
              >
                <CardContent className="rounded-md w-full border-b p-4 flex flex-col  sm:flex-row items-center justify-between h-44 sm:h-24">
                  <ProductImage
                    className="py-1 object-contain w-32 mx-auto rounded-sm bg-white max-h-24 sm:max-h-20 object-center border dark:border-none"
                    imgData={product?.media?.find(
                      (img) => img?.is_thumbnail_image
                    )}
                  />
                  <div className="w-full flex sm:px-8 justify-between">
                    <div className="flex justify-between sm:justify-normal items-center">
                      <div className="flex h-fit mr-2 items-center border w-28 justify-between p-0 rounded-md">
                        <Button
                          onClick={() => {
                            count > 1 ? decreaseItemCount(index) : null
                          }}
                          variant={'outline'}
                          className="p-2 border-r border-y-0 border-l-0 h-7 rounded-none m-0"
                        >
                          <Minus className="w-4" />
                        </Button>
                        <p className="mx-auto p-1">{count}</p>
                        <Button
                          onClick={() => {
                            count <= product.quantity_available
                              ? increaseItemCount(index)
                              : null
                          }}
                          variant={'outline'}
                          className="p-2 border-l border-y-0 border-r-0 h-7 rounded-none m-0"
                        >
                          <Plus className="w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          removeItem ? removeItem(product) : null
                        }
                      >
                        <Trash2 className="text-destructive" />
                      </Button>
                    </div>
                    <p className="p-1">
                      {(typeof product.net_price === 'string'
                        ? parseFloat(product.net_price) * count
                        : product.net_price * count
                      ).toLocaleString('en-NG', {
                        currency: 'NGN',
                        style: 'currency',
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="w-full text-center">
            <h2 className="p8 text-semibold text-lg w-full my-8 ">
              No Items in the Cart yet
            </h2>
            <p>Click on the &apos;Add to cart button&apos; on the page</p>
          </div>
        )}
      </div>
      {!!items.length && (
        <>
          <div className="my-8 flex w-full items-center justify-between text-center text-lg">
            <h2 className="">Total Items: </h2>
            <p className="text-xl font-bold text-green-700 dark:text-green-400">
              {total?.toLocaleString('en-NG', {
                currency: 'NGN',
                style: 'currency',
              })}
            </p>
          </div>
          <Button className="my-16 flex mx-auto font-semibold bg-green-600 w-full md:w-64 h-10 text-lg text-tertiary hover:bg-green-500">
            Checkout
          </Button>
        </>
      )}
    </div>
  )
}
