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
    { src: '/lenovo-thinkpad-t-series.jpg', alt: 'Lenovo laptop' },
    { src: '/amazon-img.jpeg', alt: 'Wedding outfit' },
    { src: '/L1M_DT_HERO._SX3000_QL85_FMpng_.png', alt: 'Summer wear' },
  ]
  if (!isSmallScreen)
    return (
      <Carousel className="h-[32rem] shadow-sm mb-8">
        {images.map(({ src, alt }: any) => (
          <Link key={src} href="/products">
            <Image
              key={src}
              src={src}
              alt={alt}
              width={1200}
              height={600}
              className="object-cover object-center w-full h-[30rem]"
              {...props}
            />
          </Link>
        ))}
      </Carousel>
    )
  return null
}
