export interface IProjectLandingProps {
  params: {
    projectSlug: string
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

export default function ProjectLanding({params}: IProjectLandingProps) {
  return (
    <h1>
      This is a Project landing page with the <code>projectSlug</code>{' '}
      <strong>“{params.projectSlug}”</strong>
    </h1>
  )
}
