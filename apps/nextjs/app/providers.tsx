'use client'

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import Telemetry from '@/components/Telemetry'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

export function Providers({children}) {
  const [queryClient] = React.useState(() => new QueryClient())
  useInternalLinkRouting()
  return (
    <QueryClientProvider client={queryClient}>
      {/* FIXME: continue following migration guide... <https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app> */}
      <Hydrate state={pageProps.dehydratedState}>
        <Telemetry />
        {children}
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
