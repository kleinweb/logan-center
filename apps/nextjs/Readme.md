# Logan Center Next.js Frontend

## Setup

## Getting started

### Install dependencies

```sh
npm install
```

### Local configuration

TODO: Add section about using DDEV.

You should now be able to access:

- Next.js front-end via [http://localhost:3000][local-nextjs]
- WordPress backend via [http://localhost:8888/wp-admin][local-wordpress] with the [default credentials][wpenv-credentials]:

  - Username: `admin`
  - Password: `password`

### Remote configuration

Copy `.env.example` to `.env` and edit its values to point to
the destinations appropriate for your development environment.
For local development, the default values should already be correct.

- `NEXT_PUBLIC_WORDPRESS_ENDPOINT`: The full URL to the WordPress server installation,
  including protocol (and subdirectory, if applicable).
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT`: The full URL, including protocol, of your WPGraphQL endpoint.
  You can find it in the WordPress Admin Dashboard > Settings > VIP Decoupled.
  By default in `.env.example`, this value will based on the value of `NEXT_PUBLIC_WORDPRESS_ENDPOINT`.
- `NEXT_PUBLIC_SERVER_URL`: The full URL, including protocol, of this Next.js site.
  This allows things like sitemaps and link routing to be configured correctly.

Note that plain permalinks are not supported.
Read the [**Permalink Setup** section below](#permalink-setup)
for supported permalink configurations.

You should also review `wp.config.js` for additional configuration options.

### Development server

Start a development server, with hot-reloading, at
[http://localhost:3000][local-nextjs].

```sh
pnpm dev
```

In some cases you find find that the port number might be `3001` --
this can happen if you have another process already running on `localhost:3000`.
The log output should point you to the correct location.

### Production build

```sh
pnpm build
pnpm start
```

These are likely the exact same commands that will be executed when your
application runs on Netlify. Testing your production build locally is a good step to
take when troubleshooting issues in your production site.

Note that the `build` directory has been added to the `.gitignore` file.
This avoids a steady buildup of build artifacts in the git repository,
but prevents your local build from being pushed to the remote host.
Instead, Netlify will run the build automatically whenever you push up code changes.

## Previewing

Previewing unpublished posts or updates to published posts works out of the box.
Simply click the “Preview” button in WordPress and you’ll be redirected
to a one-time-use preview link on the Next.js site.

## Permalink setup

[Plain permalinks][permalinks-plain] are not recommended or supported.
Any other pretty permalink structure that includes the `%postname%` slug in the
URL are supported.

Examples:

- **Day and name**: `/%year%/%monthnum%/%day%/%postname%/`
- **Month and name**: `/%year%/%monthnum%/%postname%/`
- **Post name**: `/%postname%/`

Pretty permalinks [can be enabled via the WordPress backend][permalinks-setup].

## Gutenberg / Block Editor support

When you query for content (posts, pages, and custom post types),
you'll receive the post content as blocks.
If the content was written with WordPress's [block editor][gutenberg] (Gutenberg),
these blocks will correspond directly with the blocks you see in the editor.
The block data you will receive roughly matches
the output of WordPress’s [`parse_blocks` function][parse-blocks],
with some enhancements. To learn more, you can follow how block data is parsed and
resolved in [WordPress VIP's extension of WPGraphQL][content-blocks].

Receiving the content as blocks allow you to easily create customizations
defining the related component for each block type.
This project provides a mapping for basic components like
headings, paragraphs, lists, and tables (see [`'@components/Blocks/index.tsx'`](https://github.com/Automattic/vip-go-nextjs-skeleton/blob/trunk/components/Blocks/index.tsx)).

Here is a simple example of how to override the default block mapping
to support all of the default and custom blocks that you use in your WordPress instance:

```tsx
import PostContent from '@/lib/components'
import MyCustomHeader from 'my-design-system'

export default function Post(props: Props) {
  return (
    <main>
      <h1>{props.title}</h1>
      <PostContent
        blockMapOverrides={{
          'core/heading': MyCustomHeader,
        }}
        blocks={props.blocks}
      />
    </main>
  )
}
```

If you used WordPress's [classic editor][classic-editor],
you will receive a single block representing the HTML content of the entire post.
A `ClassicEditorBlock` component is provided to render these blocks.

### Unsupported Blocks

In order to help you identify blocks that have not yet been mapped to a React component,
you will see an "Unsupported block" notice when running the development server (`pnpm dev`).
This notice is suppressed in production and the block is _ignored_.

## Internal Link Routing

When writing code that links to another page in your Next.js application,
you should use Next.js's [`Link` component][nextjs-link] so that the request is
routed client-side without a full round-trip to the server.

However, when user-authored blocks contain links, the `innerHTML` is handled by React
and you don't have an opportunity to use the `Link` component.
To address this, we [listen for link clicks][link-listener] and will route them client-side
if the link destination is determined to be internal.
You can configure which hostnames are considered internal in [`lib/config`][lib-config].

## Data Fetching

Next.js is optimized to create performant pages that are
statically generated at build time ([`getStaticProps`][nextjs-gsp])
or server-side-rendered at request time ([`getServerSideProps`][nextjs-gssp]).
This results in HTML that is cacheable at the edge (e.g. Netlify, Vercel, Cloudflare, etc.)
and immediately crawlable by search engine bots -- both critically
important factors in the performance and success of sites.

This project uses [Apollo][apollo] to query for data using GraphQL,
and it is configured and ready to use.
Note that Apollo hooks (e.g., `useQuery`) are not compatible with
`getStaticProps` or `getServerSideProps`.

### Client-side Data Fetching

Many Apollo implementations, including Next.js’s official examples,
implement a complex, isomorphic approach that bootstraps and hydrates
the data from the server-side render into an in-memory cache,
where it can be used for client-side requests.
We have intentionally avoided this approach because
it introduces a large performance penalty and increases the risk
that performance degrades even more over time.

Before adding client-side data fetching,
examine your typical user flows in detail and consider whether it truly benefits
your application and its users.
Skipping this complicated step simplifies your configuration,
decreases page weight, and usually increases overall performance.
If you absolutely need to perform client-side data fetching, an `ApolloProvider`
is exported and ready to use in [`graphql-provider`][apollo-provider].
Note that data from the server-side render will not be hydrated into the store.

### Code Generation

Our project has a code generation step that examines
the GraphQL queries in `./graphql/queries/`, introspects your GraphQL schema,
and generates TypeScript code that can be used to load data via Apollo.
See [`LatestContent`][latest-content] for an example of using generated code
with `getStaticProps` and [`Post`][post] for an example with `getServerSideProps`.

Having declared types across the entire scope of data fetching chain—queries,
responses, and React component props is incredibly powerful
and provides confidence as you build your site.
Code generation runs automatically on all GraphQL queries in `./graphql/queries/`
whenever you start the development server or build the application.

If you need to run the generation manually, you can use:

```sh
pnpm codegen
```

In development, if you make changes or additions to your queries,
you will need to restart the development server to see those changes reflected.

## Caching

**WARNING: This section only applies to WordPress VIP hosting.**

Responses from Next.js are cached by [VIP's page cache][page-cache]
for five minutes by default, [overriding the default behavior of Next.js][cache-config]
to help avoid invalidation issues.

As `POST` requests, GraphQL queries are not cached.
However, when using static or server-side data loading — which is strongly
recommended — these queries are effectively cached by the page cache.

## Next.js middleware and edge runtime

**WARNING: This section only applies to WordPress VIP hosting.**

Next.js offers a way to implement [middleware][middleware], which can be a great
way to separate logic from presentation. Additionally, this middleware can
target an ["edge runtime"][edge-runtime] on some platforms (for example,
Vercel’s "edge functions"). Middleware is supported on WordPress VIP, but will not run at
the edge. Instead, middleware runs on your origin servers with the rest of your
application.

This project uses middleware (`.pages/_middleware.ts`) to implement the [healthcheck endpoint][healthcheck] required by WordPress VIP's platform. Middleware is a great way to solve for use cases that would otherwise require a [custom server][nextjs-custom-server].

## Serverless functions

**WARNING: This section only applies to WordPress VIP hosting.**

"Serverless" functions that live in `/pages/api/` and target Node.js (via
JavaScript or TypeScript) are supported on WordPress VIP. Just like middleware, they will
run on your origin servers.

## Sitemap and syndication (RSS) feeds

WordPress has provided a default sitemap since version 5.5, and there are many
plugins that provide this functionality as well. Rather than recreate sitemaps
in Next.js, we recommend that you point to the sitemaps produced by WordPress.
If the permalinks generated by WordPress point to your decoupled front-end (and
they should!), this will work seamlessly. Google and other search engines will
happily crawl [sitemaps on other domains][sitemap-google], provided you point
them there. The `robots.txt` provided by this project does just that (see
`./pages/api/robots.ts`).

Feeds can be linked by passing a `feedLink` prop to the `Page` component. Again,
we recommend pointing to the feeds that are already being generated by
WordPress.

## TypeScript

This project is written in [TypeScript][typescript].
Next.js has [built-in support for TypeScript][nextjs-ts] and processes it automatically
in both development and production.

## Tests

There is support for tests using [Jest][jest]. Some basic unit tests are provided for project code and carry a `.test.ts` extension. Run tests using:

```sh
pnpm test
```

## Image optimization

The Next.js `Image` component, [next/image][nextjs-image], is an extension of
the HTML `<img />` element, evolved for the modern web. It includes a variety of
built-in performance optimizations. Next.js will automatically determine the
width and height of your image based on the imported file.

For the API images, the `srcSet` property is automatically defined by the
`deviceSizes` and `imageSizes` properties added to the `next.config.js` file. If
you need to manually set the `srcSet` for a particular image, you should use the
`<img />` HTML tag instead.

[apollo]: https://www.apollographql.com
[apollo-provider]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/graphql/apollo-provider.tsx
[block-attributes]: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/
[bundle]: https://github.com/Automattic/vip-decoupled-bundle
[cache-config]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/next.config.js#L34-L51
[classic-editor]: https://wordpress.com/support/classic-editor-guide/
[code-generation]: https://www.graphql-code-generator.com
[content-blocks]: https://github.com/Automattic/vip-decoupled-bundle/blob/trunk/blocks/blocks.php
[edge-runtime]: https://nextjs.org/docs/api-reference/edge-runtime
[eslint-config]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/.eslintrc
[feed-redirect]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/next.config.js#L95-L100
[gutenberg]: https://developer.wordpress.org/block-editor/
[healthcheck]: https://docs.wpvip.com/technical-references/vip-platform/node-js/#h-requirement-1-exposing-a-health-route
[image-optimization]: https://nextjs.org/docs/basic-features/image-optimization#styling
[jest]: https://jestjs.io
[latest-content]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/pages/latest/%5Bcontent_type%5D.tsx
[lib-config]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/lib/config.ts
[link-listener]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/lib/hooks/useInternalLinkRouting.ts
[local-nextjs]: http://localhost:3000
[local-wordpress]: http://localhost:8888/wp-admin
[middleware]: https://nextjs.org/docs/middleware
[nextjs]: https://nextjs.org
[nextjs-custom-server]: https://nextjs.org/docs/advanced-features/custom-server
[nextjs-eslint]: https://nextjs.org/docs/basic-features/eslint
[nextjs-gsp]: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
[nextjs-gssp]: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
[nextjs-image]: https://nextjs.org/docs/api-reference/next/image
[nextjs-link]: https://nextjs.org/docs/api-reference/next/link
[nextjs-ts]: https://nextjs.org/docs/basic-features/typescript
[output-file-tracing]: https://nextjs.org/docs/advanced-features/output-file-tracing
[page-cache]: https://docs.wpvip.com/technical-references/caching/page-cache/
[parse-blocks]: https://github.com/WordPress/wordpress-develop/blob/5.8.1/src/wp-includes/blocks.php#L879-L891
[post]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/pages/%5B...slug%5D.tsx
[post-content]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/components/PostContent/PostContent.tsx
[sitemap-google]: https://developers.google.com/search/docs/advanced/robots/robots_txt#sitemap
[ts-config]: https://github.com/Automattic/vip-go-nextjs-skeleton/blob/725c0695ad603d2ecc8b56ff1c9f1cad95f5fe98/tsconfig.json
[typescript]: https://www.typescriptlang.org
[webpack5]: https://nextjs.org/docs/messages/webpack5
[wpenv]: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/
[wpenv-credentials]: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#starting-the-environment
[wpgraphql]: https://www.wpgraphql.com
[wpvip]: https://wpvip.com
[permalinks-plain]: https://wordpress.org/support/article/using-permalinks/#plain-permalinks
[permalinks-setup]: https://wordpress.org/support/article/using-permalinks/#choosing-your-permalink-structure-1
