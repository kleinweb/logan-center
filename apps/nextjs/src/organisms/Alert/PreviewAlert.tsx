// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

'use client'

import clsx from 'clsx'

import Link from 'next/link'
import {styles} from '@molecules/utils'

export default function PreviewAlert({preview}) {
  return preview ? (
    <div
      className={clsx('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        // 'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <div className={styles.container}>
        <div className="py-2 text-center text-sm">
          This is a page preview.{' '}
          <Link
            href="/api/exit-preview"
            className="hover:text-cyan underline transition-colors duration-200"
          >
            Click here
          </Link>{' '}
          to exit preview mode.
        </div>
      </div>
    </div>
  ) : undefined
}
