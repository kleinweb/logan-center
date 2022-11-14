// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'
import Head from 'next/head'
import { __ } from '@wordpress/i18n'
import { ExternalLink } from 'lucide-react'

import { Button, ButtonWithIcon, ImageObject } from 'ui'

import { SITE_NAME } from '@/lib/constants'
import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'

import BarsMotif from 'shared-assets/decorations/motif--island.svg'

import heroImage from 'shared-assets/images/photos/ncm_williamdickschool-3.jpg'
import podcastImage from 'shared-assets/images/podcast--poster--art_only.jpg'
import youGotThisImage from 'shared-assets/images/photos/mastermanschool-firstday01-crop-1024x576.jpeg'

const pageTitle = `Home | ${SITE_NAME}`
const podcastInfoUrl =
  'https://whyy.org/programs/stop-and-frisk-revisit-or-resist/'

const aboutLoganDoc = `Klein College of Media and Communication launched the Jonathan Logan Family Foundation Center for Urban Investigative Reporting in the summer of 2021 thanks to a $1.2 million founding grant from the Jonathan Logan Family Foundation of Berkeley, California. The Center focuses exclusively on the issues facing Philadelphia and other large American cities such as gun violence, economic inequality, education and health disparities, crumbling infrastructure and eroding trust in institutions. Through the Logan Center, Klein students and faculty report not only on these problems, but on potential solutions, closely examining what has worked well in other cities across the nation and the globe.`

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <h1 className="sr-only">{pageTitle}</h1>

      <ImageObject src={heroImage} alt="" aria-hidden />

      <div className="mb-6 bg-slate-100 py-6">
        <Container>
          <div className="mb-6 space-y-5">
            <h2 className="text-primary-dark text-xl font-bold leading-tight md:text-2xl">
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
        </Container>
      </div>

      <section className="mb-6 py-6">
        <Container>
          <div className="flex flex-col">
            <div className="order-2 mb-3 flex flex-col">
              <h2 className="text-primary-dark order-2 mb-2 text-right text-xl font-bold uppercase leading-tight tracking-wider">
                {__('Stop and Frisk: Revisit or Resist', 'logan-center')}
              </h2>
              <h3 className="order-1 mb-1 text-right text-base font-bold uppercase tracking-wider text-red-600">
                {__('Listen to our new podcast', 'logan-center')}
              </h3>
            </div>

            <div className="order-3 flex flex-col space-y-4">
              <div className="">
                <p className="text-right text-base">
                  {__(
                    'Temple University’s Logan Center has teamed up with WHYY News to discuss the possibility of Stop and Frisk returning to Philadelphia in a new five-episode podcast.',
                    'logan-center',
                  )}
                </p>
              </div>

              <div className="text-right">
                <Link
                  href={podcastInfoUrl}
                  rel="noreferrer external"
                  target="_blank"
                >
                  <Button>
                    Listen Now on WHYY
                    <ExternalLink className="relative bottom-[0.5px] -mr-1 py-1 pl-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 mb-6">
              <Link
                href={podcastInfoUrl}
                rel="noreferrer external"
                target="_blank"
              >
                <ImageObject
                  src={podcastImage}
                  alt={__('Promotional poster for the podcast.')}
                  aspect="banner"
                  className="object-top"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-primary-light mt-20 py-6 pb-20">
        <Container>
          <div className="text-primary-accent relative -mt-24 flex flex-row-reverse py-8">
            <BarsMotif />
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-bold uppercase tracking-wider text-red-600">
              About the Logan Center
            </h2>

            <p className="text-base">{__(aboutLoganDoc, 'logan-center')}</p>

            <div className="text-right">
              <Link className="block" href="mailto:tulogancenter@temple.edu">
                <ButtonWithIcon variant="sparse">Email Us</ButtonWithIcon>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-6 pb-16">
        <Container>
          <div className="text-primary-accent relative -mt-24 flex py-8">
            <BarsMotif />
          </div>
          <div className="flex flex-col">
            <div className="order-2 mb-3 flex flex-col">
              <h2 className="text-primary-dark order-2 mb-2 text-right text-xl font-bold uppercase leading-tight tracking-wider">
                {__('Education Disparities Project', 'logan-center')}
              </h2>
              <h3 className="order-1 mb-1 text-right text-base font-bold uppercase tracking-wider text-red-600">
                {__('Read our latest stories', 'logan-center')}
              </h3>
            </div>

            <div className="order-3 flex flex-col space-y-4">
              <div className="">
                <p className="text-right text-base">
                  {__(
                    `Temple’s Logan Center for Urban Investigative Reporting and Billy Penn at WHYY are partnering on a yearlong reporting project examining disparities within the Philly School District, with the goal of identifying solutions that can lift up underserved schools and increase equity in public education.`,
                    'logan-center',
                  )}
                </p>
              </div>

              <div className="text-right">
                <Link
                  href="https://billypenn.com/stories/education-disparities-in-philadelphia/"
                  rel="noreferrer external"
                  target="_blank"
                >
                  <Button>
                    Read more on Billy Penn
                    <ExternalLink className="relative bottom-[0.5px] -mr-1 py-1 pl-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ImageObject src={youGotThisImage} alt="" aria-hidden />
    </Layout>
  )
}
