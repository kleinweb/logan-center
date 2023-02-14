// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Facebook,
  Instagram,
  Twitter,
  Mail,
} from 'lucide-react'

import { HeadingOne } from '../components/Headings'
import { Icon } from '../components/Icons'
import { ReactNode } from 'react'

export default {
  title: 'Atoms/Icons',
  component: Icon,
}

const allIcons = {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Facebook,
  Instagram,
  Twitter,
  Mail,
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
  <div className="mr-2 text-white">
    <Icon label={label}>{children}</Icon>
  </div>
)

const GroupTitle = (props: WrapperProps) => (
  <h3 className="mb-2 text-lg font-bold dark:text-white">{props.children}</h3>
)

const GroupWrapper = (props: WrapperProps) => (
  <div className="flex bg-slate-700 p-4 text-white">{props.children}</div>
)

export const AllIcons = () => (
  <>
    <HeadingOne>All Icons</HeadingOne>
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
    <HeadingOne>Grouped Icons</HeadingOne>
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
