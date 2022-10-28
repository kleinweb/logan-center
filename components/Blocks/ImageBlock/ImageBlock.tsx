// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { BlockProps } from '../index'
import Image from '@/components/Image/Image'

type Props = BlockProps & {
  src: string
  alt: string
}

export default function ImageBlock(props: Props) {
  return (
    <Image
      {...props}
      alt={props.alt}
    />
  )
}
