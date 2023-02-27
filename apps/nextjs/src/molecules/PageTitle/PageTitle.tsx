// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import {ChildrenProps} from '@/lib/types'
import {styles} from '@molecules/utils'

const PageTitle = ({children}: ChildrenProps) => {
  return (
    <div className={styles.container}>
      <div className="mt-12 mb-4 inline-block bg-slate-100 p-6 pb-4 align-middle">
        <h1 className="text-primary-dark mb-5 text-2xl font-bold leading-tight">
          {children}
        </h1>
      </div>
    </div>
  )
}

export default PageTitle
