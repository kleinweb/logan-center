// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import AuthorProfile from './AuthorProfile'

export default function AuthorPage(props) {
  return <AuthorProfile displayName={props.displayName} />
}
