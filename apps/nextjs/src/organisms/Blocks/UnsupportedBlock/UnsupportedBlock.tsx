// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {BlockProps} from '../index'
import styles from './UnsupportedBlock.module.css'

export default function UnsupportedBlock({
  block: {name, tagName, attributes = [], innerBlocks = [], outerHTML},
}: BlockProps) {
  const html = outerHTML

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        <strong>Unsupported block</strong>: <code>{name}</code>
      </h4>
      {tagName && <h5>{tagName}</h5>}
      {html && <blockquote>{html}</blockquote>}
      {attributes && attributes.length > 0 && (
        <ul>
          {attributes.map((attr, i) =>
            attr ? (
              <li key={i}>
                <strong>{attr.name}</strong>: {attr.value || 'null'}
              </li>
            ) : null,
          )}
        </ul>
      )}
      {innerBlocks && innerBlocks.length > 0 && (
        <ul>
          {innerBlocks.map((block, i) =>
            block ? (
              <li key={i}>
                <strong>{block.name}</strong>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  )
}
