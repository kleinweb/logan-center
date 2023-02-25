// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ApolloClient, InMemoryCache} from '@apollo/client'
import {GRAPHQL_ENDPOINT} from '../constants'

/**
 * The WordPress connector for Apollo Client.
 *
 * @see https://www.npmjs.com/package/apollo-client
 */
export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  // TODO:
  // cache: new InMemoryCache({possibleTypes}),
  cache: new InMemoryCache(),
  ssrMode: 'undefined' === typeof window,
  credentials: 'include',
})
