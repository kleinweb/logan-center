import Article from '@/components/Article'
import Layout from '@/components/Layout'
import { CONTENT_TTL } from '@/lib/constants'
import { client } from '@/graphql/apollo'
import { SINGLE_PAGE_QUERY } from '@/lib/queries'
import { PageProps } from '@/lib/types'
import { GetStaticProps } from 'next'

/**
 * Homepage component.
 *
 * FIXME: show error/404 page if {data.page} is undefined?
 */
export default function HomePage({ data }: PageProps) {
  const content = data?.page
  return <Layout>{content ? <Article content={content} /> : undefined}</Layout>
}

/**
 * Query data and pass it to the page component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async () => {
  // Query the homepage data.
  const { data } = await client.query({
    query: SINGLE_PAGE_QUERY,
    // FIXME: assuming that the slug matches! is there a more reliable way?
    variables: { slug: 'homepage' },
  })

  return {
    props: { data },
    revalidate: CONTENT_TTL,
  }
}
