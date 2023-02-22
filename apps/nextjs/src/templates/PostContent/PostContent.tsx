// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {ContentBlock} from '@/gql/graphql'
import {mapAttributesToProps} from '@/lib/blocks'
import defaultBlockMap, {PostContentBlockMap} from '@organisms/Blocks'
import UnsupportedBlock from '@organisms/Blocks/UnsupportedBlock/UnsupportedBlock'
import Container from '../Container'

type PostContentProps = {
  /** Content blocks parsed from post content. */
  blocks: ContentBlock[]
  /** Overrides for {@link defaultBlockMap}. */
  blockMapOverrides?: PostContentBlockMap
}

/**
 * Higher-order component rendering a Block component for each of {@link blocks}.
 */
export default function PostContent({
  blocks,
  blockMapOverrides = {},
}: PostContentProps) {
  const blockMap: PostContentBlockMap = {
    ...defaultBlockMap,
    ...blockMapOverrides,
  }

  return (
    <Container>
      {blocks.map((block, i) => {
        const attributesProps = mapAttributesToProps(block.attributes)
        const key = `block-${i}`
        const Block = blockMap[block.name]

        if (Block) {
          // Type error due to slightly different props for image blocks, which
          // should be fine since it would be included in the props spread.
          // @ts-ignore
          return <Block block={block} key={key} {...attributesProps} />
        }

        // In development, highlight unsupported blocks so that they get
        // visibility with developers.
        if ('development' === process.env.NODE_ENV) {
          return <UnsupportedBlock block={block} key={key} />
        }

        // In production, ignore unsupported blocks.
        return null
      })}
    </Container>
  )
}
