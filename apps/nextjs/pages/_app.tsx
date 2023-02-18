// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import type { AppProps } from 'next/app'

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'

import Telemetry from '@/components/Telemetry'

import '@/styles/globals.css'
import SiteSettingsProvider from '@/contexts/SiteSettings'
import { PageProps } from '@/lib/types'
// import { useState } from 'react'
import SiteMenusProvider from '@/contexts/SiteMenus'
import { useSiteMenusQuery } from '@/graphql/generated'

export default function App({ Component, pageProps }: AppProps) {
  const { data } = pageProps as PageProps
  useInternalLinkRouting()
  return (
    <>
      {/* <SiteSettingsProvider generalSettings={data.generalSettings}> */}
      <SiteMenusProvider
        headerMenu={data?.headerMenu}
        // footerMenu={data?.footerMenu}
      >
        <Telemetry />
        <Component {...pageProps} />
      </SiteMenusProvider>
      {/* </SiteSettingsProvider> */}
    </>
  )
}
