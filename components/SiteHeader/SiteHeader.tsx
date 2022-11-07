// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'

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
    <>
      <div className="">
        <Image
          width={400}
          height={70}
          className="w-full"
          // FIXME: this really should not be a PNG!
          src="/assets/logos/png/logo--graphic--duo-light.png"
          // FIXME: DRY up the site title -- typos are very dangerous here
          alt="Logo of the Logan Center for Urban Investigative Journalism"
        />
        <div>
          <h1 className="relative">
            <span className="block text-4xl font-bold">Logan Center</span>
            <span className="absolute right-0">
              For Urban Investigative Reporting
            </span>
          </h1>
        </div>
        {/* <Image
          width="289"
          height="108"

          // FIXME: this really should not be a PNG!
          src="/assets/logos/png/logo--full--duo-light.png"
          // FIXME: DRY up the site title -- typos are very dangerous here
          alt="Logo of the Logan Center for Urban Investigative Journalism"
        /> */}
      </div>
      <nav className="mt-2 flex flex-col">
        {navItems.map(([path, label]) => (
          <Link
            key={label}
            href={path}
            className={clsx(
              'mb-2 -ml-2 py-1 px-2 uppercase',
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
    </>
  )
}
