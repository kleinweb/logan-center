// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ChildrenProps} from '@/lib/types'

export interface ArchiveLayoutProps extends ChildrenProps {}

export default function ArchiveLayout({children}: ArchiveLayoutProps) {
  return (
    <div>
      <h1>TKTKTK Archive Layout</h1>
      {children}
    </div>
  )
}
