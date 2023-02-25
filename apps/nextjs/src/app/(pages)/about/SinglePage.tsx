// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import Separator from '@atoms/Separator'
import PageHeader from '@organisms/Page/PageHeader'
import PostBody from '@organisms/PostBody'

export interface SinglePageProps {
  title: string
  content: string
}

export default function SinglePage({title, content}: SinglePageProps) {
  return (
    <>
      <article>
        <PageHeader title={title} />
        <PostBody content={content} />
      </article>
      <Separator />
    </>
  )
}