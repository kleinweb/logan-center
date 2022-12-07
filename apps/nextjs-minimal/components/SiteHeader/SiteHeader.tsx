// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { __ } from '@wordpress/i18n'

import { ActiveLink as ActiveLinkComponent } from 'ui'
import { ActiveLinkProps as ActiveLinkComponentProps } from 'ui'

import Container from '../Container'

import LogoMinimal from 'site-assets/logos/logo--gfx--duo.svg'
import LogoText from 'site-assets/logos/logo--text.svg'

type ActiveLinkProps = {
  href: LinkProps['href']
  children: ActiveLinkComponentProps['children']
}

const LogoInline = () => (
  <Link href="/" className="flex gap-1">
    <LogoMinimal className="w-full" />
    <LogoText className="w-full" />
  </Link>
)

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

const navLinkStyles = 'p-2 uppercase'

export default function SiteHeader() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div className="grow">
          <div className="max-w-sm">
            <LogoInline />
          </div>
        </div>
        <nav>
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
                className={clsx("after:content-['_↗']", navLinkStyles)}
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
