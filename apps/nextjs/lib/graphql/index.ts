import request from 'graphql-request'
import {GRAPHQL_ENDPOINT} from '../constants'

const fetchGraphQuery = query => request(GRAPHQL_ENDPOINT, query)

export {
  fetchGraphQuery,
  // Alias for easier usage with SWRConfig.
  fetchGraphQuery as fetcher,
}
