// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {GetStaticProps} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {__} from '@wordpress/i18n'

import {Button, ButtonWithIcon} from '@/components/Buttons'
import BarsMotif from '@/public/assets/decorations/motif--island.svg'
import podcastImage from '@/public/assets/images/podcast--poster--art_only.jpg'
import youGotThisImage from '@/public/assets/images/photos/mastermanschool-firstday01-crop-1024x576.jpeg'

import Layout from '@/components/Layout'
import Container from '@/components/Container'
// import {addApolloState, initializeApollo} from '@/lib/graphql'
import {HomepageDocument, HomepageQuery} from '@/gql/graphql'
import Hero from './Home/Hero'
// import {log} from '@/lib/log'

const podcastInfoUrl =
  'https://whyy.org/programs/stop-and-frisk-revisit-or-resist/'

const aboutLoganDoc = `Klein College of Media and Communication launched the Jonathan Logan Family Foundation Center for Urban Investigative Reporting in the summer of 2021 thanks to a $1.2 million founding grant from the Jonathan Logan Family Foundation of Berkeley, California. The Center focuses exclusively on the issues facing Philadelphia and other large American cities such as gun violence, economic inequality, education and health disparities, crumbling infrastructure and eroding trust in institutions. Through the Logan Center, Klein students and faculty report not only on these problems, but on potential solutions, closely examining what has worked well in other cities across the nation and the globe.`

// import Hero from './home/Hero'

type HomeProps = {
  data: HomepageQuery
}

export default function Home({data}: HomeProps) {
  // eslint-disable-next-line no-console
  console.log('[home]', data)
  return (
    <Layout title="Home">
      <div className="relative mb-6 md:mb-24">
        <Hero />

        <div className="relative mx-auto md:container">
          <div className="grid grid-cols-12 grid-rows-1 gap-2 md:absolute md:-bottom-16 md:px-5">
            <div className="col-span-full bg-slate-100 py-6 md:py-12 md:pb-16 lg:col-span-8 xl:col-span-6">
              <div className="container relative mx-auto px-5 md:px-10">
                <div className="space-y-5">
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
              </div>
            </div>
          </div>
        </div>
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
                    <span className="after:content-['_↗']">
                      Listen Now on WHYY
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 mb-6">
              <div className="aspect-banner overflow-hidden">
                <Link
                  href={podcastInfoUrl}
                  rel="noreferrer external"
                  target="_blank"
                >
                  <Image
                    src={podcastImage}
                    alt={__('Promotional poster for the podcast.')}
                  />
                </Link>
              </div>
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
                    <span className="after:content-['_↗']">
                      Read more on Billy Penn
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="relative aspect-video overflow-hidden">
        <Image src={youGotThisImage} alt="" aria-hidden fill />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const apolloClient = initializeApollo()

  const {data} = await apolloClient.query({
    query: HomepageDocument,
  })

  return addApolloState(apolloClient, {
    props: {
      data,
    },
  })
}
