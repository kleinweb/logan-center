// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import PostHeader from '@/components/Post/PostHeader'
import { SITE_NAME } from '@/lib/constants'
import PostType from '@/lib/interfaces/post'
import Link from 'next/link'

const post: PostType = {
  slug: 'podcast',
  title: 'Podcast',
  // FIXME: what is this format?
  coverImage: 'TODO',
  // HACK: manually specify children
  content: '',
  excerpt: 'The Logan Center podcast in coordination with WHYY',
  ogImage: {
    // FIXME
    url: '',
  },
}

export default function Podcast() {
  return (
    <Layout>
      <PostHeader title={SITE_NAME} coverImage={post.coverImage} />
      <div>
        Back to <Link href="/">Home</Link>
      </div>
      <Post post={post}>
        <p>Hello post</p>
      </Post>
    </Layout>
  )
}
