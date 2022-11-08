// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'

export const classes = {
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold uppercase leading-normal tracking-wider',
    h3: 'text-xl font-bold leading-relaxed tracking-widest',
    h4: 'text-lg font-bold uppercase leading-loose tracking-widest',
  },
}

type HeadingProps = {
  children: ReactNode
}

export const PageTitle = ({ children }: HeadingProps) => {
  return <h1 className="font-sans text-4xl font-bold">{children}</h1>
}

export const HeadingOne = ({ children }: HeadingProps) => (
  <h1 className={classes.heading.h1}>{children}</h1>
)

export const HeadingTwo = ({ children }: HeadingProps) => (
  <h2 className={classes.heading.h2}>{children}</h2>
)

export const HeadingThree = ({ children }: HeadingProps) => (
  <h3 className={classes.heading.h3}>{children}</h3>
)

export const HeadingFour = ({ children }: HeadingProps) => (
  <h4 className={classes.heading.h4}>{children}</h4>
)
