// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'

import Layout from '@/components/Layout/Layout'
import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
import Container from '@/components/Container'
import Photo from '@/components/Photo'

const pageTitle = `Home | ${SITE_NAME}`

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <h1 className="sr-only">{pageTitle}</h1>

      <Photo
        path="ncm_williamdickschool-3.jpg"
        alt="An empty Philadelphia street near the William Dick School."
      />

      <Container>
        <div>
          Hello World. <Link href="/about">About</Link>
        </div>
      </Container>
    </Layout>
  )
}
