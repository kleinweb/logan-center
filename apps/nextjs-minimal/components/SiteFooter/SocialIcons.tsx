// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { Twitter, Facebook, Instagram } from 'lucide-react'

import { Icon } from 'ui'

export default function SocialIcons() {
  return (
    <>
      <Icon label="Follow us on Twitter">
        <a
          href="https://twitter.com/TULoganCenter"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter strokeWidth={0} fill="currentColor" />
        </a>
      </Icon>
      <Icon label="Follow us on Facebook">
        <a
          href="https://www.facebook.com/tulogancenter/"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook strokeWidth={0} fill="currentColor" />
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
    </>
  )
}
