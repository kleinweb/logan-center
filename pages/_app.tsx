import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  useInternalLinkRouting()

  return <Component {...pageProps} />
}
