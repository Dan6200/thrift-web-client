//cspell:ignore CldImage, cloudinary, cloudinary's
'use client'
import { CldImage } from 'next-cloudinary'

export function ProductImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className: string
}) {
  return (
    <CldImage
      src={src}
      width={600}
      height={600}
      alt={alt}
      className={className}
    />
  )
}
