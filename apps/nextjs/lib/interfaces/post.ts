// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

export interface PageSchema {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  ogImage?: {
    url: string
  }
}

// export interface PostSchema extends PageSchema {
//   date: string
//   author: Author
// }
