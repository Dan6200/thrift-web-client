// cspell:ignore Swipeable
import { SwipeableDrawer } from '@mui/material'
import { ProductImage } from '../products/image'
import { Card, CardContent } from '../ui/card'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  decreaseItemCountAtom,
  getItemsAtom,
  getTotalAtom,
  increaseItemCountAtom,
} from '@/atoms'
import { Item } from './types'
import { Button } from '../ui/button'
import { Minus, PanelRightClose, Plus } from 'lucide-react'

export function ShoppingCartDrawer({
  isOpen,
  toggleDrawer,
}: {
  isOpen: boolean
  toggleDrawer: any
}) {
  const items = useAtomValue(getItemsAtom)
  const increaseItemCount = useSetAtom(increaseItemCountAtom)
  const decreaseItemCount = useSetAtom(decreaseItemCountAtom)
  const total = useAtomValue(getTotalAtom)
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div className="container border space-y-4 overflow-scroll p-4 bg-background text-foreground h-full w-[50vw]">
        <Button
          onClick={() => toggleDrawer(false)}
          variant="outline"
          size="icon"
          className="border-none relative"
        >
          <PanelRightClose />
        </Button>
        <h2 className="text-center p8 text-semibold text-2xl w-full my-8 ">
          Items in Cart...
        </h2>
        {items.length ? (
          items.map(({ product, count }: Item, index: number) => {
            return (
              <Card
                key={product.product_id}
                className="flex items-center w-full"
              >
                <CardContent className="rounded-md w-full border-b p-2 flex items-center h-24">
                  <ProductImage
                    className="py-1 object-contain w-32 mx-auto rounded-sm bg-white max-h-20 object-center"
                    imgData={product?.media?.find(
                      (img) => img?.is_display_image
                    )}
                  />
                  <div className="w-full flex px-8 justify-between">
                    <div className="flex h-fit items-center border w-28 justify-between p-0 rounded-md">
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
        <div className="flex w-full items-center justify-between text-center text-lg">
          <h2 className="">Total Items: </h2>
          <p className="text-xl font-bold text-green-400 dark:text-green-400">
            {total?.toLocaleString('en-NG', {
              currency: 'NGN',
              style: 'currency',
            })}
          </p>
        </div>
        <Button className="mx-auto my-4">Add Shipping Info</Button>
      </div>
    </SwipeableDrawer>
  )
}
