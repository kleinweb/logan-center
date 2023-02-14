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

export default function App({ Component, pageProps }: AppProps) {
  const { data } = pageProps as PageProps
  // FIXME: is this necessary?
  // const [headerMenu] = useState(data?.headerMenu)
  // const [footerMenu] = useState(data?.footerMenu)
  // const [generalSettings] = useState(data?.generalSettings)
  useInternalLinkRouting()
  return (
    <>
      <SiteSettingsProvider generalSettings={data.generalSettings}>
        <SiteMenusProvider
          headerMenu={data.headerMenu}
          footerMenu={data?.footerMenu}
        >
          <Telemetry />
          <Component {...pageProps} />
        </SiteMenusProvider>
      </SiteSettingsProvider>
    </>
  )
}
