// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import type { NextApiRequest, NextApiResponse } from 'next'
import { wordPressEndpoint } from '../../wp.config'

const robotsTxt = `
User-agent: *

Allow: *
Disallow: /api/*

Sitemap: ${wordPressEndpoint}/wp-sitemap.xml
`.trim()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const isGET = ['get', 'head'].includes(req.method.toLowerCase())
  if (!isGET) {
    return res.status(404).send('Not found')
  }

  res.setHeader('content-type', 'text/plain')

  return res.status(200).send(robotsTxt)
}
