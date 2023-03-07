// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const TERM_SUMMARY_FIELDS = gql`
  fragment TermSummary on TermNode {
    databaseId
    description
    id
    name
    uri
  }
`
