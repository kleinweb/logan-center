// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({title, src, slug}: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'transition-shadow duration-200 hover:shadow-lg': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
