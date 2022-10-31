// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { BlockProps } from '../index'

export default function Paragraph({ block: { innerHTML } }: BlockProps) {
  return <p dangerouslySetInnerHTML={{ __html: innerHTML }} />
}
