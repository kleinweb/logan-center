// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import type {AppProps} from 'next/app'

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'

import Telemetry from '@/components/Telemetry'

import '@/styles/globals.css'
// import SiteSettingsProvider from '@/contexts/SiteSettings'
// import {PageProps} from '@/lib/types'
// import SiteMenusProvider from '@/contexts/SiteMenus'
// import {useSiteMenusQuery} from '@/graphql/generated'
import {ApolloProvider} from '@apollo/client'
import {addApolloState, initializeApollo, useApollo} from '@/lib/graphql'
import {SitewideDocument} from '@/gql/graphql'

export default function App({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps)
  // const {data} = pageProps as PageProps
  useInternalLinkRouting()
  return (
    <ApolloProvider client={apolloClient}>
      {/* <SiteSettingsProvider generalSettings={data.generalSettings}> */}
      {/* <SiteMenusProvider
        headerMenu={data?.headerMenu}
        // footerMenu={data?.footerMenu}
      > */}
      <Telemetry />
      <Component {...pageProps} />
      {/* </SiteMenusProvider> */}
      {/* </SiteSettingsProvider> */}
    </ApolloProvider>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: SitewideDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
    // FIXME: this is probably a bad idea value
    // revalidate: 1,
  })
}
