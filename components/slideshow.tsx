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
    { src: '/pexels-ovan-62689.jpg', alt: '' },
    { src: '/pexels-elvis-2528118.jpg', alt: '' },
    { src: '/pexels-athena-2043590.jpg', alt: '' },
    { src: '/pexels-pixabay-159376.jpg', alt: '' },
    { src: '/pexels-pixabay-459762.jpg', alt: '' },
    { src: '/pexels-harsh-kushwaha-1721558.jpg', alt: '' },
    { src: '/pexels-noah-erickson-404280.jpg', alt: '' },
    { src: '/pexels-designecologist-1779487.jpg', alt: '' },
  ]
  return (
    <Carousel className="h-96 md:h-[30rem] md:w-[80vw] mx-auto shadow-sm mb-8">
      {images.map(({ src, alt }: any) => (
        <Link key={src} href="/products">
          <Image
            key={src}
            src={src}
            alt={alt}
            width={isSmallScreen ? 800 : 1000}
            height={isSmallScreen ? 400 : 800}
            className="object-cover object-center w-full h-80 md:h-[27rem]"
            {...props}
          />
        </Link>
      ))}
    </Carousel>
  )
}
