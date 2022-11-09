import Link from 'next/link'

import Layout from '@/components/Layout/Layout'
import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
import Container from '@/components/Container'
import PostHeader from '@/components/Post/PostHeader'

const coverImage = undefined

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <PostHeader title={SITE_NAME} coverImage={coverImage} />
      <Container>
        <div>
          Hello World. <Link href="/about">About</Link>
        </div>
      </Container>
    </Layout>
  )
}
