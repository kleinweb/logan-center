// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import * as React from 'react'

type Props = {
  children?: React.ReactNode
}

const Container = ({children}: Props) => {
  return <div className="container relative mx-auto px-5">{children}</div>
}

export default Container
