// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  headerLink?: ReactNode
}

/**
 * Server-side data loading must take place in pages. If you need to load data
 * to render this component, you must pass it down as props (or load it client-
 * side.)
 */
export default function SiteHeader(props: Props) {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        {props.headerLink && (
          <>
            {` > `}
            {props.headerLink}
          </>
        )}
      </nav>
      <hr />
    </>
  )
}
