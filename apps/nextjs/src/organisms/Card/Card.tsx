// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {ReactNode} from 'react'
import styles from './Card.module.css'

type Props = {
  children: ReactNode
}

export default function Card(props: Props) {
  return <div className={styles.container}>{props.children}</div>
}
