// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import Separator from '@atoms/Separator'
import PageHeader from '@organisms/Page/Header'
import PostBody from '@organisms/PostBody'
import Container from '@templates/Container'

export interface SinglePageProps {
  title: string
  content: string
}

export default function SinglePage({title, content}: SinglePageProps) {
  return (
    <Container>
      <article>
        <PageHeader title={title} />
        <PostBody content={content} />
      </article>
      <Separator />
    </Container>
  )
}
