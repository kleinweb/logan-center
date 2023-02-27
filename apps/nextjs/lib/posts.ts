// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {AllPagesPathsDocument, AllPagesPathsQuery} from '@/gql/graphql'
import getApolloClient from './graphql/client'

export const getAllPagesPaths = async () => {
  const res = await getApolloClient().query<AllPagesPathsQuery>({
    query: AllPagesPathsDocument,
  })
  return res
}
