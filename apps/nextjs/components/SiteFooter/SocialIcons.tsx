// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import { Twitter, Facebook, Instagram } from 'lucide-react'

export default function SocialIcons() {
  return (
    <div className="text-xs">
      <a
        href="https://twitter.com/TULoganCenter"
        target="_blank"
        rel="noreferrer external"
        className="mr-4 inline-flex items-center justify-center rounded-full border border-white/10 p-2.5"
        title="Follow us on Twitter"
      >
        <Twitter strokeWidth={0} fill="currentColor" />
      </a>
      <a
        href="https://www.facebook.com/tulogancenter/"
        target="_blank"
        rel="noreferrer external"
        className="mr-4 inline-flex items-center justify-center rounded-full border border-white/10 p-2.5"
        title="Follow us on Facebook"
      >
        <Facebook strokeWidth={0} fill="currentColor" />
      </a>
      <a
        href="https://www.instagram.com/tulogancenter/"
        target="_blank"
        rel="noreferrer external"
        className="mr-4 inline-flex items-center justify-center rounded-full border border-white/10 p-2.5"
        title="Follow us on Instagram"
      >
        <Instagram />
      </a>
    </div>
  )
}
