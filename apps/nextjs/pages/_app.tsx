// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import '@/styles/index.css'

export default function App({ Component, pageProps }) {
  useInternalLinkRouting()

  return <Component {...pageProps} />
}
