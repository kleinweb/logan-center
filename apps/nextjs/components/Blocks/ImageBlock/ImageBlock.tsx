// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {BlockProps} from '../index'
import Image from '@/components/Image/Image'

export interface IImageBlockProps extends BlockProps {
  src: string
  alt: string
}

export default function ImageBlock(props: IImageBlockProps) {
  // We explicitly destructure the `block` property but don't use it so that we
  // can easily pass the rest of the props through.
  // TODO(@montchr): this should have been addressed in eslint config but maybe my workspace is misconfigured
  // eslint-disable-next-line no-unused-vars
  const {block: _omit, ...imageProps} = props
  return <Image {...imageProps} alt={props.alt} />
}
