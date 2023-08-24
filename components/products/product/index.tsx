import { MoveLeft } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { GoBackLink } from '../go-back-link'
import { ProductImage } from '../image'
import { Product } from '../types'
import { Price } from './utils/price'

export function Product({ product }: { product: Product }) {
  const displayImg = product?.media?.find((img) => img?.is_display_image)
  return (
    <div className="container mx-auto p-5 my-20">
      <GoBackLink className="cursor-pointer text-sm text-blue-700 dark:text-blue-200 mb-8 block">
        <MoveLeft className="inline mr-4" />
        Go back
      </GoBackLink>
      <h2 className="sm:text-2xl font-bold text-justify mb-16 break-words">
        {/* remove &nbsp;, that breaks the ui */}
        {product?.title.replace(/\u00A0/, ' ')}
      </h2>
      <Card className="flex flex-col sm:flex-row items-center rounded-sm py-4 w-full">
        <CardContent
          className="flex flex-col w-full sm:w-[50%] sm:h-full items-center justify-between"
          key={product?.product_id}
        >
          <ProductImage
            imgData={displayImg}
            className="object-cover py-4 border-b w-full sm:w-96 rounded-sm"
          />
          <div className="flex flex-col my-4 p-2 sm:p-4 w-full sm:w-96 justify-between sm:h-48">
            <Price
              netPrice={product?.net_price}
              listPrice={product?.list_price}
            />
            <div className="flex mb-4">
              <p>
                items left:{'\u00A0'.repeat(4)}
                {product.quantity_available}
              </p>
            </div>
            <div className="flex w-full mb-4 justify-between">
              <Button>Add To Cart</Button>
              <Button>Save For Later</Button>
            </div>
          </div>
        </CardContent>
        <div className="border-b-2 sm:border-l-2 sm:border-b-0 block w-[80%] sm:w-[.5pt] sm:h-80"></div>
        <CardContent className="w-full sm:w-[50%]">
          <h3 className="w-full mx-auto my-8 text-xl sm:text-lg font-bold text-center">
            About This Product
          </h3>
          {product?.description && (
            <div className="pt-6">
              {product?.description?.map((desc, index) => (
                <p className="mb-4 text-sm break-words" key={index}>
                  {/* remove &nbsp; that breaks ui */}
                  {desc.replace(/\u00A0/, ' ')}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
