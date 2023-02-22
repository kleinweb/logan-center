// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'

import {TempleLogo} from '@kleinweb/tu-assets'
import {Icon} from '@atoms/Icons'

import LogoFull from '@/public/assets/logos/logo--full--duo.svg'

import Container from '../../templates/Container'
import FinePrint from './FinePrint'
import SocialIcons from './SocialIcons'

export default function SiteFooter() {
  return (
    <Container>
      <div className="mx-auto mb-10 flex flex-wrap items-start justify-center sm:flex-nowrap sm:justify-between sm:gap-8">
        <address className="mb-10 max-w-[300px] not-italic leading-snug ">
          <a
            href="https://klein.temple.edu"
            target="_blank"
            rel="noreferrer external"
            className="block"
          >
            <Icon label="Temple University">
              <TempleLogo />
            </Icon>
            <p className="mb-1 text-base font-bold leading-tight">
              Klein College of Media and Communication
            </p>
          </a>
        </address>
        <Link href="/" className="block max-w-[300px]">
          <LogoFull className="block w-full" />
        </Link>
      </div>
      <hr className="my-5 border-white/10" />
      <div className="mb-5 flex justify-center">
        <SocialIcons />
      </div>
      <FinePrint />
    </Container>
  )
}
