// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ReactNode} from 'react'

import {KleinBanner} from '@organisms/KleinBanner'

import SiteFooter from '@organisms/SiteFooter'
import SiteHeader from '@organisms/SiteHeader'
import {PreviewAlert} from '@organisms/Alert'

/**
 * A page component helps us to enforce consistent UI and SEO best practices
 * across the site.
 *
 * A loading state allows you to avoid rendering the children until the data
 * you need is ready.
 */

type LayoutProps = {
  title: string
  children: ReactNode
  loading?: boolean
  ogTitle?: string
  preview?: boolean
  // canonicalLink?: string
  // feedLink?: string
  // headerLink?: ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      {/* // FIXME: determine programmatic fallback values */}
      {/* <Meta title={props.title} feedUrl="/feed.xml" /> */}

      <header className="flex flex-col">
        <div className="order-2 bg-slate-700 py-1 text-white lg:py-2">
          <SiteHeader />
        </div>
        <div className="order-1">
          <KleinBanner />
        </div>
      </header>

      <div className="min-h-screen">
        <PreviewAlert preview={props.preview} />
        <main className="block">
          {/* FIXME */}
          {/* <h1 className={clsx(props.title == 'Home' && 'sr-only')}>
            {props.title}
          </h1> */}
          {props.children}
        </main>
      </div>

      <footer className="bg-slate-700 py-10 px-5 text-white md:pt-5">
        <SiteFooter />
      </footer>
    </>
  )
}
