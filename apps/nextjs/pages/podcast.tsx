// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

// import Head from 'next/head'
import Image from 'next/image'
import {__} from '@wordpress/i18n'

// import {SITE_NAME} from '@/lib/constants'
// import Layout from '@/components/Layout'
import Container from '@/components/Container'

// const pageTitle = `Podcast | ${SITE_NAME}`

export default function Podcast() {
  return (
    <>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src="../public/assets/images/photos/podcast--stop_killing_us--01-IMG_4699.jpeg"
          alt=""
          aria-hidden
          fill
        />
      </div>
      <Container>
        <div className="-mt-12 mb-4 inline-block bg-slate-100 p-6 pb-4 align-middle">
          <h1 className="text-primary-dark mb-5 text-2xl font-bold leading-tight">
            {__('Stop and Frisk: Revisit or Resist', 'logan-center')}
          </h1>
        </div>
      </Container>
      <div className="py-6">
        <Container>
          <div className="space-y-5">
            <p className="text-lg">
              {__(
                'Gun violence in Philadelphia has reached a boiling point. Politicians, police and community members are searching for ways to curb the staggering statistics. City Council President Darrell Clarke proposed Stop and Frisk as a potential solution in the summer of 2022. Could beefing up this controversial police tactic help keep Philly safe?',
                'logan-center',
              )}
            </p>
            <p className="text-lg">
              {__(
                'Stop and Frisk: Revisit or Resist explores diverse perspectives and solutions to the city’s gun violence crisis. The five-episode podcast is a production of WHYY News and Temple University’s Logan Center for Urban Investigative Reporting.',
                'logan-center',
              )}
            </p>

            <Image
              src="assets/images/podcast--poster--with-title.png"
              width={1200}
              height={875}
              alt=""
            />
          </div>
        </Container>
      </div>
    </>
  )
}
