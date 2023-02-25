// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {Meta, StoryObj} from '@storybook/react'

import PageTitle from './PageTitle'

const meta: Meta<typeof PageTitle> = {
  title: 'Molecules/PageTitle',
  component: PageTitle,
}

export default meta

export const DefaultPageTitle: StoryObj<typeof PageTitle> = {
  args: {children: 'About the Logan Center'},
}
