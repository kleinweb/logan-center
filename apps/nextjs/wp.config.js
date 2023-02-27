// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error(`
    Please provide a valid URL to a WordPress instance's GraphQL endpoint.
    Add NEXT_PUBLIC_GRAPHQL_ENDPOINT to your environment variables.
  `)
}

// wp.config.js
// ==============
// IMPORTANT: wp.config.js is not parsed by Webpack, Babel, or Typescript.
// Avoid language features that are not available in your target Node.js version.
// Do not change the file extenstion to .ts.

const {hostname: serverDomain} = new URL(process.env.NEXT_PUBLIC_SERVER_URL)

module.exports = {
  // Images
  // ======
  images: {
    // By default, WordPress returns a `srcset` attribute for image blocks. The
    // 'next/image' component, however, ignores this attribute in favor of its
    // own image loading strategy:
    //
    // https://developer.wordpress.org/apis/handbook/responsive-images/
    // https://nextjs.org/docs/api-reference/next/image
    //
    // If you want to use the native <img /> tag and the `srcset` attribute
    // created by WordPress, then set `useHtmlTag` to true.
    useHtmlTag: false,
  },

  // Links
  // =====
  links: {
    // In order to correctly route links that may be hardcoded in content or
    // otherwise use plain <a> tags, we intercept link clicks and inspect them
    // to determine if they are "internal" -- that is, that they belong to this
    // site. This especially helps in local development or staging sites, where
    // you may be loading content from your production CMS but want to route
    // your links locally.
    //
    // Add additional hostnames to the `internalLinkHosts` array as needed.
    // Extend or rewrite this function if you have more custom needs.
    isInternalLink: (hostname, _pathname) => {
      const internalLinkHosts = [serverDomain, 'localhost', '127.0.0.1']
      return internalLinkHosts.includes(hostname)
    },
  },

  endpoints: {
    /**
     * Name of the WordPress site content directory.
     *
     * Corresponds to the WordPress `WP_HOME` constant.
     *
     * - In vanilla WordPress, this would be `wp-content`.
     * - In Roots Bedrock this would be `app` or `public`.
     *
     * @type string
     */
    contentDir: 'app',

    /**
     * WordPress core URL for this environment.
     *
     * Corresponds to the WordPress `SITEURL` constant.
     *
     * @readonly
     * @type string
     */
    core: process.env.NEXT_PUBLIC_WORDPRESS_CORE_URL,

    /**
     * GraphQL endpoint URL for this environment.
     *
     * @readonly
     * @type string
     */
    graphql: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,

    /**
     * Domain name of the content server for this environment.
     *
     * @readonly
     * @type string
     */
    serverDomain,

    /**
     * Content server URL for this environment.
     *
     * Used for previewing, sitemaps, and other functionality that we don't want
     * to replicate in Next.js. By default, assume WPGraphQL is using its
     * default endpoint and just peel off /graphql. Override this value if
     * WordPress is this assumption is incorrect. Omit trailing slash.
     *
     * @readonly
     * @type string
     */
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  },
}
