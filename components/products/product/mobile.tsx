import { MoveLeft } from 'lucide-react'
import { AspectRatio } from '../../ui/aspect-ratio'
import { Button } from '../../ui/button'
import { Card, CardContent, CardFooter } from '../../ui/card'
import { GoBackLink } from '../go-back-link'
import { ProductImage } from '../image'
import { Product } from '../types'

export function Product({ product }: { product: Product }) {
  const displayImg = product?.media?.find((img) => img?.is_display_image)
  return (
    <div className="container mx-auto p-5 my-20">
      <GoBackLink className="text-sm text-blue-700 dark:text-blue-200 mb-8 block">
        <MoveLeft className="inline mr-4" />
        Go back
      </GoBackLink>
      <h2 className="text-lg font-bold text-justify mb-16">
        {/* remove &nbsp;, that breaks the ui */}
        {product?.title.replace(/\u00A0/, ' ')}
      </h2>
      <Card className="rounded-sm w-full">
        <CardContent
          className="sm:flex items-center p-6"
          key={product?.product_id}
        >
          <AspectRatio className="sm:h-64" ratio={16 / 9}>
            <ProductImage
              imgData={displayImg}
              className="object-cover w-full sm:w-80 rounded-md"
            />
          </AspectRatio>
          {isMobile ? (
            <span></span>
          ) : (
            <div>
              <h3 className="w-full mx-auto my-16 text-xl sm:text-lg font-bold text-center">
                About This Product
              </h3>
              {product?.description && (
                <CardContent className="pt-6">
                  {product?.description?.map((desc, index) => (
                    <p className="mb-4 text-sm break-words" key={index}>
                      {/* remove &nbsp; that breaks ui */}
                      {desc.replace(/\u00A0/, ' ')}
                    </p>
                  ))}
                </CardContent>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col w-full justify-between h-32">
          <div className="w-full flex justify-between">
            <p>
              {product?.net_price.toLocaleString('en-NG', {
                currency: 'NGN',
                style: 'currency',
              })}
            </p>
            {product?.net_price.toFixed(2) !==
              product?.list_price.toFixed(2) && (
              <p className="text-sm line-through dark:text-gray-700">
                {product?.list_price.toLocaleString('en-NG', {
                  currency: 'NGN',
                  style: 'currency',
                })}
              </p>
            )}
          </div>
          <div className="flex w-full justify-between">
            <Button>Add To Cart</Button>
            <Button>Save For Later</Button>
          </div>
        </CardFooter>
      </Card>
      {isMobile && (
        <>
          <h3 className="w-full mx-auto my-16 text-xl sm:text-lg font-bold text-center">
            About This Product
          </h3>
          <Card>
            {product?.description && (
              <CardContent className="pt-6">
                {product?.description?.map((desc, index) => (
                  <p className="mb-4 text-sm break-words" key={index}>
                    {/* remove &nbsp; that breaks ui */}
                    {desc.replace(/\u00A0/, ' ')}
                  </p>
                ))}
              </CardContent>
            )}
          </Card>
        </>
      )}
    </div>
  )
}
