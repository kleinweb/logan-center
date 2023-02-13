// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { ReactNode } from 'react'
import Head from 'next/head'

import { KleinBanner } from '@kleinweb/logan-center__ui'

import { SITE_NAME } from '@/lib/constants'

import Loading from '../Loading/Loading'
import Meta from '../Meta'
import SiteFooter from '../SiteFooter'
import SiteHeader from '../SiteHeader'

/**
 * A page component helps us to enforce consistent UI and SEO best practices
 * across the site.
 *
 * A loading state allows you to avoid rendering the children until the data
 * you need is ready.
 */

type LayoutProps = {
  children: ReactNode
  canonicalLink?: string
  feedLink?: string
  headerLink?: ReactNode
  loading?: boolean
  ogTitle?: string
  title: string
}

export default function Layout(props: LayoutProps) {
  const { loading = false } = props

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Head>
        {/* FIXME: should this title format be handled by the seo plugin instead? */}
        <title>{`${props.title} | ${SITE_NAME}`}</title>
        {props.ogTitle && <meta content={props.ogTitle} property="og:title" />}
        {props.canonicalLink && (
          <link href={props.canonicalLink} rel="canonical" />
        )}
        {props.feedLink && (
          <link
            href={props.feedLink}
            rel="alternate"
            title={props.title}
            type="application/rss+xml"
          />
        )}
      </Head>
      <Meta />
      <header className="flex flex-col">
        <div className="order-2 bg-slate-700 py-1 text-white lg:py-2">
          <SiteHeader />
          {/* TODO */}
          {/* <SiteHeader headerLink={props.headerLink} /> */}
        </div>
        <div className="order-1">
          <KleinBanner />
        </div>
      </header>
      <div className="min-h-screen">
        <main className="block">
          <h1 className={props.title == 'Home' && 'sr-only'}>{props.title}</h1>
          {props.children}
        </main>
      </div>
      <footer className="bg-slate-700 py-10 px-5 text-white md:pt-5">
        <SiteFooter />
      </footer>
    </>
  )
}
