// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {parseISO, format} from 'date-fns'

// TODO: why? should use format from CMS
const DATE_FORMAT = 'LLLL	d, yyyy'

export default function Date({dateString}) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, DATE_FORMAT)}</time>
}
