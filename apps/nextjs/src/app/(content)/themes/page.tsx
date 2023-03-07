// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import * as React from 'react'
import {ThemesLandingPageDocument, ThemesLandingPageQuery} from '@/gql/graphql'
import getApolloClient from '@/lib/graphql/client'
import {notFound} from 'next/navigation'
import Link from 'next/link'

export default async function ThemesLandingPage() {
  const {data} = await getApolloClient().query<ThemesLandingPageQuery>({
    query: ThemesLandingPageDocument,
  })
  const themes = data?.themes?.nodes
  if (!themes) {
    // TODO: error? we need these
    notFound()
  }
  return (
    <React.Fragment>
      <section>
        <ul>
          {/* FIXME: need to be able to customize this -- should really be controleld by a Page */}
          <h1>Themes of Coverage</h1>
          {themes.map(theme => {
            return (
              <li key={theme.id}>
                <article>
                  <Link href={theme.uri}>
                    <h2>{theme.name}</h2>
                    <p>{theme.description}</p>

                    {/* FIXME: needs images */}
                    {/* <figure> <figcaption> </figcaption> </figure> */}
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
      </section>
    </React.Fragment>
  )
  // return <p>This is the landing page for all Reporting Themes.</p>
}
