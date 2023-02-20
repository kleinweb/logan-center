import type {Meta, StoryObj} from '@storybook/react'

import AboutPage from './AboutPage'

const meta: Meta<typeof AboutPage> = {
  title: 'Pages/About',
  component: AboutPage,
}

export default meta

export const Default: AboutPageStory = {}

export type AboutPageStory = StoryObj<typeof AboutPage>
