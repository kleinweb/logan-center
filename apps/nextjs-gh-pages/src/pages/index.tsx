import Link from 'next/link'

import Page from '@/components/Page/Page'

export default function Home() {
  return (
    <Page title="Logan Center for Urban Investigative Reporting">
      <div>
        Hello World. <Link href="/about">About</Link>
      </div>
    </Page>
  )
}
