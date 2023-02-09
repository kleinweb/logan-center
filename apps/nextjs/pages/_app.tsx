// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import Telemetry from '@/components/Telemetry'

import '@kleinweb/logan-center__ui/styles.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  useInternalLinkRouting()

  return (
    <>
      <Telemetry />
      <Component {...pageProps} />
    </>
  )
}
