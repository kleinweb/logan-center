// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Image from '../Image/Image'

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
          originalWidth={400}
          originalHeight={70}
          className="w-full"
          // FIXME: this really should not be a PNG!
          src="/assets/logos/png/logo--graphic--duo-light.png"
          // FIXME: DRY up the site title -- typos are very dangerous here
          alt="Logo of the Logan Center for Urban Investigative Journalism"
        />
        <div>
          <h1 className="relative">
            <span className="font-bold text-4xl block">Logan Center</span>
            <span className="absolute right-0">
              For Urban Investigative Reporting
            </span>
          </h1>
        </div>
        {/* <Image
          // FIXME: this really should not be a PNG!
          src="/assets/logos/png/logo--full--duo-light.png"
          // FIXME: DRY up the site title -- typos are very dangerous here
          alt="Logo of the Logan Center for Urban Investigative Journalism"
          originalWidth="289"
          originalHeight="108"
        /> */}
      </div>
      <nav className="flex flex-col mt-2">
        {navItems.map(([path, label]) => (
          <Link
            key={label}
            href={path}
            className={clsx(
              'uppercase py-1 px-2 mb-2 -ml-2',
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
