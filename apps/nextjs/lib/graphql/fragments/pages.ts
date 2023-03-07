// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const SINGLE_PAGE_FIELDS = gql`
  fragment SinglePageFields on Page {
    title(format: RENDERED)
    databaseId
    uri
    content(format: RENDERED)
    editorBlocks {
      apiVersion
      name
      parentId
      renderedHtml
    }
  }
`
