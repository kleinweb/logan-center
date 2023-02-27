// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/// <https://www.radix-ui.com/docs/primitives/components/separator>
/// <https://github.com/joe-bell/cva/blob/3415925db585438695aa87b1a2cc3f7eea589f0f/examples/react-with-tailwindcss/src/components/button/button.tsx>

import * as RadixSeparator from '@radix-ui/react-separator'
import {cva, VariantProps} from 'class-variance-authority'

const styles = cva('border-slate-100', {
  variants: {
    orientation: {
      vertical: ['mx-8', 'w-px'],
      horizontal: ['mt-28 mb-24', 'h-px w-full'],
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export interface SeparatorProps
  extends Omit<RadixSeparator.SeparatorProps, 'asChild'>,
    VariantProps<typeof styles> {}

export default function Separator({orientation}: SeparatorProps) {
  return <RadixSeparator.Root className={styles({orientation})} />
}
