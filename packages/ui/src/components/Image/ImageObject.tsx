// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

import Image from 'next/image'

type Props = {
  src: string
  alt: string
}

export default function ImageObject(props: Props) {
  return (
    <div className="aspect-video relative object-cover overflow-hidden">
      <Image src={props.src} alt={props.alt} fill />
    </div>
  )
}
