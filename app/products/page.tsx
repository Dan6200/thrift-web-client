// cspell:ignore CldImage, cloudinary, cloudinary's
// Purpose: Page for displaying all products
'use client'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { getProducts } from './get-products'

export default async function Products() {
  const products = await getProducts()
  console.log(products[1])
  return (
    <div className="container mx-auto my-20 w-80">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        Products
      </h2>
      <div className="flex flex-col w-full mx-auto">
        {products.map((product) => (
          <div className="w-full mx-auto my-4" key={product.product_id}>
            <CldImage
              src={product.media[0].filename}
              className="object-cover w-full h-64"
              width={600}
              height={600}
              alt={product.media[0].description}
            />
            <Link
              href={`/products/${product.product_id}`}
              passHref
              className="inline-block w-full text-center text-blue-500"
            >
              {product.title.slice(0, 30) + '...'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
