// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const ALL_PAGES = gql`
  query AllPages {
    pages {
      nodes {
        uri
      }
    }
  }
`

export const SINGLE_PAGE = gql`
  query SinglePage($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...SinglePageFields
    }
  }
`
