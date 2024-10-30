'use client'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'

export function Slideshow(props: PropsWithChildren) {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const images: any[] = [
    { src: '/banner.png', category: 'Clothing' },
    { src: '/banner-2.png', category: 'Clothing' },
    { src: '/banner-3.png', category: 'Electronics' },
  ]
  const smallerImages: any = []
  const imgList = isSmallScreen ? smallerImages : images
  return (
    <Carousel className="w-full h-[50vh] mx-auto shadow-sm mb-8">
      {imgList.map(({ src, alt, category }: any) => (
        <Link rel="preload" key={src} href={`/categories/${category}`}>
          {isSmallScreen ? (
            <Image
							priority={true}
              key={src}
              src={src}
              alt={alt}
              width={600}
              height={1000}
              className=""
              {...props}
            />
          ) : (
            <Image
              id="large"
              key={src}
              src={src}
              alt={alt}
              width={1920}
              height={600}
              {...props}
            />
          )}
        </Link>
      ))}
    </Carousel>
  )
}
