export type ThemePageProps = {
  params: {
    theme: string
  }
}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }

export default function ThemePage({params}: ThemePageProps) {
  return (
    <h1>
      This is a Theme with the slug: <code>{params.theme}</code>
    </h1>
  )
}
