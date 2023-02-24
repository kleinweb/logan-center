import {Providers} from './providers'

import '@/src/styles/globals.css'

export {metadata} from './default-meta'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Providers>{children}</Providers>
    </html>
  )
}
