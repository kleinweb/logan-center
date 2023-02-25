// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

// next.config.js
// ==============
// https://nextjs.org/docs/api-reference/next.config.js/introduction
//
// IMPORTANT: next.config.js is not parsed by Webpack, Babel, or Typescript.
// Avoid language features that are not available in your target Node.js version.
// Do not change the file extenstion to .ts.

// Next.js currently doesn't have a good way to match all paths including the
// root, so we need to use a special regex path.
// const allPathsIncludingRoot = '/:path*{/}?'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode
  // =================
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  //
  // Be prepared for future breaking changes in React.
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  // Redirects
  // =========
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  // FIXME: this probably needs adjustment
  // FIXME: at the very lest, `wordPressEndpoint` is not correct given the core-in-subdir setup
  // async redirects() {
  //   return [
  //     {
  //       source: allPathsIncludingRoot,
  //       destination: `${wordPressEndpoint}/:path*`,
  //       has: [
  //         {
  //           type: 'query',
  //           key: 'preview',
  //           value: 'true',
  //         },
  //       ],
  //       permanent: false,
  //     },
  //     {
  //       source: allPathsIncludingRoot,
  //       destination: `${wordPressEndpoint}/:path*`,
  //       has: [
  //         {
  //           type: 'query',
  //           key: 'p',
  //         },
  //       ],
  //       permanent: false,
  //     },
  //   ]
  // },

  // Image Optimization
  // ==================
  // https://nextjs.org/docs/basic-features/image-optimization
  //
  // The next/image, is an extension of the HTML <img> element, evolved for
  // the modern web. It includes a variety of built-in performance
  // optimizations to help you achieve good Core Web Vitals.
  //
  // NOTE: At the time of writing (2023-02-21), these are equivalent to the default values.
  // They are re-defined here for the purpose of running tests in isolation.
  images: {
    // If you know the expected device widths of your users, you can specify a
    // list of device width breakpoints using the deviceSizes property here.
    // These widths are used to help the next/image component generate srcsets.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // The reason there are two separate lists is that imageSizes is only used
    // for images which provide a sizes prop, which indicates that the image
    // is less than the full width of the screen. Therefore, the sizes in
    // imageSizes should all be smaller than the smallest size in deviceSizes.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // remotePatterns: [
    //   {protocol: 'https', hostname: '**.templelogancenter.org'},
    //   {
    //     protocol: 'https',
    //     hostname: new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname,
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: '*.gravatar.com',
    //   },
    // ],
  },

  // Trailing slash
  // ==============
  // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
  //
  // WPVIP: Setting this value to `true` is not recommended at this time.
  //
  // > Next.js has support for trailing slashes, but its implementation is
  // > buggy.
  //
  // <https://github.com/Automattic/vip-go-nextjs-skeleton/tree/example/custom-server-trailing-slash>
  // trailingSlash: false,

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
