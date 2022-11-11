// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Image, { StaticImageData } from 'next/image'

type Props = {
  src: StaticImageData
  alt: string
  aspect?: 'video' | 'banner' | 'square'
}

export default function ImageObject({ aspect = 'video', src, alt }: Props) {
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
      <Image src={src} alt={alt} className="relative top-2 object-cover" fill />
    </div>
  )
}
