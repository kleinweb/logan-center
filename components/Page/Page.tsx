// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'
import Head from 'next/head'
import Loading from '@/components/Loading/Loading'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import SiteHeader from '@/components/SiteHeader/SiteHeader'

/**
 * A page component helps us to enforce consistent UI and SEO best practices
 * across the site.
 *
 * A loading state allows you to avoid rendering the children until the data
 * you need is ready.
 */

type Props = {
  children: ReactNode
  canonicalLink?: string
  feedLink?: string
  headerLink?: ReactNode
  loading?: boolean
  ogTitle?: string
  title: string
}

export default function Page(props: Props) {
  const { loading = false } = props

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>{props.title}</title>
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
        <link rel="stylesheet" href="https://use.typekit.net/cwz8dss.css" />
      </Head>
      <header className="bg-slate-700 px-5 py-3 text-white md:pt-5">
        <SiteHeader headerLink={props.headerLink} />
      </header>
      <hr />
      <main className="block">
        <div className="px-3">
          <h1>{props.title}</h1>
          {props.children}
        </div>
      </main>
      <hr />
      <footer className="bg-slate-700  p-10 text-white md:pt-5">
        <SiteFooter />
      </footer>
    </>
  )
}
