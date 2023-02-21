// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import CoverImage from './PageCover/CoverImage'
import PostTitle from '@molecules/PageTitle'

type Props = {
  title: string
  coverImage?: string
}

const PostHeader = ({title, coverImage}: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {coverImage ? (
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage
            // FIXME: changed signature
            // title={title}
            src={coverImage}
          />
        </div>
      ) : undefined}
    </>
  )
}

export default PostHeader
