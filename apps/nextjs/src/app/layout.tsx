// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ORG_NAME, SITE_NAME, TU_NAME} from '@/lib/constants'

import SiteHeader from '@organisms/SiteHeader'
import {KleinBanner} from '@organisms/KleinBanner'
import SiteFooter from '@organisms/SiteFooter'

import {Providers} from './providers'

import '@/src/styles/globals.css'
import {styles} from '@molecules/utils'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="flex flex-col">
            <div className="order-2 bg-slate-700 py-1 text-white lg:py-2">
              <div className={styles.container}>
                <SiteHeader />
              </div>
            </div>
            <div className="order-1">
              <KleinBanner />
            </div>
          </header>
          <div className="min-h-screen">
            {/* <PreviewAlert preview={props.preview} /> */}
            <main className="block">{children}</main>
          </div>
          <footer className="bg-slate-700 py-10 px-5 text-white md:pt-5">
            <SiteFooter />
          </footer>
        </Providers>
      </body>
    </html>
  )
}

// <https://beta.nextjs.org/docs/api-reference/metadata>
export const metadata = {
  title: {
    default: 'Home',
    template: `%s | ${SITE_NAME}`,
  },
  // FIXME: use tagline or post seo data
  // description: SITE_NAME,
  publisher: ORG_NAME,

  icons: {
    icon: [
      {url: '/favicon.png'},
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
    ],
    apple: [{url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png'}],
  },

  // TODO: rss feeds... point to wordpress?
  // alternates: {
  //   types: {
  //     'application/rss+xml': 'https://nextjs.org/rss',
  //   },
  // },

  // TODO: get from seo plugin
  keywords: [
    TU_NAME,
    ORG_NAME,
    SITE_NAME,
    'Philadelphia',
    'journalism',
    'investigative journalism',
    'urban reporting',
    'non-profit',
  ],

  // FIXME: robots.txt
  // robots: {
  //   index: false,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: false,
  //     noimageindex: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },

  // FIXME
  // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],

  // referrer: 'origin-when-crossorigin',
  // creator: 'Jiachi Liu',
}
