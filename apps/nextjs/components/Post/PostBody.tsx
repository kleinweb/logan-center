// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  content?: string
}

const PostBody = ({ children, content }: Props) => {
  return (
    <div className="mx-auto max-w-2xl">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default PostBody
