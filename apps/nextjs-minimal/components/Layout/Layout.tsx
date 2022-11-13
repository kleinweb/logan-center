// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ReactNode } from 'react'

import SiteHeader from '../SiteHeader'
import SiteFooter from '../SiteFooter'
import Meta from '../Meta'

type Props = {
  children: ReactNode
}

export default function Layout(props: Props) {
  return (
    <>
      <Meta />
      <header className="bg-slate-700 py-3 text-white">
        <SiteHeader />
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
