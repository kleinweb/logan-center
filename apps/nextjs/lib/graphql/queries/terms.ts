// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const CATEGORY_BY_URI = gql`
  query CategoryByUri($id: ID!) {
    category(id: $id, idType: URI) {
      description
      databaseId
      name
      slug
    }
  }
`
