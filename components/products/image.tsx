//cspell:ignore CldImage, cloudinary, cloudinary's, unoptimized
'use client'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

export function ProductImage({
  className,
  imgData,
}: {
  className: string
  imgData:
    | {
        filename: string
        filepath: string
        description: string
        is_display_image: boolean
      }
    | undefined
}) {
  const placeHolder =
    'https://images.pexels.com/photos/16952091/pexels-photo-16952091/free-photo-of-wood-landscape-field-summer.jpeg'

  if (imgData?.filepath?.includes('cloudinary')) {
    const src = imgData.filename
    const alt = imgData.description
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
  if (imgData?.filepath) {
    const src = imgData.filepath
    const alt = imgData.description
    return (
      <Image
        unoptimized
        src={src}
        alt={alt ?? ''}
        width={600}
        height={600}
        className={className}
      />
    )
  }
  return (
    <Image
      src={placeHolder}
      alt={'placeholder'}
      width={600}
      height={600}
      className={className}
    />
  )
}
