// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import React from 'react'
import Head from 'next/head'
import {ApolloProvider} from '@apollo/client'
import {client} from '@/lib/graphql/client'

// import Telemetry from './client-telemetry'
import DefaultTags from './default-tags'

export function Providers({children}) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <DefaultTags />
      </Head>
      {/* <Telemetry /> */}
      {children}
    </ApolloProvider>
  )
}
