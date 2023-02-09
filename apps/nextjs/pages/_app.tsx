// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2022-2023 Greg Rickaby
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useState } from 'react'

import Telemetry from '@/components/Telemetry'
import WordPressProvider from '@/contexts/WordPressProvider'
import { client } from '@/lib/helpers'
import { PageProps } from '@/lib/types'

import '@kleinweb/logan-center__ui/styles.css'
import '../styles/globals.css'

/**
 * Custom App component.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://mantine.dev/guides/next/
 * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
 */
export default function App({ Component, pageProps }: AppProps) {
  const { data } = pageProps as PageProps
  const [headerMenu] = useState(data?.headerMenu)
  const [footerMenu] = useState(data?.footerMenu)
  const [generalSettings] = useState(data?.generalSettings)

  return (
    <ApolloProvider client={client}>
      <WordPressProvider
        headerMenu={headerMenu}
        footerMenu={footerMenu}
        generalSettings={generalSettings}
      >
        <Telemetry />
        <Component {...pageProps} />
      </WordPressProvider>
    </ApolloProvider>
  )
}
