// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {CategoryByUriDocument, CategoryByUriQuery} from '@/gql/graphql'
import getApolloClient from '@/lib/graphql/client'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import * as React from 'react'

export type SingleThemePageProps = {
  params: {
    theme: string
  }
}

const fetchPageData = async (slug: string) => {
  const baseUrl = '/themes'
  const res = await getApolloClient().query<CategoryByUriQuery>({
    query: CategoryByUriDocument,
    variables: {id: `${baseUrl}/${slug}`},
  })
  return res
}

export async function generateMetadata({
  params,
}: SingleThemePageProps): Promise<Metadata> {
  const {data} = await fetchPageData(params.theme)
  return {
    title: data.category.name,
  }
}

export default async function SingleThemePage({params}: SingleThemePageProps) {
  const {data} = await fetchPageData(params.theme)
  if (!data.category) {
    // TODO: something more sensible?
    notFound()
  }
  const {name, description} = data.category
  return (
    <React.Fragment>
      <h1>{name}</h1>
      {description && <p>{description}</p>}
    </React.Fragment>
  )
}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }
