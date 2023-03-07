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
  '\n  fragment Settings on GeneralSettings {\n    dateFormat\n    description\n    language\n    timeFormat\n    title\n  }\n':
    types.SettingsFragmentDoc,
  '\n  fragment CoverImageFields on MediaItem {\n    altText\n    caption\n    description\n    link\n    mediaDetails {\n      ...MediaItemDetails\n    }\n    mediaItemUrl\n    mediaType\n    sourceUrl\n    title\n    uri\n  }\n':
    types.CoverImageFieldsFragmentDoc,
  '\n  fragment ThumbnailImageFields on MediaItem {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n':
    types.ThumbnailImageFieldsFragmentDoc,
  '\n  fragment MediaItemDetails on MediaDetails {\n    file\n    width\n    height\n    meta {\n      caption\n      copyright\n      credit\n      title\n    }\n  }\n':
    types.MediaItemDetailsFragmentDoc,
  '\n  fragment SinglePageFields on Page {\n    title(format: RENDERED)\n    databaseId\n    uri\n    content(format: RENDERED)\n    editorBlocks {\n      apiVersion\n      name\n      parentId\n      renderedHtml\n    }\n  }\n':
    types.SinglePageFieldsFragmentDoc,
  '\n  fragment TermSummary on TermNode {\n    databaseId\n    description\n    id\n    name\n    uri\n  }\n':
    types.TermSummaryFragmentDoc,
  '\n  query AllPages {\n    pages {\n      nodes {\n        uri\n      }\n    }\n  }\n':
    types.AllPagesDocument,
  '\n  query SinglePage($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...SinglePageFields\n    }\n  }\n':
    types.SinglePageDocument,
  '\n  query CategoryByUri($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n    }\n  }\n':
    types.CategoryByUriDocument,
  '\n  query ProjectSummary($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n      ancestors {\n        edges {\n          node {\n            slug\n            name\n            link\n            uri\n            databaseId\n            description\n          }\n        }\n      }\n      parentDatabaseId\n      uri\n      posts {\n        edges {\n          node {\n            authors {\n              edges {\n                node {\n                  databaseId\n                  description\n                  email\n                  firstName\n                  lastName\n                  nickname\n                  nicename\n                  name\n                  slug\n                  uri\n                }\n              }\n            }\n            dateGmt\n            excerpt\n            featuredImage {\n              node {\n                altText\n                sizes(size: POST_THUMBNAIL)\n              }\n            }\n            slug\n            title(format: RENDERED)\n            uri\n          }\n        }\n      }\n    }\n  }\n':
    types.ProjectSummaryDocument,
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
  source: '\n  fragment Settings on GeneralSettings {\n    dateFormat\n    description\n    language\n    timeFormat\n    title\n  }\n',
): (typeof documents)['\n  fragment Settings on GeneralSettings {\n    dateFormat\n    description\n    language\n    timeFormat\n    title\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CoverImageFields on MediaItem {\n    altText\n    caption\n    description\n    link\n    mediaDetails {\n      ...MediaItemDetails\n    }\n    mediaItemUrl\n    mediaType\n    sourceUrl\n    title\n    uri\n  }\n',
): (typeof documents)['\n  fragment CoverImageFields on MediaItem {\n    altText\n    caption\n    description\n    link\n    mediaDetails {\n      ...MediaItemDetails\n    }\n    mediaItemUrl\n    mediaType\n    sourceUrl\n    title\n    uri\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ThumbnailImageFields on MediaItem {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n',
): (typeof documents)['\n  fragment ThumbnailImageFields on MediaItem {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment MediaItemDetails on MediaDetails {\n    file\n    width\n    height\n    meta {\n      caption\n      copyright\n      credit\n      title\n    }\n  }\n',
): (typeof documents)['\n  fragment MediaItemDetails on MediaDetails {\n    file\n    width\n    height\n    meta {\n      caption\n      copyright\n      credit\n      title\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment SinglePageFields on Page {\n    title(format: RENDERED)\n    databaseId\n    uri\n    content(format: RENDERED)\n    editorBlocks {\n      apiVersion\n      name\n      parentId\n      renderedHtml\n    }\n  }\n',
): (typeof documents)['\n  fragment SinglePageFields on Page {\n    title(format: RENDERED)\n    databaseId\n    uri\n    content(format: RENDERED)\n    editorBlocks {\n      apiVersion\n      name\n      parentId\n      renderedHtml\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TermSummary on TermNode {\n    databaseId\n    description\n    id\n    name\n    uri\n  }\n',
): (typeof documents)['\n  fragment TermSummary on TermNode {\n    databaseId\n    description\n    id\n    name\n    uri\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AllPages {\n    pages {\n      nodes {\n        uri\n      }\n    }\n  }\n',
): (typeof documents)['\n  query AllPages {\n    pages {\n      nodes {\n        uri\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SinglePage($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...SinglePageFields\n    }\n  }\n',
): (typeof documents)['\n  query SinglePage($uri: ID!) {\n    page(id: $uri, idType: URI) {\n      ...SinglePageFields\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CategoryByUri($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n    }\n  }\n',
): (typeof documents)['\n  query CategoryByUri($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ProjectSummary($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n      ancestors {\n        edges {\n          node {\n            slug\n            name\n            link\n            uri\n            databaseId\n            description\n          }\n        }\n      }\n      parentDatabaseId\n      uri\n      posts {\n        edges {\n          node {\n            authors {\n              edges {\n                node {\n                  databaseId\n                  description\n                  email\n                  firstName\n                  lastName\n                  nickname\n                  nicename\n                  name\n                  slug\n                  uri\n                }\n              }\n            }\n            dateGmt\n            excerpt\n            featuredImage {\n              node {\n                altText\n                sizes(size: POST_THUMBNAIL)\n              }\n            }\n            slug\n            title(format: RENDERED)\n            uri\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ProjectSummary($id: ID!) {\n    category(id: $id, idType: URI) {\n      description\n      databaseId\n      name\n      slug\n      ancestors {\n        edges {\n          node {\n            slug\n            name\n            link\n            uri\n            databaseId\n            description\n          }\n        }\n      }\n      parentDatabaseId\n      uri\n      posts {\n        edges {\n          node {\n            authors {\n              edges {\n                node {\n                  databaseId\n                  description\n                  email\n                  firstName\n                  lastName\n                  nickname\n                  nicename\n                  name\n                  slug\n                  uri\n                }\n              }\n            }\n            dateGmt\n            excerpt\n            featuredImage {\n              node {\n                altText\n                sizes(size: POST_THUMBNAIL)\n              }\n            }\n            slug\n            title(format: RENDERED)\n            uri\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
