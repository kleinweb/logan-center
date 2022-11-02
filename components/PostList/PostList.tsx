// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { ContentNodeFieldsFragment } from '@/graphql/generated'
import Link from 'next/link'
import { getInternalLinkPathname } from '@/lib/links'

type Props = {
  nextPageLink?: string
  posts: ContentNodeFieldsFragment[]
  previousPageLink?: string
}

export default function PostList(props: Props) {
  return (
    <>
      <ul>
        {props.posts.map((post) => (
          <li key={post.databaseId}>
            <Link
              href={getInternalLinkPathname(post.link)}
              legacyBehavior>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        {props.previousPageLink && (
          <>
            <Link href={props.previousPageLink}>&lt; Previous</Link>
            &nbsp;
          </>
        )}
        {props.nextPageLink && <Link href={props.nextPageLink}>Next &gt;</Link>}
      </p>
    </>
  )
}
