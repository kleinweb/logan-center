// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import {
  // addApolloState,
  // initializeApollo,
  useApollo,
} from '@/lib/graphql'

import Telemetry from '@components/Telemetry'

import '@/src/styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps)
  useInternalLinkRouting()
  return (
    <ApolloProvider client={apolloClient}>
      <Telemetry />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo()
//   await apolloClient.query({
//     query: SitewideDocument,
//   })

//   return addApolloState(apolloClient, {
//     props: {},
//     // FIXME: this is probably a bad idea value
//     // revalidate: 1,
//   })
// }
