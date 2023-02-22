import {Meta, StoryObj} from '@storybook/react'

import CoverImage from './CoverImage'

export default {
  title: 'Molecules/Page Cover Image',
  component: CoverImage,
  args: {
    src: 'https://via.placeholder.com/1920x1080',
  },
} as Meta<typeof CoverImage>

export const DefaultCoverImage: StoryObj<typeof CoverImage> = {}
// export const WithFallback: StoryObj<typeof CoverImage> = {
//   args: {src: ''},
// }
