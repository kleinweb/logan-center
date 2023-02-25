// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import React from 'react'
import {ApolloProvider} from '@apollo/client'
import {client} from '@/lib/graphql/client'

// import Telemetry from './client-telemetry'

export function Providers({children}) {
  return (
    <ApolloProvider client={client}>
      {/* <Telemetry /> */}
      {children}
    </ApolloProvider>
  )
}
