import {ORG_NAME, SITE_NAME} from '@/lib/constants'

// global styles (tailwindcss)
import '@/styles/globals.css'

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
    // TODO: necessary?
    // shortcut: '/shortcut-icon.png',
    apple: [{url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png'}],
  },

  // TODO: rss feeds
  // alternates: {
  //   types: {
  //     'application/rss+xml': 'https://nextjs.org/rss',
  //   },
  // },

  // TODO
  // keywords: ['Next.js', 'React', 'JavaScript'],

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

  // generator: 'Next.js',
  // applicationName: 'Next.js',
  // referrer: 'origin-when-crossorigin',
  // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  // themeColor: 'tomato',
  // colorScheme: 'dark',
  // creator: 'Jiachi Liu',
  // formatDetection: {
  //   email: 'no',
  //   address: 'no',
  //   telephone: 'no',
  // },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
