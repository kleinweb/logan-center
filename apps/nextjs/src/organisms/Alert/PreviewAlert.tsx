'use client'

import clsx from 'clsx'

import Container from '@templates/Container'
import Link from 'next/link'

export default function PreviewAlert({preview}) {
  return preview ? (
    <div
      className={clsx('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        // 'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
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
      </Container>
    </div>
  ) : undefined
}
