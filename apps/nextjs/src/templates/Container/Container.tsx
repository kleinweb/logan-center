// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ChildrenProps, ClassNameProps} from '@/lib/types'
import clsx from 'clsx'
import * as React from 'react'

type ContainerProps = ChildrenProps & ClassNameProps

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={clsx('container relative mx-auto px-5', className)}>
      {children}
    </div>
  )
}

export default Container
