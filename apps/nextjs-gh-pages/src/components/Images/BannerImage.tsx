// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ImageObject } from 'ui'

type Props = {
  src: string
  alt: string
}

export default function BannerImage(props: Props) {
  return <ImageObject src={props.src} alt={props.alt} aspect="banner" />
}
