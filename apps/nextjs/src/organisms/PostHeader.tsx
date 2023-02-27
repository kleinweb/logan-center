// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {PageTitle} from '@molecules/PageTitle'

import {CoverImage} from './CoverImage'

type Props = {
  title: string
  coverImage?: string
}

const PostHeader = ({title, coverImage}: Props) => {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      {coverImage ? (
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage contentTitle={title} src={coverImage} />
        </div>
      ) : undefined}
    </>
  )
}

export default PostHeader
