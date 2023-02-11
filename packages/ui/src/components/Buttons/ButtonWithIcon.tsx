// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

import { LucideIconComponent } from '@/types'
import Button, { ButtonProps } from './Button'

export type ButtonWithIconProps = ButtonProps & {
  children: ReactNode
  icon?: LucideIconComponent
}

export default function ButtonWithIcon({
  children,
  icon: Icon = ChevronRight,
  ...rest
}: ButtonWithIconProps) {
  return (
    <Button {...rest}>
      {children}
      <span className="-mr-2 inline-block">
        <Icon />
      </span>
    </Button>
  )
}
