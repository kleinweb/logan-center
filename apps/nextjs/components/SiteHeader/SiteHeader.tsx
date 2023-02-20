// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Link from 'next/link'

import {ActiveLink as ActiveLinkComponent} from '@/components/ActiveLink'
// import type {ActiveLinkProps as ActiveLinkComponentProps} from '@/components/ActiveLink'

import LogoFull from '@/public/assets/logos/logo--full--duo.svg'

import Container from '../Container'
// import NavigationMenu from './NavigationMenu'
import {SiteMenusDocument} from '@/gql/graphql'
import {useQuery} from '@apollo/client'
import {flatListToHierarchical} from '@/lib/menus'

// type ActiveLinkProps = {
//   href: LinkProps['href']
//   children: ActiveLinkComponentProps['children']
// }

// FIXME: errors prob cos client-side request and we aren't doing anything to
// handle the async nature of this (though the apollo client can help)
export default function SiteHeader() {
  const {data} = useQuery(SiteMenusDocument)
  // Convert flat list to hierarchical list.
  const menuData = flatListToHierarchical(data?.headerMenu?.nodes)
  // console.log(data, menuData)

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoFull className="h-18 md:h-20 xl:h-24" />
        </Link>
        <nav className="grow">
          <ul className="flex items-center justify-end">
            {menuData.map(parent =>
              parent?.childItems?.nodes ? (
                <li
                  key={parent.id}
                  className={cn(
                    'text-xs font-semibold',
                    'first:ml-1 last:-mr-1',
                    'sm:first:ml-2 sm:last:-mr-2',
                    'md:text-sm',
                  )}
                >
                  <ActiveLinkComponent
                    href={parent.path}
                    activeClassName="text-teal-500"
                  >
                    {parent.label}
                  </ActiveLinkComponent>
                  <div className="dropdown">
                    {parent.childItems.nodes.map(child => (
                      <a key={child.id} href={child.path ?? '#'}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                </li>
              ) : (
                <a key={parent.id} href={parent.path ?? '#'} className="link">
                  {parent.label}
                </a>
              ),
            )}
            {/* FIXME: restore any necessities
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
            </NavItem> */}
          </ul>
        </nav>
      </div>
    </Container>
  )
}
