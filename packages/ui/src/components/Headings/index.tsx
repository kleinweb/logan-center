// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'

export const HEADING_CLASSES = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold uppercase leading-normal tracking-wider',
  h4: 'text-xl font-bold leading-relaxed tracking-widest',
  h5: 'text-lg font-bold uppercase leading-loose tracking-widest',
}

type HeadingProps = {
  children: ReactNode
}

export const HeadingOne = ({ children }: HeadingProps) => (
  <h1 className={HEADING_CLASSES.h1}>{children}</h1>
)

export const HeadingTwo = ({ children }: HeadingProps) => (
  <h2 className={HEADING_CLASSES.h2}>{children}</h2>
)

export const HeadingThree = ({ children }: HeadingProps) => (
  <h3 className={HEADING_CLASSES.h3}>{children}</h3>
)

export const HeadingFour = ({ children }: HeadingProps) => (
  <h4 className={HEADING_CLASSES.h4}>{children}</h4>
)

export const HeadingFive = ({ children }: HeadingProps) => (
  <h5 className={HEADING_CLASSES.h5}>{children}</h5>
)
