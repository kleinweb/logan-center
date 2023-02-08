// SPDX-FileCopyrightText: 2022-2023 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later

// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_URL
          ? process.env.NEXT_PUBLIC_WORDPRESS_URL.replace('https://', '')
          : 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: true,
      },
    ]
  },
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
