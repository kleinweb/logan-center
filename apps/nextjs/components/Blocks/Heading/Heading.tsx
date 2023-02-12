// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { BlockProps } from '../index'

export default function Heading({ block: { innerHTML } }: BlockProps) {
  return <h3 dangerouslySetInnerHTML={{ __html: innerHTML ?? '' }} />
}
