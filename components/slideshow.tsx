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
    { src: '/books-glasses-sweater.jpg', alt: 'books glasses sweater' },
    { src: '/desktop.jpg', alt: 'desktop' },
    { src: '/dress-shoes.jpg', alt: 'dress shoes' },
    { src: '/keyboard-headphones.jpg', alt: 'keyboard headphones' },
    { src: '/shirt-phone-jeans.jpg', alt: 'shirt phone jeans' },
    { src: '/smartwatch.jpg', alt: 'smartwatch' },
  ]
  const smallerImages = [
    { src: '/smartwatch-mobile.jpg', alt: 'smartwatch mobile' },
    { src: '/shirt-phone-jeans-mobile.jpg', alt: 'shirt phone jeans mobile' },
    {
      src: '/keyboard-headphones-mobile.jpg',
      alt: 'keyboard headphones mobile',
    },
    { src: '/dress-shoes-mobile.jpg', alt: 'dress shoes mobile' },
    { src: '/desktop-mobile.jpg', alt: 'desktop mobile' },
    {
      src: '/books-glasses-sweater-mobile.jpg',
      alt: 'books glasses sweater mobile',
    },
  ]
  const imgList = isSmallScreen ? smallerImages : images
  return (
    <Carousel className="w-[70vw] md:w-[50vw] mx-auto shadow-sm mb-8">
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
              height={1200}
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
