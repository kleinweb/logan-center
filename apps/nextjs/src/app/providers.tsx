'use client'

import React from 'react'
import Head from 'next/head'

import Telemetry from './client-telemetry'
import DefaultTags from './default-tags'

export function Providers({children}) {
  return (
    <>
      <Head>
        <DefaultTags />
      </Head>
      <Telemetry />
      {children}
    </>
  )
}
