// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import * as React from 'react'

type Props = {
  children: React.ReactNode
  label: string
}

export default function Icon({children, label}: Props) {
  const child = React.Children.only(children)
  return (
    <>
      {React.cloneElement(child as React.ReactElement, {
        'aria-hidden': 'true',
        focusable: 'false',
      })}
      <span className="sr-only">{label}</span>
    </>
  )
}
