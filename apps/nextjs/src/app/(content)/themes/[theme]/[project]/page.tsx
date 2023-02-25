// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {ThemePageProps} from '../page'

export type ProjectPageProps = ThemePageProps & {params: {project: string}}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }

export default function ProjectPage({params}: ProjectPageProps) {
  return (
    <>
      <h1>
        This is a Project page with the slug: <code>{params.project}</code>
      </h1>
      <p>
        It is a member of the Theme: <code>{params.theme}</code>
      </p>
    </>
  )
}
