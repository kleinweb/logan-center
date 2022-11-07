// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { Facebook, Icon, Instagram, Twitter } from '../Icons'

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
          <p className="font-bold leading-tight mb-1">
            Klein College of Media and Communication
          </p>
          <p>Annenberg Hall</p>
          <p>2020 N. 13th St.</p>
          <p>Philadelphia, PA 19122</p>
        </address>
      </div>
      <hr className="block my-5 border-neutral-500 mb-8" />
      <div className="flex justify-center">
        <Icon label="Follow us on Twitter">
          <Twitter />
        </Icon>
        <Icon label="Follow us on Facebook">
          <Facebook />
        </Icon>
        <Icon label="Follow us on Instagram">
          <Instagram />
        </Icon>
      </div>
    </>
  )
}
