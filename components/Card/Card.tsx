// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  children: ReactNode
}

export default function Card(props: Props) {
  return <div className={styles.container}>{props.children}</div>
}
