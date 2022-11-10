import Link from 'next/link'

import Layout from '@/components/Layout/Layout'
import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
import Container from '@/components/Container'

const pageTitle = `Home | ${SITE_NAME}`

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1 className="sr-only">{pageTitle}</h1>

      <Container>
        <div>
          Hello World. <Link href="/about">About</Link>
        </div>
      </Container>
    </Layout>
  )
}
