// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { Facebook, Icon, Instagram, Twitter } from 'ui'

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
      <hr className="my-5 mb-8 block border-neutral-500" />
      <div className="flex justify-center">
        <Icon label="Follow us on Twitter">
          <a
            href="https://twitter.com/TULoganCenter"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter />
          </a>
        </Icon>
        <Icon label="Follow us on Facebook">
          <a
            href="https://www.facebook.com/tulogancenter/"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook />
          </a>
        </Icon>
        <Icon label="Follow us on Instagram">
          <a
            href="https://www.facebook.com/tulogancenter/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram />
          </a>
        </Icon>
      </div>
    </>
  )
}
