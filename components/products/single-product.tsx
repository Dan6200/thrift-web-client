import { Button } from '../form/button'
import { ProductImage } from './image'
import { Product } from './types'

export function Product({ product }: { product: Product }) {
  const displayImg = product?.media?.find((img) => img?.is_display_image)
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
          imgData={displayImg}
          className="object-cover w-full mb-8"
        />
        <div className="flex justify-between">
          <p>Price</p>
          <p className="">N {product?.net_price}</p>
          <p className="dark:text-gray-700">List Price</p>
          <p className="text-sm dark:text-gray-700">N {product?.list_price}</p>
        </div>
      </div>
      <Button>Add To Cart</Button>
    </div>
  )
}
