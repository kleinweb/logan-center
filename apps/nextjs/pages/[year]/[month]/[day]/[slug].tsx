import Article from '@/components/Article'
import Comments from '@/components/Comments'
import Layout from '@/components/Layout'
import { client } from '@/lib/helpers'
import { GET_ALL_POSTS, SINGLE_POST_QUERY } from '@/lib/queries'
import { PageProps } from '@/lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'

/**
 * Single post component.
 *
 * This component is used to display single posts.
 */
export default function SinglePost({ data }: PageProps) {
  return (
    <Layout>
      <Article content={data.post} />
      {data?.post?.commentStatus === 'open' && (
        <Comments
          comments={data?.post?.comments}
          postId={data?.post?.databaseId}
          total={data?.post?.commentCount}
        />
      )}
    </Layout>
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

  // Query all posts for static site generation.
  const { data } = await client.query({
    query: GET_ALL_POSTS,
  })

  // Loop over all posts and create a path for each.
  const paths = data.posts.nodes.map((post: { uri: string }) => {
    const slug = post.uri.replace(/^\/|\/$/g, '').split('/')

    return {
      params: {
        year: slug[0] || '',
        month: slug[1] || '',
        day: slug[2] || '',
        slug: slug[3] || '',
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

/**
 * Query data and pass it to the post component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get the post slug.
  const slug = params.slug.toString()

  // Query a single post by slug.
  const { data } = await client.query({
    query: SINGLE_POST_QUERY,
    variables: { slug: slug },
  })

  // Pass data via props and revalidate every hour.
  return {
    props: {
      data,
    },
    revalidate: 3600,
  }
}
