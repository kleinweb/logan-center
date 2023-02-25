import {ClassValue} from 'clsx'

export interface ChildrenProps {
  children: React.ReactNode
}

export interface ClassNameProps {
  className?: ClassValue
}

/**
 * Named aspect ratios supported in our Tailwind theme.
 *
 * Unfortunately, it seems that parsing the fully-resolved Tailwind
 * configuration would dramatically increase the resulting bundle size. We can
 * export the configuration easily to a JSON file, but it turns out that casting
 * a parsed JSON string to TypeScript types is not particularly straightforward
 * (as far as I can tell).
 */
export type AspectRatioNames = 'square' | 'video' | 'banner' | 'cinematic'
