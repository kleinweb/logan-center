// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

// FIXME: add tests for cross-protocol requests
// ddev's guest https urls
// sometimes cause wordpress to become upset when talking to an insecure url on
// the host machine

import {extractLastTokenFromRoute, getInternalLinkPathname} from './links'
import {links} from '../wp.config'

jest.mock('../wp.config', function () {
  return {
    links: {
      isInternalLink: jest.fn(() => true),
    },
  }
})

describe('extractLastTokenFromRoute', () => {
  it('extracts the last token from an array of tokens', function () {
    const input = ['one', 'two', 'three', 'four', 'five']
    expect(extractLastTokenFromRoute(input)).toBe('five')
  })

  it('returns a string', function () {
    expect(extractLastTokenFromRoute('bare string')).toBe('bare string')
  })
})

describe('isInternalLink default implementation', () => {
  const unmockedWPConfig = jest.requireActual('../wp.config')

  it('returns true for local hostnames', function () {
    const internalHostnames = ['127.0.0.1', 'localhost']

    internalHostnames.forEach(function (hostname) {
      expect(unmockedWPConfig.links.isInternalLink(hostname)).toBe(true)
    })
  })

  it('returns false for non-local hostnames', function () {
    const externalHostnames = [
      'localhost.internal',
      'local.host',
      'localhost.com',
      'mysite.example.com',
      'mysite2.example.com',
    ]

    externalHostnames.forEach(function (hostname) {
      expect(unmockedWPConfig.links.isInternalLink(hostname)).toBe(false)
    })
  })
})

describe('getInternalLinkPathname', () => {
  const isInternalLink = links.isInternalLink as jest.MockedFunction<
    typeof links.isInternalLink
  >

  beforeEach(() => {
    isInternalLink.mockClear()
  })

  it('preserves the query string', function () {
    const internalLinkWithQuery = 'http://localhost/howdy.html?wave=true'

    expect(getInternalLinkPathname(internalLinkWithQuery)).toEqual(
      '/howdy.html?wave=true',
    )
  })

  it('returns the full URL for non-local URLs', function () {
    const externalLink = 'http://localhost/howdy.html'

    isInternalLink.mockImplementation(() => false)

    expect(getInternalLinkPathname(externalLink)).toEqual(externalLink)
  })

  it('does nothing to malformed or non-HTTP URLs', function () {
    const malformedLinks = [
      'localhost',
      'localhost/howdy.html',
      'http://localhost:port/howdy.html',
      'ftp://localhost/howdy.html',
      'mailto:localhost',
      'suzy@localhost',
    ]

    malformedLinks.forEach(function (link) {
      expect(getInternalLinkPathname(link)).toBe(link)
    })
  })
})
