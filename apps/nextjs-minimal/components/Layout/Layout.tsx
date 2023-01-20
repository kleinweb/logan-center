// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'

import { KleinBanner } from '@kleinweb/logan-center__ui'

import SiteHeader from '../SiteHeader'
import SiteFooter from '../SiteFooter'
import Meta from '../Meta'

type LayoutProps = {
  children: ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Meta />
      <header className="flex flex-col">
        <div className="order-2 bg-slate-700 py-1 text-white lg:py-2">
          <SiteHeader />
        </div>
        <div className="order-1">
          <KleinBanner />
        </div>
      </header>
      <div className="min-h-screen">
        <main className="block">{props.children}</main>
      </div>
      <footer className="bg-slate-700 py-10 px-5 text-white md:pt-5">
        <SiteFooter />
      </footer>
    </>
  )
}
