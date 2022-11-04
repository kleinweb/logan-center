// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { PageTitle } from '@/components/Headings'
import {
  allIcons,
  Icon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Facebook,
  Instagram,
  Mail,
  Twitter,
} from '@/components/Icons'
import { ReactNode } from 'react'

export default {
  title: 'Atoms/Icons',
  component: Icon,
}

const iconsets = {
  Chevron: [ChevronDown, ChevronLeft, ChevronRight, ChevronUp],
  Social: [Facebook, Instagram, Twitter],
  Misc: [Mail],
}

type WrapperProps = {
  children: ReactNode
}

const IconWrapper = ({ label, children }: WrapperProps & { label: string }) => (
  <div className="text-white mr-2">
    <Icon label={label}>{children}</Icon>
  </div>
)

const GroupTitle = (props: WrapperProps) => (
  <h3 className="text-lg font-bold dark:text-white mb-2">{props.children}</h3>
)

const GroupWrapper = (props: WrapperProps) => (
  <div className="bg-slate-700 p-4 flex text-white">{props.children}</div>
)

export const AllIcons = () => (
  <>
    <PageTitle>All Icons</PageTitle>
    <GroupWrapper>
      {Object.entries(allIcons).map(([iconName, Icon]) => (
        <IconWrapper label={iconName} key={iconName}>
          <Icon />
        </IconWrapper>
      ))}
    </GroupWrapper>
  </>
)

export const GroupedIcons = () => (
  <>
    <PageTitle>Grouped Icons</PageTitle>
    {Object.entries(iconsets).map(([groupName, icons]) => (
      <>
        <GroupTitle>{groupName}</GroupTitle>
        <GroupWrapper key={groupName}>
          {Object.entries(icons).map(([iconName, Icon]) => (
            <IconWrapper label={iconName} key={iconName}>
              <Icon />
            </IconWrapper>
          ))}
        </GroupWrapper>
      </>
    ))}
  </>
)
