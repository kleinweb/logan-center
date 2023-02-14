// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import cn from 'clsx'
import Link, { LinkProps } from 'next/link'
import { __ } from '@wordpress/i18n'

import { ActiveLink as ActiveLinkComponent } from '@/components/ActiveLink'
import type { ActiveLinkProps as ActiveLinkComponentProps } from '@/components/ActiveLink'

import LogoFull from '@/public/assets/logos/logo--full--duo.svg'

import Container from '../Container'
import { GetStaticProps } from 'next'
import getApolloClient from '@/graphql/apollo'
import { useSiteMenusContext } from '@/contexts/SiteMenus'
import { flatListToHierarchical, growMenuTree } from '@/lib/menus'
import { MenuItem } from '@/graphql/generated'

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
  const { headerMenu } = useSiteMenusContext()

  // const menuItems = growMenuTree(headerMenu?.menuItems?.nodes ?? []).map(
  //   (parent) => parent.childItems.nodes.map((child) => <NavItem></NavItem>),
  // )

  const menuData = flatListToHierarchical(headerMenu?.menuItems?.nodes ?? [])

  // Loop over all menu items.
  const menuItems = menuData.map((parent) => {
    // If there is a child item...
    if (parent?.childItems?.nodes?.length > 0) {
      // Loop over all child items.
      const dropdownItems = parent.childItems.nodes.map((child: MenuItem) => {
        return (
          <li key={child.id}>
            <a href={child.path}>{child.label}</a>
          </li>
          // <Menu.Item key={child.id} component="a">
          //   <a href={child.path} className={classes.link}>
          //     {child.label}
          //   </a>
          // </Menu.Item>
        )
      })

      // Build the parent item and its dropdown.
      return undefined
      // FIXME
      // <Menu key={parent.id} exitTransitionDuration={0} position="bottom-end">
      //   <Menu.Target>
      //     <span className={classes.link}>
      //       <span className={classes.linkLabel}>{parent.label}</span>
      //       <IconChevronDown size={12} stroke="1.5" />
      //     </span>
      //   </Menu.Target>
      //   <Menu.Dropdown className={classes.dropdown}>
      //     {dropdownItems}
      //   </Menu.Dropdown>
      // </Menu>
    }

    // Return a parent/single menu item.
    return (
      <a key={parent.id} href={parent.path} className={classes.link}>
        {parent.label}
      </a>
    )
  })
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoFull className="h-18 md:h-20 xl:h-24" />
        </Link>
        <nav className="grow">
          <ul className="flex items-center justify-end">
            {headerMenu.menuItems.nodes}
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
