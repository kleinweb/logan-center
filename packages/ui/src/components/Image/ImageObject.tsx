// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

import cn, { ClassValue } from 'clsx'
import Image, { ImageProps as NextImageProps } from 'next/image'

type ImageObjectProps = NextImageProps & {
  className?: ClassValue
  aspect?: 'video' | 'banner' | 'square'
}

export default function ImageObject({
  src,
  alt,
  aspect = 'video',
  className = '',
  ...imageProps
}: ImageObjectProps) {
  return (
    <div
      className={cn(
        aspect === 'video' && 'aspect-w-16 aspect-h-9',
        aspect === 'square' && 'aspect-w-1 aspect-h-1',
        aspect === 'banner' && 'aspect-w-3 aspect-h-1',
        'relative',
        'overflow-hidden',
      )}
    >
      <Image
        {...imageProps}
        src={src}
        alt={alt}
        className={cn(className, 'relative', 'object-cover')}
        fill
      />
    </div>
  )
}
