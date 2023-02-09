// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Page from '@/components/Page/Page'
import client from '@/graphql/apollo'
import {
  AllMediaItemsDocument,
  AllMediaItemsQuery,
  MediaItemFieldsFragment,
} from '@/graphql/generated'
import styles from './index.module.css'

type Props = {
  loading: boolean
  mediaItems: MediaItemFieldsFragment[]
}

export default function Media(props: Props) {
  return (
    <Page loading={props.loading} title="Media Gallery">
      <div className={styles.container}>
        {props.mediaItems.map((mediaItem) => {
          const {
            altText = '',
            id,
            mediaDetails: { height, width },
            sourceUrl,
          } = mediaItem

          // Each image is displayed in a fixed-height box of 100px. If the
          // actual height of the image is less than 100px, then use
          // layout=fill and objectFit to fill the box.
          return (
            <a
              className={styles.image}
              href={sourceUrl}
              key={id}
              rel="noreferrer"
              target="_blank"
            >
              {height < 100 ? (
                <Image
                  src={sourceUrl}
                  alt={altText}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="0"
                />
              ) : (
                <Image
                  src={sourceUrl}
                  alt={altText}
                  layout="intrinsic"
                  height={100}
                  width={(width / height) * 100}
                />
              )}
            </a>
          )
        })}
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const queryOptions = {
    query: AllMediaItemsDocument,
  }

  const { data, loading } = await client(context).query<AllMediaItemsQuery>(
    queryOptions,
  )

  const mediaItems = data.mediaItems?.nodes

  return {
    props: {
      loading,
      mediaItems,
    },
  }
}
