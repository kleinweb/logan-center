// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {render, screen} from '@testing-library/react'
import Image from './Image'
import wpConfig from '@/wp.config'
import nextConfig from '@/next.config'

describe('Image', () => {
  const altText =
    'A river otter plays with a set of nesting cups while floating on its back.'
  const height = 200
  const minWidth = nextConfig.images.deviceSizes[0]
  const width = 200

  describe('with a WordPress image URL', () => {
    const src = `/${wpConfig.endpoints.contentDir}/uploads/you-otter-see-this.jpg`

    it('uses native lazy-loading', () => {
      render(<Image alt={altText} height={height} src={src} width={width} />)

      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
      expect(image.getAttribute('loading')).toEqual('lazy')
    })

    it('has its `src` transformed by the image loader when loaded', () => {
      render(
        <Image
          alt={altText}
          height={height}
          loading="eager"
          src={src}
          width={width}
        />,
      )

      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
      expect(image.getAttribute('src')).toEqual(`${src}?w=${minWidth}&q=75`)
    })

    it('renders an img with alt text', () => {
      render(<Image alt={altText} height={height} src={src} width={width} />)

      const image = screen.getByAltText(altText)

      expect(image).toBeInTheDocument()
    })
  })

  describe('with a non-WordPress image URL', () => {
    const src = '/you-otter-see-this.jpg'

    it('uses native lazy-loading', () => {
      render(<Image alt={altText} height={height} src={src} width={width} />)

      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
      expect(image.getAttribute('loading')).toEqual('lazy')
    })

    it('has its `src` transformed by the default Next.js image loader when loaded', () => {
      render(
        <Image
          alt={altText}
          height={height}
          loading="eager"
          src={src}
          width={width}
        />,
      )

      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
      expect(image.getAttribute('src')).toEqual(
        `/_next/image?url=${encodeURIComponent(src)}&w=${minWidth}&q=75`,
      )
    })

    it('renders an image with alt text', () => {
      render(<Image alt={altText} height={height} src={src} width={width} />)

      const image = screen.getByAltText(altText)

      expect(image).toBeInTheDocument()
    })
  })
})
