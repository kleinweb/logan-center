// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Link from 'next/link'
import Head from 'next/head'
import { __ } from '@wordpress/i18n'

import { LinkButton } from 'ui'

import { SITE_NAME } from '@/lib/constants'
import Layout from '@/components/Layout/Layout'
import Container from '@/components/Container'
import { BannerImage, Photo } from '@/components/Images'

const pageTitle = `Home | ${SITE_NAME}`

const heroDoc = `Klein College’s Logan Center for Urban Investigative Reporting focuses on the issues facing Philadelphia and other large American cities, including gun violence, economic inequality, education and health disparities, crumbling infrastructure and eroding trust in institutions.`
const aboutLoganDoc = `Klein College of Media and Communication launched the Jonathan Logan Family Foundation Center for Urban Investigative Reporting in the summer of 2021 thanks to a $1.2 million founding grant from the Jonathan Logan Family Foundation of Berkeley, California. The Center focuses exclusively on the issues facing Philadelphia and other large American cities such as gun violence, economic inequality, education and health disparities, crumbling infrastructure and eroding trust in institutions. Through the Logan Center, Klein students and faculty report not only on these problems, but on potential solutions, closely examining what has worked well in other cities across the nation and the globe.`

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <h1 className="sr-only">{pageTitle}</h1>

      <Photo
        path="ncm_williamdickschool-3.jpg"
        alt="An empty Philadelphia street near the William Dick School."
      />

      <div className="bg-slate-100 py-6">
        <Container>
          <h2 className="text-2xl font-bold leading-tight mb-5">
            {__(
              'Investigating the issues affecting urban communities',
              'logan-center',
            )}
          </h2>
          <p className="text-base">{__(heroDoc, 'logan-center')}</p>
        </Container>
      </div>

      <section className="py-6">
        <Container>
          <div className="space-y-5 space-y-reverse">
            <h2 className="tracking-wider uppercase font-bold text-right leading-snug text-2xl mb-5">
              {__('Listen to our new podcast', 'logan-center')}
            </h2>
            <div className="mb-5">
              <p className="text-lg text-right">
                {__(
                  'The Logan Center has teamed up with WHYY to discuss Stop & Frisk in Philadelphia',
                  'logan-center',
                )}
              </p>
            </div>
            <div className="text-right">
              <LinkButton href="/podcast" color="red">
                Learn More
              </LinkButton>
            </div>
            <Link href="/podcast">
              <BannerImage
                alt={__('Promotional poster for the podcast.')}
                src="/shared/images/podcast--poster--cropped.png"
              />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-primary-light py-6">
        <Container>
          <div className="space-y-5 space-y-reverse">
            <h2 className="tracking-wider text-red-600 uppercase font-bold leading-snug text-2xl mb-5">
              About the Logan Center
            </h2>

            <div className="mb-5">
              <p className="text-base">{__(aboutLoganDoc, 'logan-center')}</p>
            </div>

            <div className="text-right">
              <LinkButton
                href="https://klein.temple.edu"
                color="red"
                variant="sparse"
              >
                Learn More
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}
