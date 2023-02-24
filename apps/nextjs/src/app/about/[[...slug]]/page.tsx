// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug()
  return allPosts.map(post => ({slug: post.slug}))
}

export const metadata = {
  title: 'About',
  // TODO
  // openGraph={{imageUrl: data?.post.featuredImage?.node.sourceUrl}}
}

import Separator from '@atoms/Separator'
// import {PageTitle} from '@molecules/PageTitle'
import PageHeader from '@organisms/Page/Header'
import PostBody from '@organisms/PostBody'

import Layout from '@templates/Layout'
import Container from '@templates/Container'

// import {SinglePage} from '@/src/contexts'

export default async function Page({params}) {
  // const queryClient = getQueryClient()
  // await queryClient.prefetchQuery(['posts'], getPosts)

  return (
    <Layout
      title={post?.title}
      // preview={preview}
    >
      <Container>
        <article>
          <PageHeader title={post.title} />
          <PostBody content={post.content} />
        </article>
        <Separator />
      </Container>
    </Layout>
  )
}
