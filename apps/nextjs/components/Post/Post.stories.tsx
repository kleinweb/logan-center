import {Meta, StoryObj} from '@storybook/react'
import Post from './Post'

const meta: Meta<typeof Post> = {
  title: 'Organisms/Post',
  component: Post,
  args: {
    post: {
      content: 'Post content here',
      title: 'Title of a Post or Page',
      excerpt: 'Post excerpt',
      slug: 'post-slug',
    },
  },
}

type PostStory = StoryObj<typeof meta>

export const Default: PostStory = {}
// export const Large: ParagraphBlockStory = {
//   render: () => <Paragraph {...args} />,
// }

export default meta
