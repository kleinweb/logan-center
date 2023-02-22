import {Meta, StoryObj} from '@storybook/react'

import PageTitle from './PageTitle'

export default {
  title: 'Molecules/PageTitle',
  component: PageTitle,
} as Meta<typeof PageTitle>

export const DefaultPageTitle: StoryObj<typeof PageTitle> = {
  args: {children: 'About the Logan Center'},
}
