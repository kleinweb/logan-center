// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1
      className={`
        text-2xl
        md:text-3xl
        lg:text-4xl
        font-bold
        tracking-tighter
        leading-tight
        md:leading-none
        mb-12
        text-center
        md:text-left
      `}
    >
      {children}
    </h1>
  )
}

export default PostTitle
