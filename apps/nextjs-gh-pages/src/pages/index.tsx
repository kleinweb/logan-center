import Link from 'next/link'

import Layout from '@/components/Layout/Layout'

export default function Home() {
  return (
    <Layout title="Logan Center for Urban Investigative Reporting">
      <div>
        Hello World. <Link href="/about">About</Link>
      </div>
    </Layout>
  )
}
