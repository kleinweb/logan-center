// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

import { __ } from '@wordpress/i18n'

import { TempleLogoIcon } from 'tu-assets'

export default function KleinBanner() {
  return (
    <div className="bg-neutral-800 text-white">
      <div className="container relative mx-auto flex items-center justify-end px-5">
        <a
          href="https://klein.temple.edu"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 uppercase tracking-wide"
        >
          <p className="grow font-bold">{__('Explore')} klein.temple.edu</p>
          <div className="h-[40px] w-[40px] bg-white">
            <TempleLogoIcon />
          </div>
        </a>
      </div>
    </div>
  )
}
