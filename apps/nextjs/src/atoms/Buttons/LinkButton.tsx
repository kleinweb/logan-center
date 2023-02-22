// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ChevronRight} from 'lucide-react'
import Link, {LinkProps} from 'next/link'
import Button from './Button'
import type {ButtonProps as ButtonProps} from './Button'

type Props = ButtonProps & {
  href: LinkProps['href']
}

export default function LinkButton({href, children, ...rest}: Props) {
  return (
    <Link href={href}>
      <Button {...rest}>
        {children}
        <span className="-mr-2 inline-block">
          <ChevronRight />
        </span>
      </Button>
    </Link>
  )
}
