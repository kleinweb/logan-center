// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

export const SITE_NAME = 'Logan Center for Urban Investigative Reporting'

/**
 * GraphQL server endpoint for this environment.
 *
 * While this is provided for convenience, we also assure TypeScript that
 * this will never be `undefined`. By default, any environment variable has the
 * type `string | undefined`.
 */
export const GRAPHQL_ENDPOINT = process.env
  .NEXT_PUBLIC_GRAPHQL_ENDPOINT as string
