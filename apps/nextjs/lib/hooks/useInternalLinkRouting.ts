// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {getInternalLinkPathname} from '@/lib/links'

/**
 * Using the Link component (next/link) for internal links instead of vanilla
 * <a> tags allows Next.js to load a page client-side and re-render with React
 * instead of making a full round-trip for another server-rendered page.
 *
 * However, sometimes <a> tags are embedded within markup that you need to
 * render directly with `dangerouslySetInnerHTML`. We can listen for clicks on
 * these links and, if they match our expectations for what constitues a
 * relative link, we can route them interally.
 *
 * NOTE: If you run into issues with link routing in Storybook which may be
 * caused by this hook, refer to the following resources for troubleshooting:
 *
 * - [the Storybook addon docs]{@link https://github.com/RyanClementsHax/storybook-addon-next#nextjs-routing}
 *
 */
export default function useLinkRouter() {
  const router = useRouter()

  useEffect(() => {
    function captureLinks(evt: MouseEvent) {
      // Narrow type to HTMLAnchorElement.
      if (!(evt.target instanceof HTMLAnchorElement)) {
        return
      }

      // Determine if the link destination should be considered internal.
      const internalLinkPathname = getInternalLinkPathname(evt.target.href)
      if (internalLinkPathname) {
        evt.preventDefault()
        router.push(internalLinkPathname)
      }
    }

    document.body.addEventListener('click', captureLinks)

    return () => document.body.removeEventListener('click', captureLinks)
  }, [router])
}
