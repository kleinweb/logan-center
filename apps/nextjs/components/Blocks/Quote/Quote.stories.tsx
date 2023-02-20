import {Meta, StoryObj} from '@storybook/react'

import Quote, {QuoteProps} from './Quote'

const innerHTML = `
  <p>Before software can be reusable, it first has to be usable.</p>
  <cite>Ralph Johnson</cite>
`

const args = {
  block: {
    innerHTML,
  },
  className: 'string',
} as QuoteProps

const meta: Meta<typeof Quote> = {
  title: 'Blocks/Quote',
  component: Quote,
  args,
}

type QuoteStory = StoryObj<typeof meta>

export const Default: QuoteStory = {}
export const Large: QuoteStory = {
  render: () => <Quote {...args} className="is-style-large" />,
}

export default meta
