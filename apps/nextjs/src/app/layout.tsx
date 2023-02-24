import {Providers} from './providers'

import '@/src/styles/globals.css'
import SiteHeader from '@organisms/SiteHeader'
import {KleinBanner} from '@organisms/KleinBanner'
import SiteFooter from '@organisms/SiteFooter'

export {metadata} from './default-meta'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Providers>
        <header className="flex flex-col">
          <div className="order-2 bg-slate-700 py-1 text-white lg:py-2">
            <SiteHeader />
          </div>
          <div className="order-1">
            <KleinBanner />
          </div>
        </header>
        <div className="min-h-screen">
          {/* <PreviewAlert preview={props.preview} /> */}
          <main className="block">{children}</main>
        </div>
        <footer className="bg-slate-700 py-10 px-5 text-white md:pt-5">
          <SiteFooter />
        </footer>
      </Providers>
    </html>
  )
}
