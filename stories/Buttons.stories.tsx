// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Story } from '@ladle/react'
import Button, { COLORS, Props, VARIANTS } from '@/components/Buttons'
import { ChevronRight, Icon } from '@/components/Icons'

const defaultArgs = {
  children: 'Default',
}

const defaultArgTypes = {
  variant: {
    options: Object.values(VARIANTS),
    control: { type: 'radio' },
    defaultValue: VARIANTS.Solid,
  },
  color: {
    options: Object.values(COLORS),
    control: { type: 'radio' },
    defaultValue: COLORS.Slate,
  },
}

const Template: Story<Props> = (args) => <Button {...args} />

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  ...defaultArgs,
  children: 'Button Dafoe',
}
DefaultButton.argTypes = defaultArgTypes

export const ButtonWithIcon = Template.bind({})
ButtonWithIcon.args = {
  ...defaultArgs,
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
}
ButtonWithIcon.argTypes = defaultArgTypes

export const SparseButton = Template.bind({})
SparseButton.args = {
  ...DefaultButton.args,
  children: 'Sparse Button',
  variant: VARIANTS.Sparse,
}
SparseButton.argTypes = DefaultButton.argTypes
delete SparseButton.argTypes.variant

const storyMeta = {
  title: 'Atoms/Buttons',
}

export default storyMeta
