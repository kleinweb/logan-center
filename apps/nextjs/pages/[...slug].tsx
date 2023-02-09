import { GetStaticPaths, GetStaticProps } from 'next'

import Article from '@/components/Article'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import { client } from '@/lib/helpers'
import {
  GET_ALL_PAGES,
  POSTS_ARCHIVE_QUERY,
  SINGLE_PAGE_QUERY,
} from '@/lib/queries'
import { ContentFields, PageProps } from '@/lib/types'

export interface QueryProps {
  query: any
  variables: {
    slug?: string
    category?: string
  }
}

/**
 * Generic page component.
 *
 * This component is used as a catch-all for pages, CPTs, and archives.
 *
 * @see https://nextjs.org/docs/routing/dynamic-routes
 */
export default function GenericPage({ data }: PageProps) {
  const nodes = data?.page?.nodes
  return data?.page ? (
    <Layout>
      {
        /** Archive Pages */
        nodes && nodes.length > 0 ? (
          // <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            {nodes.map((node: ContentFields, index: number) => (
              <Card key={index} content={node} />
            ))}
          </div>
        ) : (
          <Article content={data.page} />
        )
      }
    </Layout>
  ) : (
    // FIXME: fallback
    <></>
  )
}

/**
 * Get all paths at build time.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Bypass pre-rendering at build time.
  if (process.env.DISABLE_STATIC_SITE_GENERATION === 'true') {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Query all pages for static site generation.
  const { data } = await client.query({
    query: GET_ALL_PAGES,
  })

  // Loop over all pages and create a path for each.
  const paths = data.pages.nodes.map((page: { slug: string }) => {
    return {
      params: {
        slug: [page.slug],
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

/**
 * Query data and pass it to the page component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get the page slug.
  const slug = params?.slug?.toString?.()

  // Set a default query.
  let graphQuery = {
    query: SINGLE_PAGE_QUERY,
    variables: { slug },
  } as QueryProps

  // If Blog archive...
  if (slug === 'blog') {
    graphQuery = {
      query: POSTS_ARCHIVE_QUERY,
      variables: { category: 'uncategorized' },
    }
  }

  // Query the page data.
  const { data } = await client.query(graphQuery)

  // Page doesn't exist? Return a 404.
  if (data.page === null || data.posts === null) {
    return { props: { data }, notFound: true }
  }

  // Pass data via props and revalidate every hour.
  return {
    props: {
      data: {
        generalSettings: data.generalSettings,
        headerMenu: data.headerMenu,
        footerMenu: data.footerMenu,
        page: data.page || data.posts,
      },
    },
    revalidate: 3600,
  }
}
