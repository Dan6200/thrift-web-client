//cspell:ignore CldImage, cloudinary, cloudinary's
'use client'
import { CldImage } from 'next-cloudinary'

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <CldImage
      src={src}
      className="object-cover w-full h-32"
      width={600}
      height={600}
      alt={alt}
    />
  )
}
