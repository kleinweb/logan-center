// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { BlockProps } from '../index'

type Props = BlockProps & {
  ordered?: boolean
  reversed?: boolean
  start?: number
}

export default function List({ block: { innerHTML }, ...props }: Props) {
  if (props.ordered) {
    return (
      <ol
        dangerouslySetInnerHTML={{ __html: innerHTML }}
        reversed={props.reversed}
        start={props.start}
      />
    )
  }

  return <ul dangerouslySetInnerHTML={{ __html: innerHTML }} />
}
