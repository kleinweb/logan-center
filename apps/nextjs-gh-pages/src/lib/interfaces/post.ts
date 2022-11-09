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
