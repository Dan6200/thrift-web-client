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
        description: string
        is_thumbnail_image: boolean
        is_landing_image: boolean
        is_video: boolean
      }
    | undefined
}) {
  const placeHolder =
    'https://images.pexels.com/photos/16952091/pexels-photo-16952091/free-photo-of-wood-landscape-field-summer.jpeg'

  //console.log(imgData)

  if (imgData?.filename) {
    const src = 'thrift-app-media/' + imgData.filename + '.jpg.jpg'
    const alt = imgData.description
    // Note explicitly setting version is not necessary
    return <CldImage {...{ src, alt, className }} width={600} height={600} />
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
