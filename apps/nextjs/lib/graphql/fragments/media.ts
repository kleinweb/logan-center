// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const COVER_IMAGE_FIELDS = gql`
  fragment CoverImageFields on MediaItem {
    altText
    caption
    description
    link
    mediaDetails {
      ...MediaItemDetails
    }
    mediaItemUrl
    mediaType
    sourceUrl
    title
    uri
  }
`

export const THUMBNAIL_IMAGE_FIELDS = gql`
  fragment ThumbnailImageFields on MediaItem {
    altText
    sourceUrl(size: LARGE)
    mediaDetails {
      height
      width
    }
  }
`

export const MEDIA_ITEM_DETAILS = gql`
  fragment MediaItemDetails on MediaDetails {
    file
    width
    height
    meta {
      caption
      copyright
      credit
      title
    }
  }
`
