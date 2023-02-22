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
  'fragment ContentBlockFields on ContentBlock {\n  __typename\n  name\n  renderedHtml\n  blockEditorCategoryName\n}':
    types.ContentBlockFieldsFragmentDoc,
  'fragment ContentNodeFields on ContentNode {\n  id\n  uri\n  desiredSlug\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}':
    types.ContentNodeFieldsFragmentDoc,
  'fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}':
    types.ContentTypeFieldsFragmentDoc,
  'fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}':
    types.FeaturedImageFieldsFragmentDoc,
  'fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}':
    types.SettingsFragmentDoc,
  'fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  title\n  uri\n  sourceUrl(size: FULLSCREEN_XLARGE)\n  sizes(size: FULLSCREEN_XLARGE)\n  srcSet(size: FULLSCREEN_XLARGE)\n  src: sourceUrl(size: FULLSCREEN_SMALL)\n}':
    types.MediaItemFieldsFragmentDoc,
  'fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      id\n      path\n      label\n      linkRelationship\n      target\n      parentId\n      childItems {\n        nodes {\n          id\n          path\n          cssClasses\n          label\n          linkRelationship\n          target\n          parentId\n        }\n      }\n    }\n  }\n}':
    types.MenuItemsFragmentDoc,
  'fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}':
    types.PageInfoFragmentDoc,
  'query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}':
    types.AllContentTypesDocument,
  'query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}':
    types.AllMediaItemsDocument,
  'query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}':
    types.AllPagesDocument,
  'query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}':
    types.ContentNodeBySlugDocument,
  'query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}':
    types.ContentNodePreviewByIdDocument,
  'query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}':
    types.ContentNodesBySearchTermDocument,
  'query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}':
    types.ContentTypeByNameDocument,
  'query Homepage {\n  nodeByUri(uri: "/") {\n    __typename\n    ... on ContentType {\n      id\n      name\n    }\n    ... on Page {\n      id\n      title\n    }\n  }\n}':
    types.HomepageDocument,
  'query MenuByName($name: ID!) {\n  menu(id: $name, idType: NAME) {\n    id\n    name\n    menuItems(first: 30, where: {parentDatabaseId: 0}) {\n      nodes {\n        ...MenuItem\n        childItems {\n          nodes {\n            ...MenuItem\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  label\n  cssClasses\n  target\n  url\n  id\n}':
    types.MenuByNameDocument,
  'query PostsListByCategoryName($categoryName: String!, $first: Int = 10, $after: String) {\n  posts(\n    first: $first\n    after: $after\n    where: {categoryName: $categoryName, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      id\n      uri\n      title\n      date\n      featuredImage {\n        node {\n          ...MediaItemFields\n        }\n      }\n    }\n  }\n}':
    types.PostsListByCategoryNameDocument,
  'query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n  }\n}':
    types.SinglePageDocument,
  'query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_NAVIGATION}) {\n    nodes {\n      key: id\n      parentId\n      title: label\n      url\n    }\n  }\n}':
    types.SiteMenusDocument,
  'query SiteSettings {\n  wpSettings: generalSettings {\n    title\n    description\n  }\n}':
    types.SiteSettingsDocument,
  'query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n    }\n  }\n}':
    types.TaxonomyArchiveDocument,
  'query WpControls($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    __typename\n    ... on ContentNode {\n      databaseId\n    }\n  }\n  viewer {\n    id\n    nicename\n    avatar(size: 20) {\n      url\n      width\n      height\n    }\n  }\n}':
    types.WpControlsDocument,
  'query WPSeo($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    ... on NodeWithTitle {\n      title\n    }\n    ... on Category {\n      name\n      description\n    }\n    ... on NodeWithContentEditor {\n      content\n    }\n    ... on NodeWithExcerpt {\n      excerpt\n    }\n    ... on NodeWithFeaturedImage {\n      featuredImage {\n        node {\n          id\n          sourceUrl(size: FULLSCREEN_XLARGE)\n        }\n      }\n    }\n  }\n}':
    types.WpSeoDocument,
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
  source: 'fragment ContentBlockFields on ContentBlock {\n  __typename\n  name\n  renderedHtml\n  blockEditorCategoryName\n}',
): (typeof documents)['fragment ContentBlockFields on ContentBlock {\n  __typename\n  name\n  renderedHtml\n  blockEditorCategoryName\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ContentNodeFields on ContentNode {\n  id\n  uri\n  desiredSlug\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}',
): (typeof documents)['fragment ContentNodeFields on ContentNode {\n  id\n  uri\n  desiredSlug\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}',
): (typeof documents)['fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}',
): (typeof documents)['fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}']
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
  source: 'fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  title\n  uri\n  sourceUrl(size: FULLSCREEN_XLARGE)\n  sizes(size: FULLSCREEN_XLARGE)\n  srcSet(size: FULLSCREEN_XLARGE)\n  src: sourceUrl(size: FULLSCREEN_SMALL)\n}',
): (typeof documents)['fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  title\n  uri\n  sourceUrl(size: FULLSCREEN_XLARGE)\n  sizes(size: FULLSCREEN_XLARGE)\n  srcSet(size: FULLSCREEN_XLARGE)\n  src: sourceUrl(size: FULLSCREEN_SMALL)\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      id\n      path\n      label\n      linkRelationship\n      target\n      parentId\n      childItems {\n        nodes {\n          id\n          path\n          cssClasses\n          label\n          linkRelationship\n          target\n          parentId\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      id\n      path\n      label\n      linkRelationship\n      target\n      parentId\n      childItems {\n        nodes {\n          id\n          path\n          cssClasses\n          label\n          linkRelationship\n          target\n          parentId\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}',
): (typeof documents)['fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}',
): (typeof documents)['query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}',
): (typeof documents)['query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}',
): (typeof documents)['query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}',
): (typeof documents)['query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}',
): (typeof documents)['query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}',
): (typeof documents)['query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}',
): (typeof documents)['query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Homepage {\n  nodeByUri(uri: "/") {\n    __typename\n    ... on ContentType {\n      id\n      name\n    }\n    ... on Page {\n      id\n      title\n    }\n  }\n}',
): (typeof documents)['query Homepage {\n  nodeByUri(uri: "/") {\n    __typename\n    ... on ContentType {\n      id\n      name\n    }\n    ... on Page {\n      id\n      title\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query MenuByName($name: ID!) {\n  menu(id: $name, idType: NAME) {\n    id\n    name\n    menuItems(first: 30, where: {parentDatabaseId: 0}) {\n      nodes {\n        ...MenuItem\n        childItems {\n          nodes {\n            ...MenuItem\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  label\n  cssClasses\n  target\n  url\n  id\n}',
): (typeof documents)['query MenuByName($name: ID!) {\n  menu(id: $name, idType: NAME) {\n    id\n    name\n    menuItems(first: 30, where: {parentDatabaseId: 0}) {\n      nodes {\n        ...MenuItem\n        childItems {\n          nodes {\n            ...MenuItem\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  label\n  cssClasses\n  target\n  url\n  id\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query PostsListByCategoryName($categoryName: String!, $first: Int = 10, $after: String) {\n  posts(\n    first: $first\n    after: $after\n    where: {categoryName: $categoryName, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      id\n      uri\n      title\n      date\n      featuredImage {\n        node {\n          ...MediaItemFields\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['query PostsListByCategoryName($categoryName: String!, $first: Int = 10, $after: String) {\n  posts(\n    first: $first\n    after: $after\n    where: {categoryName: $categoryName, orderby: {field: DATE, order: DESC}}\n  ) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      id\n      uri\n      title\n      date\n      featuredImage {\n        node {\n          ...MediaItemFields\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n  }\n}',
): (typeof documents)['query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_NAVIGATION}) {\n    nodes {\n      key: id\n      parentId\n      title: label\n      url\n    }\n  }\n}',
): (typeof documents)['query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_NAVIGATION}) {\n    nodes {\n      key: id\n      parentId\n      title: label\n      url\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SiteSettings {\n  wpSettings: generalSettings {\n    title\n    description\n  }\n}',
): (typeof documents)['query SiteSettings {\n  wpSettings: generalSettings {\n    title\n    description\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query WpControls($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    __typename\n    ... on ContentNode {\n      databaseId\n    }\n  }\n  viewer {\n    id\n    nicename\n    avatar(size: 20) {\n      url\n      width\n      height\n    }\n  }\n}',
): (typeof documents)['query WpControls($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    __typename\n    ... on ContentNode {\n      databaseId\n    }\n  }\n  viewer {\n    id\n    nicename\n    avatar(size: 20) {\n      url\n      width\n      height\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query WPSeo($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    ... on NodeWithTitle {\n      title\n    }\n    ... on Category {\n      name\n      description\n    }\n    ... on NodeWithContentEditor {\n      content\n    }\n    ... on NodeWithExcerpt {\n      excerpt\n    }\n    ... on NodeWithFeaturedImage {\n      featuredImage {\n        node {\n          id\n          sourceUrl(size: FULLSCREEN_XLARGE)\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['query WPSeo($uri: String!) {\n  nodeByUri(uri: $uri) {\n    id\n    ... on NodeWithTitle {\n      title\n    }\n    ... on Category {\n      name\n      description\n    }\n    ... on NodeWithContentEditor {\n      content\n    }\n    ... on NodeWithExcerpt {\n      excerpt\n    }\n    ... on NodeWithFeaturedImage {\n      featuredImage {\n        node {\n          id\n          sourceUrl(size: FULLSCREEN_XLARGE)\n        }\n      }\n    }\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
