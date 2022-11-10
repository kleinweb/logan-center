// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ImageObject } from 'ui'

type Props = {
  path: string
  alt: string
}

// FIXME: account for `basePath` etc
const photosBasePath = '/logan-center/assets/images/photos'

export default function Photo(props: Props) {
  const src = `${photosBasePath}/${props.path}`
  return <ImageObject src={src} alt={props.alt} />
}
