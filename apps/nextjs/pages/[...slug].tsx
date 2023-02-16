// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'
import PostContent from '@/components/PostContent/PostContent'
import getApolloClient from '@/graphql/apollo'
import {
  ContentNodeBySlugDocument,
  ContentNodeBySlugQuery,
  ContentNodeFieldsFragment,
} from '@/graphql/generated'
import { extractLastTokenFromRoute, getInternalLinkPathname } from '@/lib/links'
import Container from '@/components/Container'

export type PostProps = {
  loading: boolean
  post: ContentNodeFieldsFragment
}

import BarsMotif from '@/public/assets/decorations/motif--island.svg'

export default function Post(props: PostProps) {
  if ('MediaItem' === props.post.__typename) {
    return null
  }

  return (
    <Layout loading={props.loading} title={props.post.title}>
      <section className="bg-primary-light mt-20 py-6 pb-20">
        <Container>
          <div className="text-primary-accent relative -mt-24 flex flex-row-reverse py-8">
            <BarsMotif />
          </div>

          <div className="space-y-5">
            <PostContent blocks={props.post.contentBlocks.blocks} />
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (
  context,
) => {
  const queryOptions = {
    query: ContentNodeBySlugDocument,
    variables: {
      slug: extractLastTokenFromRoute(context.query.slug),
    },
  }

  const { data, loading } = await getApolloClient(
    context,
  ).query<ContentNodeBySlugQuery>(queryOptions)

  // TODO: Disambiguate multiple slug matches.
  const post = data.contentNodes?.nodes?.[0]

  // SEO: Resource not found pages must send a 404 response code.
  if (!loading && !post) {
    return {
      notFound: true,
    }
  }

  // SEO: Redirect to canonical URL.
  const internalLinkPathname = getInternalLinkPathname(post.link)
  const resolvedUrlWithoutQueryString = context.resolvedUrl.split('?')[0]
  if (!loading && internalLinkPathname !== resolvedUrlWithoutQueryString) {
    return {
      redirect: {
        destination: internalLinkPathname || post.link,
        permanent: false,
      },
    }
  }

  return {
    props: {
      loading,
      post,
    },
  }
}
