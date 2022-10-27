import useInternalLinkRouting from '@/lib/hooks/useInternalLinkRouting'
import '@/styles/index.css'

export default function App({ Component, pageProps }) {
  useInternalLinkRouting()

  return <Component {...pageProps} />
}
