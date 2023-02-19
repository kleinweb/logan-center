// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
/* eslint-enable no-unused-vars */

export type LogContext = {
  [key: string]: string | number
}

export function log(
  message: string,
  context: LogContext,
  requestContext: LogContext = {},
  level: LogLevel = LogLevel.INFO,
) {
  console.log(
    JSON.stringify({
      context,
      level,
      message,
      requestContext,
      timestamp: Math.round(Date.now() / 1000),
    }),
  )
}

export function logError(
  err: Error,
  context: LogContext,
  requestContext: LogContext = {},
) {
  const message = err.message || 'An unknown error occurred'

  log(message, context, requestContext, LogLevel.ERROR)
}
