// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ORG_NAME, SITE_NAME, TU_NAME} from '@/lib/constants'

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
