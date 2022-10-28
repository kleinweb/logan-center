// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { BlockProps } from '../index'

export default function Heading({ block: { innerHTML } }: BlockProps) {
  return <h3 dangerouslySetInnerHTML={{ __html: innerHTML }} />
}
