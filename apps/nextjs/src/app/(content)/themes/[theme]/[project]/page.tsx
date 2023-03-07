// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import * as React from 'react'
import {
  CategoryByUriDocument,
  CategoryByUriQuery,
  ProjectDocument,
  ProjectQuery,
} from '@/gql/graphql'
import getApolloClient from '@/lib/graphql/client'
import {notFound} from 'next/navigation'
import {SingleThemePageProps} from '../page'

export type SingleProjectPageProps = SingleThemePageProps & {
  params: {project: string}
}

const fetchPageData = async (theme: string, slug: string) => {
  const baseUrl = `/themes/${theme}`
  const res = await getApolloClient().query<ProjectQuery>({
    query: ProjectDocument,
    variables: {id: `${baseUrl}/${slug}`},
  })
  return res
}

export default async function SingleProjectPage({
  params,
}: SingleProjectPageProps) {
  const {data} = await fetchPageData(params.theme, params.project)
  if (!data.category) {
    // TODO: recirc
    notFound()
  }
  const {name, description, ancestors} = data.category
  const theme = ancestors.edges[0]
  return (
    <React.Fragment>
      <h1>{name}</h1>
      {description && <p>{description}</p>}
      <p>
        It is a member of the Theme: <code>{theme.node.name}</code>
      </p>
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
