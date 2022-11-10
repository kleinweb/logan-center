// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Container from '../Container'
import SocialIcons from './SocialIcons'

export default function SiteFooter() {
  return (
    <Container>
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
        <SocialIcons />
      </div>
    </Container>
  )
}
