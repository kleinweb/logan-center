/* eslint-disable */
import * as types from './graphql'
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment CoverImageFields on MediaItem {\n  altText\n  caption\n  description\n  link\n  mediaDetails {\n    ...MediaItemDetails\n  }\n  mediaItemUrl\n  mediaType\n  sourceUrl\n  title\n  uri\n}':
    types.CoverImageFieldsFragmentDoc,
  'fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}':
    types.SettingsFragmentDoc,
  'fragment MediaItemDetails on MediaDetails {\n  file\n  width\n  height\n  meta {\n    caption\n    copyright\n    credit\n    title\n  }\n}':
    types.MediaItemDetailsFragmentDoc,
  'fragment SinglePageFields on Page {\n  title(format: RENDERED)\n  databaseId\n  uri\n  content(format: RENDERED)\n  editorBlocks {\n    apiVersion\n    name\n    parentId\n    renderedHtml\n  }\n}':
    types.SinglePageFieldsFragmentDoc,
  'fragment TermSummary on TermNode {\n  databaseId\n  description\n  id\n  name\n  uri\n}':
    types.TermSummaryFragmentDoc,
  'fragment ThumbnailImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}':
    types.ThumbnailImageFieldsFragmentDoc,
  'query AllPagesPaths {\n  pages {\n    edges {\n      node {\n        uri\n      }\n    }\n  }\n}':
    types.AllPagesPathsDocument,
  'query SinglePage($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    ...SinglePageFields\n  }\n}':
    types.SinglePageDocument,
  'query ThemesLandingPage {\n  themes: categories(where: {parent: 0, excludeTree: "1"}) {\n    edges {\n      node {\n        ...TermSummary\n      }\n    }\n  }\n}':
    types.ThemesLandingPageDocument,
  'query SingleThemePage($id: ID = "") {\n  category(id: $id, idType: URI) {\n    description\n    databaseId\n    name\n    slug\n  }\n}':
    types.SingleThemePageDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment CoverImageFields on MediaItem {\n  altText\n  caption\n  description\n  link\n  mediaDetails {\n    ...MediaItemDetails\n  }\n  mediaItemUrl\n  mediaType\n  sourceUrl\n  title\n  uri\n}',
): (typeof documents)['fragment CoverImageFields on MediaItem {\n  altText\n  caption\n  description\n  link\n  mediaDetails {\n    ...MediaItemDetails\n  }\n  mediaItemUrl\n  mediaType\n  sourceUrl\n  title\n  uri\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}',
): (typeof documents)['fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment MediaItemDetails on MediaDetails {\n  file\n  width\n  height\n  meta {\n    caption\n    copyright\n    credit\n    title\n  }\n}',
): (typeof documents)['fragment MediaItemDetails on MediaDetails {\n  file\n  width\n  height\n  meta {\n    caption\n    copyright\n    credit\n    title\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment SinglePageFields on Page {\n  title(format: RENDERED)\n  databaseId\n  uri\n  content(format: RENDERED)\n  editorBlocks {\n    apiVersion\n    name\n    parentId\n    renderedHtml\n  }\n}',
): (typeof documents)['fragment SinglePageFields on Page {\n  title(format: RENDERED)\n  databaseId\n  uri\n  content(format: RENDERED)\n  editorBlocks {\n    apiVersion\n    name\n    parentId\n    renderedHtml\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment TermSummary on TermNode {\n  databaseId\n  description\n  id\n  name\n  uri\n}',
): (typeof documents)['fragment TermSummary on TermNode {\n  databaseId\n  description\n  id\n  name\n  uri\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ThumbnailImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}',
): (typeof documents)['fragment ThumbnailImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllPagesPaths {\n  pages {\n    edges {\n      node {\n        uri\n      }\n    }\n  }\n}',
): (typeof documents)['query AllPagesPaths {\n  pages {\n    edges {\n      node {\n        uri\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SinglePage($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    ...SinglePageFields\n  }\n}',
): (typeof documents)['query SinglePage($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    ...SinglePageFields\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query ThemesLandingPage {\n  themes: categories(where: {parent: 0, excludeTree: "1"}) {\n    edges {\n      node {\n        ...TermSummary\n      }\n    }\n  }\n}',
): (typeof documents)['query ThemesLandingPage {\n  themes: categories(where: {parent: 0, excludeTree: "1"}) {\n    edges {\n      node {\n        ...TermSummary\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SingleThemePage($id: ID = "") {\n  category(id: $id, idType: URI) {\n    description\n    databaseId\n    name\n    slug\n  }\n}',
): (typeof documents)['query SingleThemePage($id: ID = "") {\n  category(id: $id, idType: URI) {\n    description\n    databaseId\n    name\n    slug\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
