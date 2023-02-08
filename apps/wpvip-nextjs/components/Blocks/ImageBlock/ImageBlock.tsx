// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { BlockProps } from '../index'
import Image from 'next/image'

export type ImageBlockProps = BlockProps & {
  src: string
  alt: string
}

export default function ImageBlock(props: ImageBlockProps) {
  return <Image {...props} alt={props.alt} />
}
