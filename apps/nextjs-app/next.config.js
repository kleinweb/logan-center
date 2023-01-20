// SPDX-FileCopyrightText: 2022-2023 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
