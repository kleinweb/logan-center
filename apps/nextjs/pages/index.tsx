// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { GetStaticProps } from 'next'
import Link from 'next/link'
import Card from '@/components/Card/Card'
import Page from '@/components/Page/Page'
import getApolloClient from '@/graphql/apollo'
import {
  AllContentTypesDocument,
  AllContentTypesQuery,
  ContentTypeFieldsFragment,
} from '@/graphql/generated'
import Layout from '@/components/Layout'

type Props = {
  contentTypes: ContentTypeFieldsFragment[]
}

export default function Home(props: Props) {
  return (
    <Layout>
      <Page title="Welcome 👋"></Page>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const queryOptions = {
    query: AllContentTypesDocument,
  }

  const { data } = await getApolloClient(context).query<AllContentTypesQuery>(
    queryOptions,
  )

  const contentTypes = data.contentTypes.nodes || []

  return {
    props: {
      contentTypes: contentTypes.filter(
        (contentType) => contentType.contentNodes.nodes.length,
      ),
    },
  }
}
