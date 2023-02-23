import Link from 'next/link'

import {getAuthorUrl} from '@/lib/authors'

export type BylineProps = {
  /** Author username / login name. */
  name: string
  /** Author display name as configured in their CMS user profile. */
  displayName: string
  /** Whether to link to the Author's archive page. */
  archiveLink?: boolean
}

export default function Byline({name, archiveLink = true}: BylineProps) {
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold">
        {archiveLink ? <Link href={getAuthorUrl(name)}>{name}</Link> : name}
      </div>
    </div>
  )
}
