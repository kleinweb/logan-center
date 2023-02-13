// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { GetServerSideProps } from 'next'
import Image from '@/components/Image/Image'
import Layout from '@/components/Layout'
import getApolloClient from '@/graphql/apollo'
import {
  AllMediaItemsDocument,
  AllMediaItemsQuery,
  MediaItemFieldsFragment,
} from '@/graphql/generated'
import styles from './index.module.css'

type MediaPageProps = {
  loading: boolean
  mediaItems: MediaItemFieldsFragment[]
}

export default function Media(props: MediaPageProps) {
  return (
    <Layout loading={props.loading} title="Media Gallery">
      <div className={styles.container}>
        {props.mediaItems.map((mediaItem) => {
          const { altText = '', id, sourceUrl } = mediaItem

          // Each image is displayed in a fixed-height box of 100px. If the
          // actual height of the image is less than 100px, then use
          return (
            <a
              className={styles['image-link']}
              href={sourceUrl}
              key={id}
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt={altText}
                className={styles.image}
                fill={true}
                src={sourceUrl}
              />
            </a>
          )
        })}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<MediaPageProps> = async (
  context,
) => {
  const queryOptions = {
    query: AllMediaItemsDocument,
  }

  const { data, loading } = await getApolloClient(
    context,
  ).query<AllMediaItemsQuery>(queryOptions)

  const mediaItems = data.mediaItems?.nodes

  return {
    props: {
      loading,
      mediaItems,
    },
  }
}