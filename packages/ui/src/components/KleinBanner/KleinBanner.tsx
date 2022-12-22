// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

import { __ } from '@wordpress/i18n'

import { TempleLogoIcon } from '@kleinweb/tu-assets'

export default function KleinBanner() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="container relative mx-auto flex items-center justify-end px-5">
        <a
          href="https://klein.temple.edu"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 uppercase tracking-wide"
        >
          <p className="text-2xs grow font-semibold">
            {__('Explore')} klein.temple.edu
          </p>
          {/* NOTE: `aspect-ratio` is an option here too, but considering that
          its browser support is not quite in the optimal range of ~95% as of 2023-01,
          it's best to play it safe for branding in such a prominent location. */}
          <div className="h-7 w-7 bg-white sm:h-9 sm:w-9">
            <TempleLogoIcon />
          </div>
        </a>
      </div>
    </div>
  )
}
