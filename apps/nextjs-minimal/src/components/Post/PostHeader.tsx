// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import CoverImage from './CoverImage'
import PostTitle from './PostTitle'

type Props = {
  title: string
  coverImage?: string
}

const PostHeader = ({ title, coverImage }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {coverImage ? (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
        </div>
      ) : undefined}
    </>
  )
}

export default PostHeader
