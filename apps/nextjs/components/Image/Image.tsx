// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {ComponentProps} from 'react'
import NextImage, {ImageLoader, ImageLoaderProps} from 'next/image'
import wpConfig from '../../wp.config'

/**
 * This component wraps Next's image component to provide an image loader. An
 * image loader allows us to add query parameters for VIP's image processor.
 *
 * https://nextjs.org/docs/api-reference/next/image#loader
 * https://docs.wpvip.com/technical-references/vip-go-files-system/image-transformation/
 */

const {wordPressContentDirname: contentDirname} = wpConfig

export type ImageProps = {
  src: string
  srcset?: string
  originalWidth?: number
  originalHeight?: number
} & ComponentProps<typeof NextImage>

function wpImageLoader({quality, src, width}: ImageLoaderProps): string {
  return `${src}?w=${width}&q=${quality || 75}`
}

export default function Image(props: ImageProps) {
  const {originalHeight, originalWidth, ...imageProps} = props
  const height = props.height || originalHeight
  const width = props.width || originalWidth

  // Only set a loader if it is actually needed. This avoids a Next.js warning:
  // https://nextjs.org/docs/messages/next-image-missing-loader-width
  // FIXME: not sure what the error is about but i didn't write this...
  // @ts-expect-error
  const loader: ImageLoader = props.src.includes(`/${contentDirname}/uploads/`)
    ? wpImageLoader
    : undefined

  return (
    <NextImage loader={loader} {...imageProps} height={height} width={width} />
  )
}
