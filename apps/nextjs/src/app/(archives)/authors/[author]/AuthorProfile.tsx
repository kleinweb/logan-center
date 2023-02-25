// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import PageHeader from '@organisms/Page/Header'

export default function AuthorProfile({displayName}) {
  return <PageHeader title={displayName} />
}
