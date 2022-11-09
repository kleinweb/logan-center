import '../styles/globals.css'
import 'ui/styles.css'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
