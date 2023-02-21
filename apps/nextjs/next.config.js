// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

// next.config.js
// ==============
// https://nextjs.org/docs/api-reference/next.config.js/introduction
//
// IMPORTANT: next.config.js is not parsed by Webpack, Babel, or Typescript.
// Avoid language features that are not available in your target Node.js version.
// Do not change the file extenstion to .ts.

const {wordPressEndpoint} = require('./wp.config')

// Next.js currently doesn't have a good way to match all paths including the
// root, so we need to use a special regex path.
const allPathsIncludingRoot = '/:path*{/}?'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // <https://beta.nextjs.org/docs/api-reference/next.config.js#typedroutes>
    // typedRoutes: true,
  },

  // TODO: use this
  // analyticsId: '',

  // Base path
  // =========
  // https://nextjs.org/docs/api-reference/next.config.js/basepath
  //
  // Setting a base path is not recommend because it prevents us from serving
  // files at the root, such as 'robots.txt'.
  basePath: '',

  // React strict mode
  // =================
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  //
  // Be prepared for future breaking changes in React.
  reactStrictMode: true,

  // Redirects
  // =========
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  // FIXME: this probably needs adjustment or, more likely, removal
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
  images: {
    // If you know the expected device widths of your users, you can specify a
    // list of device width breakpoints using the deviceSizes property here.
    // These widths are used to help the next/image component generate srcsets.
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // The reason there are two separate lists is that imageSizes is only used
    // for images which provide a sizes prop, which indicates that the image
    // is less than the full width of the screen. Therefore, the sizes in
    // imageSizes should all be smaller than the smallest size in deviceSizes.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
