// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { __ } from '@wordpress/i18n'

import { ActiveLink as ActiveLinkComponent } from '@kleinweb/logan-center__ui'
import { ActiveLinkProps as ActiveLinkComponentProps } from '@kleinweb/logan-center__ui'

import Container from '../Container'

import LogoMinimal from '@kleinweb/logan-center__site-assets/logos/logo--gfx--duo.svg'
import LogoText from '@kleinweb/logan-center__site-assets/logos/logo--text.svg'
import LogoFull from '@kleinweb/logan-center__site-assets/logos/logo--full--duo.svg'

type ActiveLinkProps = {
  href: LinkProps['href']
  children: ActiveLinkComponentProps['children']
}

const NavItem = (props: ActiveLinkProps) => (
  <li className="text-xs first:ml-2 last:-mr-2">
    <ActiveLinkComponent
      href={props.href}
      activeClassName="text-teal-500 font-bold"
    >
      {props.children}
    </ActiveLinkComponent>
  </li>
)

export default function SiteHeader() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div className="shrink">
          <div className="max-w-sm">
            <Link href="/">
              <div className="flex gap-1 sm:hidden">
                <LogoMinimal className="w-full" />
                <LogoText className="w-full" />
              </div>
              <div className="hidden w-[25vh] gap-1 sm:flex sm:flex-col">
                <LogoFull className="w-full" />
              </div>
            </Link>
          </div>
        </div>
        <nav className="grow">
          <ul className="flex items-center justify-end">
            {/*
            FIXME: disabled until podcast page is ready
            <NavItem href="/podcast">
              <a className={navLinkStyles}>{__('Podcast')}</a>
            </NavItem>
            */}
            <NavItem href="https://klein.temple.edu/news/2021/07/klein-college-establishes-logan-center-urban-investigative-reporting">
              <a
                rel="noreferrer external"
                target="_blank"
                className={clsx(
                  "after:content-['_↗']",
                  'whitespace-nowrap p-2 uppercase',
                )}
              >
                {__('About', 'logan-center')}
              </a>
            </NavItem>
          </ul>
        </nav>
      </div>
    </Container>
  )
}
