// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Image from 'next/image'

import CoverImageFallback from './CoverImageFallback'

export interface ICoverImageProps {
  alt?: string
  src?: string
}

const CoverImage = ({alt = '', src = undefined}: ICoverImageProps) => {
  return src ? (
    <div className="aspect-video w-full overflow-hidden">
      <Image
        src={src}
        // FIXME: use real alt text
        // alt={`Cover Image for ${title}`}
        alt={alt}
        className={cn(
          'shadow-sm',
          'transition-shadow duration-200 hover:shadow-lg',
        )}
        fill
      />
    </div>
  ) : (
    <CoverImageFallback />
  )
}

export default CoverImage
