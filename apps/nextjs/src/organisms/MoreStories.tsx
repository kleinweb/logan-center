// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import PostCard from './PostCard'

export default function MoreStories({posts}) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map(({node}) => (
          <PostCard
            key={node.slug}
            title={node.title}
            image={node.featuredImage}
            date={node.date}
            author={node.author}
            url={`/p/${node.slug}`}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
