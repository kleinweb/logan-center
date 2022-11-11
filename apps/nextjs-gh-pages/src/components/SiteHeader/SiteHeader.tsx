// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'

import LogoFull from 'ui/assets/logos/logo--full--duo.svg'
import LogoMinimal from 'ui/assets/logos/logo--gfx--duo.svg'
import Container from '../Container'
import { ActiveLink } from 'ui'

const navItems = [
  ['/', 'Home'],
  ['/podcast', 'Podcast'],
]

export default function SiteHeader() {
  return (
    <Container>
      <div className="flex align-middle">
        <Link href="/" className="grow block">
          <LogoMinimal className="block min-[468px]:hidden" />
          <LogoFull className="hidden min-[468px]:block max-h-16" />
        </Link>
        <nav className="items-center flex">
          {navItems.map(([path, label]) => (
            <li key={label} className="list-none">
              <ActiveLink href={path} activeClassName="text-teal-500 font-bold">
                <a className="px-2 uppercase first:ml-2 last:-mr-2">{label}</a>
              </ActiveLink>
            </li>
          ))}
        </nav>
      </div>
    </Container>
  )
}
