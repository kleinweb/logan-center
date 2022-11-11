// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import '../styles/globals.css'
import 'ui/styles.css'

import type { AppProps } from 'next/app'

import Telemetry from '@/components/Telemetry'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Telemetry />
      <Component {...pageProps} />
    </>
  )
}