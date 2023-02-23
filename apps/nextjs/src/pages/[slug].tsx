// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import {GetStaticPaths, GetStaticProps} from 'next'

// import {getAllPostsWithSlug, getPostAndMorePosts} from '@/lib/content'

import Meta from '@components/Meta'

import Separator from '@atoms/Separator'
import {PageTitle} from '@molecules/PageTitle'
import PageHeader from '@organisms/Page/Header'
import PostBody from '@organisms/PostBody'

import Layout from '@templates/Layout'
import Container from '@templates/Container'
import {getAllPostsWithSlug, getPostAndMorePosts} from '@/lib/content'
import MoreStories from '@organisms/MoreStories'

export default function SinglePage({data}) {
  const router = useRouter()
  const {post, morePosts} = data

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout
      title={data?.post?.title}
      // preview={preview}
    >
      <Container>
        {router.isFallback ? (
          // FIXME: should be less prominent than a full title
          <PageTitle>Loading…</PageTitle>
        ) : (
          <>
            <article>
              <Meta
                title={data?.post.title}
                openGraph={{imageUrl: data?.post.featuredImage?.node.sourceUrl}}
              />
              <PageHeader title={data?.post.title} />
              <PostBody content={data?.post.content} />
            </article>

            <Separator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    // FIXME: set this to a global default -- netlify requires a minimum value of 60 (1 hour)
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({node}) => `/posts/${node.slug}`) || [],
    fallback: 'blocking',
  }
}
