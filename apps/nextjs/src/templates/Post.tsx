// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ReactNode} from 'react'
import Head from 'next/head'

import {SITE_NAME} from '@/lib/constants'
import {PageSchema} from '@/lib/post'

import PostHeader from '@organisms/PostHeader'
import PostBody from '@organisms/PostBody'

type Props = {
  post: PageSchema
  children?: ReactNode
}

export default function Post({post, children}: Props) {
  return (
    <article className="mb-32">
      <Head>
        <title>
          {post.title} | {SITE_NAME}
        </title>
        {post.ogImage ? (
          <meta property="og:image" content={post.ogImage.url} />
        ) : undefined}
      </Head>
      <PostHeader title={post.title} coverImage={post.coverImage} />
      {post.content ? (
        <PostBody content={post.content} />
      ) : (
        <PostBody>{children}</PostBody>
      )}
    </article>
  )
}
