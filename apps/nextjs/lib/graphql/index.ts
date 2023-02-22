// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

///: <https://github.com/vercel/next.js/blob/cb03a79968c3703e65fecc015443999dc0146f1c/examples/with-apollo/lib/apolloClient.js>

// FIXME: log properly
/* eslint-disable no-console */

import {useMemo} from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  OperationVariables,
} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import {concatPagination} from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import {TypedQueryDocumentNode} from 'graphql'
import wpConfig from '@/wp.config'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ReturnType<typeof createApolloClient>

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: wpConfig.endpoints.graphql,
  // FIXME: somethings?
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`
  // credentials: 'omit', // Additional fetch() options like `credentials` or `headers`
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = undefined) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export async function fetchStaticQuery(
  query: TypedQueryDocumentNode,
  clientArgs: OperationVariables,
  pageProps = {},
) {
  const apolloClient = initializeApollo()
  const {data} = await apolloClient.query({
    query,
    ...clientArgs,
  })
  return addApolloState(apolloClient, {
    props: {data, ...pageProps},
  })
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
