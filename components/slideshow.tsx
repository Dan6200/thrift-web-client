'use client'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'

export function Slideshow(props: PropsWithChildren) {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const images = [
    { src: '/books-glasses-sweater.jpg', alt: '' },
    { src: '/desktop.jpg', alt: '' },
    { src: '/dress-shoes.jpg', alt: '' },
    { src: '/keyboard-headphones.jpg', alt: '' },
    { src: '/shirt-phone-jeans.jpg', alt: '' },
    { src: '/smartwatch.jpg', alt: '' },
  ]
  const smallerImages = [
    { src: '/smartwatch-mobile.jpg', alt: '' },
    { src: '/shirt-phone-jeans-mobile.jpg', alt: '' },
    { src: '/keyboard-headphones-mobile.jpg', alt: '' },
    { src: '/dress-shoes-mobile.jpg', alt: '' },
    { src: '/desktop-mobile.jpg', alt: '' },
    { src: '/books-glasses-sweater-mobile.jpg', alt: '' },
  ]
  const imgList = isSmallScreen ? smallerImages : images
  return (
    <Carousel className="w-[50vw] mx-auto shadow-sm mb-8">
      {imgList.map(({ src, alt }: any) => (
        <Link key={src} href="/products">
          {isSmallScreen ? (
            <Image
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
              height={800}
              objectFit="cover"
              objectPosition="center"
              className="h-[80vh]"
              {...props}
            />
          )}
        </Link>
      ))}
    </Carousel>
  )
}
