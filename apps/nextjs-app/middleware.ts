// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import { NextMiddleware, NextRequest, NextResponse } from 'next/server'

// Next.js middleware
// ==================
// https://nextjs.org/docs/middleware

export const middleware: NextMiddleware = (req: NextRequest) => {
  // TODO: Required health check endpoint on VIP. "Do not remove."
  if (req.nextUrl.pathname === '/cache-healthcheck') {
    return NextResponse.rewrite(new URL('/api/healthcheck', req.url))
  }

  // Continue as normal through the Next.js lifecycle.
  return NextResponse.next()
}
