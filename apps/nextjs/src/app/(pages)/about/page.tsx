// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {client} from '@/lib/graphql/client'
import {SinglePageDocument, SinglePageQuery} from '@/gql/graphql'

import SinglePage from './SinglePage'

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

export default async function AboutPage() {
  const {data} = await client.query<SinglePageQuery>({
    query: SinglePageDocument,
    // variables: {uri: params?.slug?.toString()},
    variables: {uri: '/about'},
  })
  return <SinglePage title={data.page.title} content={data.page.content} />
}
