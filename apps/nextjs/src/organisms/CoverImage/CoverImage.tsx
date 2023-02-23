// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import clsx from 'clsx'
import Image, {ImageProps} from 'next/image'
import Link from 'next/link'
import {cva, VariantProps} from 'class-variance-authority'

import {AspectRatioNames} from '@/lib/types'

const styles = cva('relative overflow-hidden sm:mx-0', {
  variants: {
    aspectContain: {
      square: 'aspect-square',
      video: 'aspect-video',
      banner: 'aspect-banner',
      cinematic: 'aspect-cinematic',
    },
  },
})

export interface CoverImageProps
  extends Omit<ImageProps, 'alt'>,
    VariantProps<typeof styles> {
  contentTitle: string
  contentUrl?: string
  aspectContain?: AspectRatioNames
}

export default function CoverImage({
  src,
  contentTitle,
  contentUrl,
  aspectContain,
}: CoverImageProps) {
  const image = (
    <Image
      // FIXME: get the actual values!
      width={2000}
      height={1000}
      alt={`Cover image for ${contentTitle}`}
      src={src}
      fill={!!aspectContain}
      className={clsx('shadow-sm', [
        contentUrl && 'transition-shadow duration-200 hover:shadow-md',
      ])}
    />
  )
  return (
    <div className={styles({aspectContain})}>
      {contentUrl ? (
        <Link href={contentUrl} aria-label={contentTitle}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
