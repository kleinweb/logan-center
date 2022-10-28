// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

import RedisClient, { Redis } from 'ioredis'
import { log } from '@/lib/log'

let redisClient: Redis

export default function getRedisClient(): Redis {
  if (process.env.VIP_REDIS_PRIMARY && !redisClient) {
    const [host, port] = process.env.VIP_REDIS_PRIMARY.split(':')
    const password = process.env.VIP_REDIS_PASSWORD

    log(`Redis: Creating client for ${process.env.VIP_REDIS_PRIMARY}`, {})

    redisClient = new RedisClient({
      host,
      password,
      port: parseInt(port, 10),
    })
  }

  return redisClient
}
