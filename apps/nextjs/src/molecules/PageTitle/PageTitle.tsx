// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ChildrenProps} from '@/lib/types'
import Container from '@templates/Container'

const PageTitle = ({children}: ChildrenProps) => {
  return (
    <Container>
      <div className="mt-12 mb-4 inline-block bg-slate-100 p-6 pb-4 align-middle">
        <h1 className="text-primary-dark mb-5 text-2xl font-bold leading-tight">
          {children}
        </h1>
      </div>
    </Container>
  )
}

export default PageTitle
