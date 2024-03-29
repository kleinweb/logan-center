// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import config from '../next.config'
import {links} from '../wp.config'

const basePathRemover = new RegExp(`^${config.basePath}/*`)

function removeBasePath(pathname: string): string {
  if (config.basePath) {
    return pathname.replace(basePathRemover, '/')
  }

  return pathname
}

/**
 * With dynamic routes, Next.js can pass a string or an array of strings. We
 * want either the singular string or the last item in the array of strings:
 *
 * ['2021', '06', '10', 'my-chickens-let-me-show-you-them']
 *                       ^ we want this
 *
 * ['about', 'contact']
 *            ^ we want this
 */
export function extractLastTokenFromRoute(route: string | string[]): string {
  if (!Array.isArray(route)) {
    return route
  }
  return route.slice().pop()
}

/**
 * Get the correct pathname that respects Next.js config.
 */
function getCorrectPathname(pathname: string): string {
  // Respect config for `trailingSlash` to avoid infinite redirect loops.
  // Account for `basePath` to avoid broken links.
  const pathnameRespectingConfig = removeBasePath(pathname.replace(/\/+$/, ''))
  if (config.trailingSlash) {
    return `${pathnameRespectingConfig}/`
  }

  return pathnameRespectingConfig
}

/**
 * Get the hostname of a URL.
 */
export function getHostname(url: string): string {
  try {
    const {hostname} = new URL(url)
    return hostname
  } catch (err) {
    /* continue */
  }
  return url
}

export function getInternalLinkPathname(url: string): string {
  try {
    const {hostname, pathname, protocol, search} = new URL(url)

    // Determine if the link destination should be considered internal. If so,
    // return the relative path to this Next.js site.
    if (
      ['http:', 'https:'].includes(protocol) &&
      links.isInternalLink(hostname, pathname)
    ) {
      return `${getCorrectPathname(pathname)}${search}`
    }
  } catch (err) {
    /* continue */
  }

  return url
}
