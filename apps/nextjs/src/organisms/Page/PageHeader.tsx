// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import {PageTitle} from '@molecules/PageTitle'
import MotifBackground from '@/public/assets/decorations/motif--bg.svg'
import clsx from 'clsx'
import {styles} from '@molecules/utils'

export type PageHeaderProps = {
  title: string
  coverImage?: string | any
}

export default function PageHeader({title}) {
  return (
    <div className="flex flex-col">
      <div className={clsx(styles.container, 'order-2')}>
        <PageTitle>{title}</PageTitle>
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <MotifBackground className="h-28" />
      </div>
    </div>
  )
}
