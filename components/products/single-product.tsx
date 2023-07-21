import { Button } from '../form/button'
import { ProductImage } from './image'
import { Product } from './types'

export function Product({ product }: { product: Product }) {
  const displayImg = product?.media?.find((img) => img?.is_display_image)
  return (
    <div className="container mx-auto p-5 my-20">
      <h2 className="w-full mx-auto m-16 text-2xl font-bold text-justify">
        {product?.title}
      </h2>
      <div
        className="w-full p-2 mx-auto my-4 border-4 border-gray-300 dark:border-gray-800 rounded-md"
        key={product?.product_id}
      >
        <ProductImage
          imgData={displayImg}
          className="object-cover w-full mb-8 rounded-md"
        />
        <div className="flex justify-between">
          <p className="">
            {product?.net_price.toLocaleString('en-NG', {
              currency: 'NGN',
              style: 'currency',
            })}
          </p>
          {product?.net_price.toFixed(2) !== product?.list_price.toFixed(2) && (
            <p className="text-sm line-through dark:text-gray-700">
              {product?.list_price.toLocaleString('en-NG', {
                currency: 'NGN',
                style: 'currency',
              })}
            </p>
          )}
        </div>
      </div>
      <Button>Add To Cart</Button>
      <h3 className="w-full mx-auto my-16 text-xl font-bold text-center">
        About This Product
      </h3>
      {product?.description && (
        <div className="w-full p-2 mx-auto my-4 border-[.5pt] dark:border-gray-500 rounded-md">
          {product?.description?.map((desc, index) => (
            <p className="mb-4 text-sm" key={index}>
              {desc}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
