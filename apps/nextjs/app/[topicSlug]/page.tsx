export interface ITopicSectionProps {
  params: {topicSlug: string}
}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }

export default function TopicSection({params}: ITopicSectionProps) {
  return (
    <h1>
      This is a Topic Section with the <code>topicSlug</code>{' '}
      <strong>“{params.topicSlug}”</strong>
    </h1>
  )
}
