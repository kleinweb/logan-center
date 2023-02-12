// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { Twitter, Facebook, Instagram } from 'lucide-react'

import { Icon } from '@kleinweb/logan-center__ui'

/**
 * Server-side data loading must take place in pages. If you need to load data
 * to render this component, you must pass it down as props (or load it client-
 * side.)
 */
export default function SiteFooter() {
  return (
    <>
      <div className="mb-8">
        <address className="not-italic leading-snug">
          <p className="mb-1 font-bold leading-tight">
            Klein College of Media and Communication
          </p>
          <p>Annenberg Hall</p>
          <p>2020 N. 13th St.</p>
          <p>Philadelphia, PA 19122</p>
        </address>
      </div>
      <hr className="my-5 mb-8 block border-neutral-400" />
      <div className="flex justify-center">
        <Icon label="Follow us on Twitter">
          <a
            href="https://twitter.com/TULoganCenter"
            target="_blank"
            rel="noreferrer external"
          >
            <Twitter />
          </a>
        </Icon>
        <Icon label="Follow us on Facebook">
          <a
            href="https://www.facebook.com/tulogancenter/"
            target="_blank"
            rel="noreferrer external"
          >
            <Facebook />
          </a>
        </Icon>
        <Icon label="Follow us on Instagram">
          <a
            href="https://www.facebook.com/tulogancenter/"
            target="_blank"
            rel="noreferrer external"
          >
            <Instagram />
          </a>
        </Icon>
      </div>
    </>
  )
}
