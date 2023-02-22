import type {Meta, StoryObj} from '@storybook/react'

import Podcast from '@pages/podcast'

const meta: Meta<typeof Podcast> = {
  title: 'Pages/Podcast',
  component: Podcast,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

// export const WithProp: Story = {
//   render: () => <MyComponent prop="value" />,
// };

export default meta
