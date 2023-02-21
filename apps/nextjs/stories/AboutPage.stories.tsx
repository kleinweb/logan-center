import type {Meta, StoryObj} from '@storybook/react'

import AboutPage from '@pages/About/AboutPage'

const meta: Meta<typeof AboutPage> = {
  title: 'Pages/About',
  component: AboutPage,
}

export default meta

export const Default: AboutPageStory = {}

export type AboutPageStory = StoryObj<typeof AboutPage>
