// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'

const defaultAttrs: React.ComponentPropsWithoutRef<'svg'> = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
}

export const SvgIcon = (props: { children: ReactNode }) => (
  <svg className="inline-flex" {...defaultAttrs}>
    {props.children}
  </svg>
)
