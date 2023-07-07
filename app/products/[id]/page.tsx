// cspell:disable
// Purpose: Page for displaying all products

import { Button } from '@/components/form/button'
import { ProductImage } from '@/components/products/image'
import getProductById from '../get-product-by-id'

export default async function Product({
  params: { id },
}: {
  params: { id: number }
}) {
  try {
    const product = await getProductById(id)
    return (
      <div className="container mx-auto my-20 w-80">
        <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
          {product?.title}
        </h2>
        <div
          className="w-full p-2 mx-auto my-4 border-[.5pt] dark:border-gray-500 rounded-md"
          key={product?.product_id}
        >
          <ProductImage
            imgData={product?.media?.[0]}
            className="object-cover w-full mb-8"
          />
          <div className="flex justify-between">
            <p>Price</p>
            <p className="">N {product?.net_price}</p>
            <p className="dark:text-gray-700">List Price</p>
            <p className="text-sm dark:text-gray-700">
              N {product?.list_price}
            </p>
          </div>
        </div>
        <Button>Add To Cart</Button>
      </div>
    )
  } catch (err) {
    throw err
  }
}
