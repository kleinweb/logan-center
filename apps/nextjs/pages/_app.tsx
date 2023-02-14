// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import type { AppProps } from 'next/app'

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'

import Telemetry from '@/components/Telemetry'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useInternalLinkRouting()
  return (
    <>
      <Telemetry />
      <Component {...pageProps} />
    </>
  )
}
