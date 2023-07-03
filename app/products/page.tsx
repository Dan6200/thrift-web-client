// Purpose: Page for displaying all products
'use client'
import Link from 'next/link'
import { Image } from 'cloudinary-react'
import { useState, useEffect } from 'react'

async function getProducts() {
  try {
    const products = await fetch(
      'https://thrift-dev.up.railway.app/v1/public/products?offset=0&limit=100'
    )
    const data = await products.json()
    return data
  } catch (err) {
    throw err
  }
}

export type Product = {
  product_id: number
  title: string
  category: string
  description: string[]
  list_price: number
  net_price: number
  quantity_available: number
  media: { filename: string; description: string }[]
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    getProducts().then((data) => setProducts(data))
  }, [])
  return (
    <div className="container mx-auto my-20 w-80">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        Products
      </h2>
      <div className="flex flex-col w-full mx-auto">
        {products.map((product) => (
          <div className="w-full mx-auto my-4" key={product.product_id}>
            <Image
              cloudName="thrift"
              publicId={product.media[0].filename}
              className="object-cover w-full h-64"
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
