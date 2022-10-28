// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import '@/styles/index.css'

export default function App({ Component, pageProps }) {
  useInternalLinkRouting()

  return <Component {...pageProps} />
}
