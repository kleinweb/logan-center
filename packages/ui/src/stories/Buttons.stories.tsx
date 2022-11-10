// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { ChevronRight } from 'lucide-react'

import Button, { VARIANTS } from '@/components/Buttons'
import { Icon } from '@/components/Icons'

export default {
  title: 'Atoms/Buttons',
  component: Button,
}

export const DefaultButton = {
  args: {
    children: 'Button Text',
  },
}

export const ButtonWithIcon = {
  args: {
    children: (
      <>
        Button Dafoe{' '}
        <div className="-mr-2 mt-[-2px]">
          <Icon label="Read More">
            <ChevronRight />
          </Icon>
        </div>
      </>
    ),
  },
}

export const SparseButton = {
  args: {
    children: 'Sparse Button',
    variant: VARIANTS.Sparse,
  },
}
