// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Story } from '@ladle/react'
import { Button, COLORS, Props } from '@/components/Buttons'

const defaultArgs = {
  children: 'Default',
}

const defaultArgTypes = {
  color: {
    options: Object.values(COLORS),
    control: { type: 'radio' },
    defaultValue: COLORS.Slate,
  },
  fill: {
    options: [...Object.values(COLORS), 'white'],
    control: { type: 'radio' },
    defaultValue: COLORS.Slate,
  },
  border: {
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

export const SparseButton = Template.bind({})
SparseButton.args = {
  ...DefaultButton.args,
  children: 'Sparse Button',
  fill: 'white',
}
SparseButton.argTypes = {
  ...DefaultButton.argTypes,
  border: { ...DefaultButton.argTypes.border, defaultValue: 'slate' },
}
delete SparseButton.argTypes.fill

const storyMeta = {
  title: 'Atoms/Buttons',
}

export default storyMeta
