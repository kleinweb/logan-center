import clsx from 'clsx'
import parse from 'html-react-parser'
import Head from 'next/head'
import Image from 'next/image'

import ParseContent from '@/components/ParseContent'
import { ContentFields } from '@/lib/types'

export interface ArticleProps {
  content: ContentFields
}

/**
 * Article component.
 */
export default function Article({ content }: ArticleProps) {
  // FIXME: but what if the title is not exactly 'Homepage'? needs a better guarantee
  const isHome = content.title == 'Homepage'
  const categories = content?.categories?.edges ?? []
  const featuredImage = content?.featuredImage?.node
  const author = content?.author?.node
  // const contentType = content?.contentType?.node?.name
  return (
    <>
      <Head>
        <title>
          {content.seo.title ? parse(content.seo.title) : `Next.js WordPress`}
        </title>
        {content.seo.metaDesc ? parse(content.seo.metaDesc) : null}
        {content.seo.fullHead ? parse(content.seo.fullHead) : null}
      </Head>

      <article>
        <header>
          {categories.map(({ node }) => (
            <span key={node.name}>{node.name}</span>
          ))}
          <h1 className={clsx(isHome && 'sr-only')}>{content.title}</h1>
        </header>
        {/* <section className="hero"> */}
        <section>
          {featuredImage ? (
            <Image
              alt={featuredImage.altText}
              // className={classes.heroImage}
              src={featuredImage.sourceUrl}
              height={featuredImage.mediaDetails.height}
              width={featuredImage.mediaDetails.width}
              priority
            />
          ) : undefined}
          <div className="flex justify-between justify-items-center">
            <div className="justify-end">
              <div className="space-y-2">
                <div>Author</div>
                <cite>{author.name}</cite>
              </div>
            </div>
            {content.date ? (
              <time>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(Date.parse(content.date))}
              </time>
            ) : undefined}
          </div>
        </section>
        <main>{ParseContent(content.content)}</main>
      </article>
    </>
  )
}
