// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import LogoFull from 'ui/assets/logos/logo--full--duo.svg'
import LogoMinimal from 'ui/assets/logos/logo--gfx--duo.svg'

type Props = {
  headerLink?: ReactNode
}

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/podcast', 'Podcast'],
]

/**
 * Server-side data loading must take place in pages. If you need to load data
 * to render this component, you must pass it down as props (or load it client-
 * side.)
 */
export default function SiteHeader(props: Props) {
  return (
    <div className="flex align-middle">
      <Link href="/" className="grow block">
        <LogoMinimal className="block min-[468px]:hidden" />
        <LogoFull className="hidden min-[468px]:block max-h-16" />
        <div>
          <h1 className="sr-only">
            Logan Center For Urban Investigative Reporting
          </h1>
        </div>
      </Link>
      <nav className="items-center flex">
        {navItems.map(([path, label]) => (
          <Link
            key={label}
            href={path}
            className={clsx(
              'px-2 uppercase first:ml-2 last:-mr-2',
              // FIXME: this is a stand-in for the currently-active page -- disabled as a visual reminder
              // 'Home' === label && 'font-bold text-teal-500',
            )}
          >
            {label}
          </Link>
        ))}
        {props.headerLink && (
          <>
            {` > `}
            {props.headerLink}
          </>
        )}
      </nav>
    </div>
  )
}
