// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Favicons from '@/components/Meta/Favicons'
import { Head, Html, Main, NextScript } from 'next/document'

/**
 * Document component.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-document
 * @see https://mantine.dev/guides/next/
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link
          rel="preconnect"
          href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`}
        />
        <link
          rel="dns-prefetch"
          href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`}
        />

        <link rel="stylesheet" href="https://use.typekit.net/cwz8dss.css" />

        <Favicons />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
