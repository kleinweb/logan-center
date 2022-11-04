// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import clsx, { ClassValue } from 'clsx'

export const COLORS = {
  Slate: 'slate',
  Teal: 'teal',
  Red: 'red',
} as const

export const VARIANTS = {
  Solid: 'solid',
  Sparse: 'sparse',
} as const

type Color = typeof COLORS[keyof typeof COLORS]
type Variant = typeof VARIANTS[keyof typeof VARIANTS]

export type Props = {
  children: React.ReactNode
  color?: Color
  variant?: Variant
}

const SPARSE_VARIANT: Record<Color, ClassValue> = {
  [COLORS.Red]: `
    text-red-600
    hover:bg-red-600
    hover:text-white
    active:bg-red-600
    active:text-white
  `,
  [COLORS.Slate]: `
    text-slate-700
    hover:bg-slate-700
    hover:text-white
    active:bg-slate-700
    active:text-white
  `,
  [COLORS.Teal]: `
    text-teal-500
    hover:text-white
    hover:bg-teal-500
    active:bg-teal-500
    active:text-white
  `,
}

const SOLID_VARIANT: Record<Color, ClassValue> = {
  [COLORS.Red]: `
    bg-red-600
    text-white
    hover:text-red-600
  `,
  [COLORS.Slate]: `
    bg-slate-700
    text-white
    hover:text-slate-700
  `,
  [COLORS.Teal]: `
    bg-teal-500
    text-white
    hover:text-teal-500
  `,
}

const BORDER_CLSX: Record<Color, ClassValue> = {
  [COLORS.Red]: 'border-red-600',
  [COLORS.Slate]: 'border-slate-700',
  [COLORS.Teal]: 'border-teal-500',
}

export default function Button({
  children,
  color = COLORS.Slate,
  variant = 'solid',
}: Props) {
  const isSolid = variant === 'solid'

  return (
    <a
      className={clsx(
        [
          'inline-flex',
          'py-1',
          'px-2',
          'font-bold',
          'uppercase',
          'cursor-pointer',
          'border-2',
          'align-middle',
        ],
        BORDER_CLSX[color],
        isSolid
          ? ['hover:bg-white', SOLID_VARIANT[color]]
          : ['bg-white', SPARSE_VARIANT[color]],
      )}
    >
      {children}
    </a>
  )
}
