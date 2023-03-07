// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const PROJECT_SUMMARY = gql`
  query ProjectSummary($id: ID!) {
    category(id: $id, idType: URI) {
      description
      databaseId
      name
      slug
      ancestors {
        edges {
          node {
            slug
            name
            link
            uri
            databaseId
            description
          }
        }
      }
      parentDatabaseId
      uri
      posts {
        edges {
          node {
            authors {
              edges {
                node {
                  databaseId
                  description
                  email
                  firstName
                  lastName
                  nickname
                  nicename
                  name
                  slug
                  uri
                }
              }
            }
            dateGmt
            excerpt
            featuredImage {
              node {
                altText
                sizes(size: POST_THUMBNAIL)
              }
            }
            slug
            title(format: RENDERED)
            uri
          }
        }
      }
    }
  }
`
