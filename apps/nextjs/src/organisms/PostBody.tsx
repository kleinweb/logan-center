// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import clsx from 'clsx'
import {ReactNode} from 'react'

export type PostBodyProps = {
  /** Raw post HTML from the CMS. */
  content?: string
  /**
   * Optional additional content to display below the post body. Note that
   * TailwindCSS Typography plugin styles will not be applied.
   */
  children?: ReactNode
}

export default function PostBody({children, content}: PostBodyProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={clsx(
          'prose mx-10',
          // <h2> styles :=>
          [
            'prose-h2:text-red-600 prose-h2:uppercase prose-h2:tracking-wider',
            'prose-h2:text-lg prose-h2:md:text-2xl',
          ],
        )}
        dangerouslySetInnerHTML={{__html: content}}
      />
      {children ? <div>{children}</div> : undefined}
    </div>
  )
}
