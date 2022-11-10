// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { PageSchema } from '@/lib/interfaces/post'
import Link from 'next/link'

const post: PageSchema = {
  slug: 'podcast',
  title: 'Podcast',
  // FIXME: what is this format?
  // coverImage: 'TODO',
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
      <div>
        Back to <Link href="/">Home</Link>
      </div>
      <Post post={post}>
        <p>Hello post</p>
      </Post>
    </Layout>
  )
}
