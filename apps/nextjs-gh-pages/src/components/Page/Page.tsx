// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'
import Head from 'next/head'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import SiteHeader from '@/components/SiteHeader/SiteHeader'

type Props = {
  children: ReactNode
  title: string
}

export default function Page(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        {/* FIXME: favicon (tu logo?) */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <header className="bg-slate-700 px-5 py-3 text-white md:pt-5">
        <SiteHeader />
      </header>
      <main className="block">
        <div className="px-3">
          <h1>{props.title}</h1>
          {props.children}
        </div>
      </main>
      <footer className="bg-slate-700 p-10 text-white md:pt-5">
        <SiteFooter />
      </footer>
    </>
  )
}
