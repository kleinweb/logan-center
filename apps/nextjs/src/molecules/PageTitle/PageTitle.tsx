// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({children}: Props) => {
  return (
    <h1
      // FIXME: needs updating?
      className={`
      mb-12
      text-center
      text-2xl
      font-bold
      leading-tight
      tracking-tighter
      md:text-left
      md:text-3xl
      md:leading-none
      lg:text-4xl
    `}
    >
      {children}
    </h1>
  )
}

export default PostTitle
