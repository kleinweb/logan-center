// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {PageTitle} from '@molecules/PageTitle'
import CoverImageFallback from '@organisms/CoverImage/CoverImageFallback'

export type PageHeaderProps = {
  title: string
  coverImage?: string | any
}

export default function PageHeader({title}) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImageFallback />
      </div>
    </>
  )
}
