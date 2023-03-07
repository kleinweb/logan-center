// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

import {TERM_SUMMARY_FIELDS} from '@/lib/graphql/fragments/terms'

export const THEMES_LANDING_PAGE = gql`
  query ThemesLandingPage {
    # - All top-level Categories
    # - Exclude "Uncategorized" Category tree
    themes: categories(where: {parent: 0, excludeTree: "1"}) {
      nodes {
        # databaseId
        # description
        # id
        # name
        # uri
        ${TERM_SUMMARY_FIELDS}
      }
    }

    # FIXME: this is not possible because of category base
    # so there needs to be another way to set description etc.
    # page(id: "/themes", idType: URI) {
    #   ...SinglePageFields
    # }
  }
`
