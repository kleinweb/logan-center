// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Head from 'next/head'

import {SITE_NAME} from '@/lib/constants'

import Favicons from './Favicons'

export type OpenGraphMeta = {
  title?: string
  imageUrl?: string
}

export type HeadMetaProps = {
  title: string
  description?: string
  canonicalUrl?: string
  // TODO: probably needs to be mergeable
  openGraph?: OpenGraphMeta
  feedUrl?: string
}

// FIXME: determine programmatic fallback values
const Meta = ({
  title,
  description,
  canonicalUrl,
  feedUrl,
  openGraph: og,
}: HeadMetaProps) => {
  return (
    <Head>
      <Favicons />

      <title>{`${title ? `${title} |` : ''} ${SITE_NAME}`}</title>

      {description ? (
        <meta name="description" content={description} />
      ) : undefined}

      {og?.title ? <meta content={og.title} property="og:title" /> : undefined}
      {og?.imageUrl ? (
        <meta content={og.imageUrl} property="og:image" />
      ) : undefined}

      {canonicalUrl ? <link href={canonicalUrl} rel="canonical" /> : undefined}

      {feedUrl ? (
        <link rel="alternate" type="application/rss+xml" href={feedUrl} />
      ) : undefined}
    </Head>
  )
}

export default Meta
