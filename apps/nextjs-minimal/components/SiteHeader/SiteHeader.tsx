// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Link, { LinkProps } from 'next/link'
import { __ } from '@wordpress/i18n'

import { ActiveLink as ActiveLinkComponent } from '@kleinweb/logan-center__ui'
import { ActiveLinkProps as ActiveLinkComponentProps } from '@kleinweb/logan-center__ui'

import Container from '../Container'

import LogoFull from '@kleinweb/logan-center__site-assets/logos/logo--full--duo.svg'

type ActiveLinkProps = {
  href: LinkProps['href']
  children: ActiveLinkComponentProps['children']
}

const NavItem = (props: ActiveLinkProps) => (
  <li
    className={cn(
      'text-xs font-semibold',
      'first:ml-1 last:-mr-1',
      'sm:first:ml-2 sm:last:-mr-2',
      'md:text-sm',
    )}
  >
    <ActiveLinkComponent href={props.href} activeClassName="text-teal-500">
      {props.children}
    </ActiveLinkComponent>
  </li>
)

export default function SiteHeader() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoFull className="h-18 md:h-20 xl:h-24" />
        </Link>
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
                className={cn(
                  "after:content-['_↗']",
                  'whitespace-nowrap px-1 py-2 uppercase sm:px-2',
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
