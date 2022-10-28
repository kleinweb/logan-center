// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { render, screen } from '@testing-library/react'
import Quote from './Quote'

describe('Quote', () => {
  const text =
    'How can you wonder your travels do you no good, when you carry yourself around with you?'
  const block = {
    innerHTML: `<p>${text}</p><cite>Socrates</cite>`,
  }

  /**
   * <blockquote> does not have an implicit ARIA role that we can pass to
   * `getByRole`, so we need to be a little creative to get the top-level
   * rendered element.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
   */

  it('renders a blockquote with the expected HTML', () => {
    render(<Quote block={block} />)

    const quote = screen.getByText(text)

    expect(quote).toBeInTheDocument()
    expect(quote.parentElement.getAttribute('class')).toEqual('container')
  })

  it('renders a "large" quote via a className prop provided by Gutenberg', () => {
    // See notes in component file for full explanation.
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(
      <Quote
        block={block}
        className="is-style-large"
      />,
    )

    const quote = screen.getByText(text)

    expect(quote).toBeInTheDocument()
    expect(quote.parentElement.getAttribute('class')).toEqual('container large')
  })
})
