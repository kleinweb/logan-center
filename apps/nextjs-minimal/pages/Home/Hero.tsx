// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { __ } from '@wordpress/i18n'

import thumbImage from '@kleinweb/logan-center__site-assets/images/home--hero_video--start.thumb.jpeg'

const BackgroundVideoPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

function Hero() {
  return (
    <>
      <div
        className="relative aspect-cinematic overflow-hidden brightness-75"
        tabIndex={-1}
        aria-hidden
      >
        <Image src={thumbImage} className="absolute z-0" alt="" />
        <BackgroundVideoPlayer
          url="https://vimeo.com/789051547"
          className="absolute z-10"
          playing
          loop={false}
          controls={false}
          volume={0}
          muted // requires `volume == 0`
          playsinline
          pip={false}
          width="100%"
          height="100%"
          title=""
          config={{
            vimeo: {
              // <https://developer.vimeo.com/player/sdk/embed>
              playerOptions: {
                byline: false,
                keyboard: false, // in tandem with tabindex
                portrait: false,
                controls: false,
              },
            },
          }}
        />
      </div>

      <div className="relative mx-auto md:container">
        <div className="grid grid-cols-12 grid-rows-1 gap-2 md:absolute md:-bottom-16 md:px-5 lg:bottom-24 lg:-ml-12">
          <div className="col-span-full bg-slate-100 py-6 md:col-span-10 md:py-12 md:pb-16 lg:col-span-6">
            <div className="container relative mx-auto px-5 md:px-10">
              <div className="space-y-5">
                <h2 className="text-xl font-bold leading-tight text-primary-dark md:text-2xl">
                  {__(
                    'Investigating the issues affecting urban communities',
                    'logan-center',
                  )}
                </h2>
                <p className="text-base">
                  {__(
                    `Klein College’s Logan Center for Urban Investigative Reporting focuses on the issues facing Philadelphia and other large American cities, including gun violence, economic inequality, education and health disparities, crumbling infrastructure and eroding trust in institutions.`,
                    'logan-center',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
