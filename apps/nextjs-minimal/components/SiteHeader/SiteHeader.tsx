// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'

import LogoFull from 'shared-assets/logos/logo--full--duo.svg'
import LogoMinimal from 'shared-assets/logos/logo--gfx--duo.svg'
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
        <Link href="/" className="block grow">
          <LogoMinimal className="block min-[468px]:hidden" />
          <LogoFull className="hidden max-h-16 min-[468px]:block" />
        </Link>
        <nav className="flex items-center">
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
