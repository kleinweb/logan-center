// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'
import clsx from 'clsx'

import LogoFull from 'ui/assets/logos/logo--full--duo.svg'
import LogoMinimal from 'ui/assets/logos/logo--gfx--duo.svg'

const navItems = [
  ['/', 'Home'],
  ['/podcast', 'Podcast'],
]

export default function SiteHeader() {
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
      </nav>
    </div>
  )
}
