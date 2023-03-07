// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {gql} from '@apollo/client'

export const GLOBAL_SETTINGS = gql`
  fragment Settings on GeneralSettings {
    dateFormat
    description
    language
    timeFormat
    title
  }
`
