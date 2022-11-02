import clsx, { ClassValue } from 'clsx'

export const COLORS = {
  Slate: 'slate',
  Teal: 'teal',
  Red: 'red',
} as const

export type PrimaryColor = typeof COLORS[keyof typeof COLORS]
export type BorderColor = PrimaryColor
export type FillColor = PrimaryColor | 'white'

const FILL_CLSX: Record<FillColor, ClassValue> = {
  [COLORS.Red]: 'bg-red-600 text-white',
  [COLORS.Slate]: 'bg-slate-700 text-white',
  [COLORS.Teal]: 'bg-teal-500 text-white',
  white: 'bg-white',
}

const BORDER_CLSX: Record<PrimaryColor, ClassValue> = {
  [COLORS.Red]: 'border-red-600',
  [COLORS.Slate]: 'border-slate-700',
  [COLORS.Teal]: 'border-teal-500',
}

export type Props = {
  children: React.ReactNode
  color?: PrimaryColor
  fill?: FillColor
  border?: BorderColor
}

export default function Button({
  children,
  color = COLORS.Slate,
  fill = color,
  border = color,
}: Props) {
  return (
    <a
      className={clsx(
        'inline-block py-1 px-2 font-bold uppercase',
        FILL_CLSX[fill],
        BORDER_CLSX[border],
      )}>
      {children}
    </a>
  )
}
