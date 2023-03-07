// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {SingleThemePageProps} from '../../page'
import {SingleProjectPageProps} from '../page'

export type ReportPageProps = SingleThemePageProps &
  SingleProjectPageProps & {params: {report: string}}

// TODO: <https://beta.nextjs.org/docs/api-reference/generate-static-params>
// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map(post => ({
//     slug: post.slug,
//   }))
// }

export default function ReportPage({params}: ReportPageProps) {
  return (
    <>
      <h1>
        This is a Report with the slug: <code>“{params.report}”</code>
      </h1>
      <p>
        This Report is part of the Project: <code>{params.project}</code>
      </p>
      <p>
        This Report and its Project are members of the Theme:{' '}
        <code>{params.theme}</code>
      </p>
    </>
  )
}
