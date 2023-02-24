// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Separator from '@atoms/Separator'
// import {PageTitle} from '@molecules/PageTitle'
import PageHeader from '@organisms/Page/Header'
import PostBody from '@organisms/PostBody'

import Layout from '@templates/Layout'
import Container from '@templates/Container'
import {client} from '@/lib/graphql/client'
import {SinglePageDocument, SinglePageQuery} from '@/gql/graphql'

export const metadata = {
  title: 'About',
  // TODO
  // openGraph={{imageUrl: data?.post.featuredImage?.node.sourceUrl}}
}

// export async function generateStaticParams() {
//   const allPages = await client.query({query: AllPagesPathsDocument})
//   return allPages.data.pages.edges.map(page => ({
//     slug: page.node.uri.split('/').slice(2),
//   }))
// }

export default async function Page() {
  const {data} = await client.query<SinglePageQuery>({
    query: SinglePageDocument,
    // variables: {uri: params?.slug?.toString()},
    variables: {uri: '/about'},
  })
  console.log(data)

  const {title, content} = data.page
  return (
    <Layout
      title={title}
      // preview={preview}
    >
      <Container>
        <article>
          <PageHeader title={title} />
          <PostBody content={content} />
        </article>
        <Separator />
      </Container>
    </Layout>
  )
}
