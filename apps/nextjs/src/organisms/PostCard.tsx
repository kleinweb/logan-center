import Date from '@atoms/Date'
import {Byline} from '@molecules/Byline'
import Link from 'next/link'
import {CoverImage} from './CoverImage'

export interface PostCardProps {
  title: string
  url: string
  // FIXME: get shape from query
  image?: any
  date?: string
  excerpt?: string
  // FIXME: determine "Author" type
  author?: any
  // TODO: maybe?
  // slug,
}

export default function PostCard({
  title,
  image,
  date,
  excerpt,
  author,
  url,
}: PostCardProps) {
  return (
    <div>
      {!!image && (
        <div className="mb-5">
          <CoverImage contentTitle={title} src={image.src} contentUrl={url} />
        </div>
      )}
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={url} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      <div
        className="mb-4 text-lg leading-relaxed"
        // TODO: why?
        // dangerouslySetInnerHTML={{__html: excerpt}}
      >
        {excerpt}
      </div>
      {author?.node?.name && author?.node?.displayName && (
        <Byline
          name={author?.name as string}
          displayName={author?.node?.displayName}
        />
      )}
    </div>
  )
}
