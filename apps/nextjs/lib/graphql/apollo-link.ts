// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ApolloLink, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import {log, logError} from '@/lib/log'

const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

export default function getApolloLink() {
  // If endpoint is undefined, throw for visibility.
  if ('undefined' === typeof uri) {
    throw new Error('GraphQL endpoint is undefined')
  }

  return from([
    // Error link to log GraphQL errors.
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(err => {
          const {locations, path} = err
          const context = {
            locations: JSON.stringify(locations),
            path: JSON.stringify(path),
          }

          logError(err, context)
        })
      }

      if (networkError) {
        logError(networkError, {})
      }
    }),

    // Custom ApolloLink to log successful queries for debugging.
    new ApolloLink((operation, forward) => {
      const {operationName, setContext, variables} = operation

      const debug = {
        operationName,
        variables: JSON.stringify(variables),
      }

      const startTime = Date.now()

      setContext(({headers = {}}) => ({
        headers: {
          ...headers,
          // Here is where you can set custom request headers for your GraphQL
          // requests. If the request is client-side, it must be allowed by the
          // CORS policy in WPGraphQL.
        },
      }))

      return forward(operation).map(data => {
        const response = operation.getContext().response
        const context = {
          ...debug,
          cacheStatus: response?.headers?.get('x-cache'),
          cacheAge: response?.headers?.get('age'),
          credentials: 'include',
          payloadSize: response?.body?.bytesWritten,
          requestDurationInMs: Date.now() - startTime,
        }

        log('GraphQL request', context)

        return data
      })
    }),

    // Standard HttpLink to connect to GraphQL.
    new HttpLink({uri}),
  ])
}
