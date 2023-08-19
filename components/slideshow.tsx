'use client'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'

export function Slideshow(props: PropsWithChildren) {
  return null
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const images = []
  const smallerImages = []
  const imgList = isSmallScreen ? smallerImages : images
  return (
    <Carousel className="w-[70vw] md:w-[50vw] mx-auto shadow-sm mb-8">
      {imgList.map(({ src, alt, category }: any) => (
        <Link key={src} href={`/categories/${category}`}>
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
