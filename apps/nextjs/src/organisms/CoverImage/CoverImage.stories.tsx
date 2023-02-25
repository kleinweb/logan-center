import {Meta, StoryObj} from '@storybook/react'

import CoverImage from './CoverImage'
// import Fallback from './CoverImageFallback'

const meta: Meta<typeof CoverImage> = {
  component: CoverImage,
  args: {
    src: 'https://via.placeholder.com/1920x1080',
  },
}

export default meta

export const DefaultCoverImage: StoryObj<typeof CoverImage> = {}
// TODO: handle multiple stories / related components
// export const Fallback: StoryObj<typeof Fallback> = {}

// export const WithFallback: StoryObj<typeof CoverImage> = {
//   args: {src: ''},
// }
