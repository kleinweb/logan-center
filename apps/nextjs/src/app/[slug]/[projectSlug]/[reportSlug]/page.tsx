export interface IReportProps {
  params: {
    projectSlug: string
    reportSlug: string
    topicSlug: string
  }
}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }

export default function Report({params}: IReportProps) {
  return (
    <h1>
      This is a Report with the <code>reportSlug</code>{' '}
      <strong>“{params.reportSlug}”</strong>
    </h1>
  )
}
