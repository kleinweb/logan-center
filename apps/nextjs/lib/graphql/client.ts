// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ApolloClient, InMemoryCache} from '@apollo/client'
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPageContext,
} from 'next'

import getApolloLink from './apollo-link'

export type ServerSideContext =
  | NextPageContext
  | GetServerSidePropsContext
  | GetStaticPropsContext

const isServerMode = 'undefined' === typeof window

let clientSideApolloClient: ApolloClient<unknown>

/**
 * Server-side / static, Apollo client should be recreated for each request so
 * that the in-memory cache is not shared across requests.
 *
 * Client-side, Apollo client should be reused to benefit from the cache.
 *
 * This function detects whether it is being called in a server or browser
 * environment and returns a new instance or a shared instance saved in-memory.
 *
 * tl;dr: Just call this function whenever you need an Apollo client. :)
 *
 * If you are using this function inside `getServerSideProps`, pass the provided
 * context as the first parameter for additional detail in your logging. (Since
 * `getStaticProps` is run at build time, its context is not useful.)
 */
export default function getApolloClient() {
  // Server-side / static: Return a new instance every time.
  if (isServerMode) {
    return new ApolloClient({
      // TODO: cache: new InMemoryCache({possibleTypes}),
      cache: new InMemoryCache(),
      link: getApolloLink(),
      ssrMode: isServerMode,
    })
  }

  // Client-side: Create and store a single instance if it doesn't yet exist.
  if ('undefined' === typeof clientSideApolloClient) {
    clientSideApolloClient = new ApolloClient({
      // TODO: cache: new InMemoryCache({possibleTypes}),
      cache: new InMemoryCache(),
      link: getApolloLink(),
    })
  }

  return clientSideApolloClient
}
