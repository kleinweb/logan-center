// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import dynamic from 'next/dynamic'
import Image from 'next/image'

import thumbImage from '@kleinweb/logan-center__site-assets/images/home--hero_video--start.thumb.jpeg'

const BackgroundVideoPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

function Hero() {
  return (
    <div
      className="relative aspect-cinematic overflow-hidden brightness-75"
      tabIndex={-1}
      aria-hidden
    >
      <div className="absolute z-0 aspect-video w-full">
        <Image src={thumbImage} alt="" />
      </div>
      <div className="absolute z-10 aspect-video w-full">
        <BackgroundVideoPlayer
          url="https://vimeo.com/789051547"
          playing
          loop={false}
          controls={false}
          volume={0}
          muted // requires `volume == 0`, despite implications
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
    </div>
  )
}

export default Hero
