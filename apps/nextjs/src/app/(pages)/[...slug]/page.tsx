// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

// import {log} from '@/lib/log'
import getApolloClient from '@/lib/graphql/client'
import {
  // AllPagesPathsDocument,
  SinglePageDocument,
  SinglePageQuery,
} from '@/gql/graphql'

import PageHeader from '@organisms/Page/PageHeader'
import PostBody from '@organisms/PostBody'
import {notFound} from 'next/navigation'

export const metadata = {
  // FIXME: generate dynamically: <https://beta.nextjs.org/docs/api-reference/file-conventions/head#dynamic-metadata>
  title: 'About',
  // TODO
  // openGraph={{imageUrl: data?.post.featuredImage?.node.sourceUrl}}
}

// FIXME: "Error: Page changed from static to dynamic at runtime"
// export async function generateStaticParams() {
//   const allPages = await getApolloClient().query({query: AllPagesPathsDocument})
//   const allPagesSlugs = allPages.data.pages.edges.map(page => ({
//     slug: page.node.uri.split('/').filter(s => s !== ''),
//   }))
//   log('allPages', {
//     allPages: JSON.stringify(allPages),
//     slugs: JSON.stringify(allPagesSlugs),
//   })
//   return allPagesSlugs
// }

export default async function SinglePage({params}: {params: {slug: string[]}}) {
  const uri = '/' + params.slug.join('/')
  const {data} = await getApolloClient().query<SinglePageQuery>({
    query: SinglePageDocument,
    variables: {uri},
  })
  if (!data.page) {
    notFound()
  }
  // FIXME: seems fragments are broken here too, where they were previously working...
  const {title, content} = data.page
  return (
    <article>
      <PageHeader title={title} />
      <PostBody content={content} />
    </article>
  )
}
