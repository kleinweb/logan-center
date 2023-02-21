// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import React from 'react'
import type {AppProps} from 'next/app'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

// helpers
import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import {SiteProps} from '@/lib/types'

// components
import Telemetry from '@/components/Telemetry'

// global styles (tailwindcss)
import '@/styles/globals.css'

export interface KleinAppProps extends AppProps {
  pageProps: SiteProps
}

export default function App({Component, pageProps}) {
  const [queryClient] = React.useState(() => new QueryClient())
  useInternalLinkRouting()
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Telemetry />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
