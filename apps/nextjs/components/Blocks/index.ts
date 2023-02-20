// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {ComponentType} from 'react'
import {ContentBlock} from '@/gql/graphql'
import ClassicEditorBlock from './ClassicEditorBlock/ClassicEditorBlock'
import Heading from './Heading/Heading'
import ImageBlock, {IImageBlockProps} from './ImageBlock/ImageBlock'
import List from './List/List'
import Paragraph from './Paragraph/Paragraph'
import Quote from './Quote/Quote'
import Table from './Table/Table'

export interface BlockProps {
  block: ContentBlock
}

export type PostContentBlockMap = {
  [key: string]: ComponentType<BlockProps> | ComponentType<IImageBlockProps>
}

const defaultBlockMap: PostContentBlockMap = {
  'core/classic-editor': ClassicEditorBlock,
  'core/heading': Heading,
  'core/image': ImageBlock,
  'core/list': List,
  'core/paragraph': Paragraph,
  'core/quote': Quote,
  'core/table': Table,
}

export default defaultBlockMap
