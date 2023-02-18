/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  'fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}':
    types.ContentBlockFieldsFragmentDoc,
  'fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}':
    types.ContentNodeFieldsFragmentDoc,
  'fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}':
    types.ContentTypeFieldsFragmentDoc,
  'fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}':
    types.FeaturedImageFieldsFragmentDoc,
  'fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}':
    types.SettingsFragmentDoc,
  'fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}':
    types.MediaItemFieldsFragmentDoc,
  'fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n\nfragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}':
    types.MenuItemFragmentDoc,
  'fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}':
    types.PageInfoFragmentDoc,
  '\n    fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}\n    ':
    types.ContentBlockFieldsFragmentDoc,
  '\n    fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}\n    ':
    types.ContentNodeFieldsFragmentDoc,
  '\n    fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}\n    ':
    types.PageInfoFragmentDoc,
  '\n    fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}\n    \n':
    types.ContentTypeFieldsFragmentDoc,
  '\n    fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}\n    ':
    types.FeaturedImageFieldsFragmentDoc,
  '\n    fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}\n    ':
    types.SettingsFragmentDoc,
  '\n    fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}\n    ':
    types.MediaItemFieldsFragmentDoc,
  '\n    fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n    ':
    types.MenuItemFragmentDoc,
  '\n    fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}\n    ':
    types.MenuItemsFragmentDoc,
  '\n    query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}\n    ':
    types.AllContentTypesDocument,
  '\n    query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}\n    ':
    types.AllPagesDocument,
  '\n    query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}\n    ':
    types.ContentNodeBySlugDocument,
  '\n    query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}\n    ':
    types.ContentNodePreviewByIdDocument,
  '\n    query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n':
    types.ContentNodesBySearchTermDocument,
  '\n    query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}\n    ':
    types.ContentTypeByNameDocument,
  '\n    query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}\n    ':
    types.FrontPageDocument,
  '\n    query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n':
    types.AllMediaItemsDocument,
  '\n    query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}\n    ':
    types.SinglePageDocument,
  '\n    query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}\n    ':
    types.SiteMenusDocument,
  '\n    query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}\n    \n':
    types.SitewideDocument,
  '\n    query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}\n    ':
    types.TaxonomyArchiveDocument,
  'query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}':
    types.AllContentTypesDocument,
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
  'query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}':
    types.FrontPageDocument,
  'query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}':
    types.AllMediaItemsDocument,
  'query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}':
    types.SinglePageDocument,
  'query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}':
    types.SiteMenusDocument,
  'query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}':
    types.SitewideDocument,
  'query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}':
    types.TaxonomyArchiveDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
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
  source: 'fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}',
): (typeof documents)['fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}',
): (typeof documents)['fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}']
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
  source: 'fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}',
): (typeof documents)['fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n\nfragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n\nfragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}']
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
  source: '\n    fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}\n    ',
): (typeof documents)['\n    fragment ContentBlockFields on ContentBlock {\n  attributes {\n    name\n    value\n  }\n  innerHTML(removeWrappingTag: true)\n  name\n  tagName\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}\n    ',
): (typeof documents)['\n    fragment ContentNodeFields on ContentNode {\n  id\n  ... on NodeWithContentEditor {\n    contentBlocks {\n      isGutenberg\n      blocks {\n        ...ContentBlockFields\n        innerBlocks {\n          ...ContentBlockFields\n        }\n      }\n    }\n  }\n  contentType {\n    node {\n      id\n      name\n    }\n  }\n  databaseId\n  dateGmt\n  isPreview\n  link\n  modifiedGmt\n  ... on NodeWithTitle {\n    title\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}\n    ',
): (typeof documents)['\n    fragment PageInfo on WPPageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}\n    \n',
): (typeof documents)['\n    fragment ContentTypeFields on ContentType {\n  id\n  contentNodes(after: $after, before: $before, first: $first, last: $last) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n  description\n  name\n}\n    \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}\n    ',
): (typeof documents)['\n    fragment FeaturedImageFields on NodeWithFeaturedImageToMediaItemConnectionEdge {\n  node {\n    altText\n    sourceUrl(size: LARGE)\n    mediaDetails {\n      height\n      width\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}\n    ',
): (typeof documents)['\n    fragment Settings on GeneralSettings {\n  dateFormat\n  description\n  language\n  timeFormat\n  title\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}\n    ',
): (typeof documents)['\n    fragment MediaItemFields on MediaItem {\n  id\n  altText\n  caption\n  databaseId\n  date\n  mediaDetails {\n    height\n    width\n  }\n  sourceUrl\n  title\n  uri\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n    ',
): (typeof documents)['\n    fragment MenuItem on MenuItem {\n  id\n  path\n  label\n  url\n  linkRelationship\n  target\n  parentId\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}\n    ',
): (typeof documents)['\n    fragment MenuItems on Menu {\n  count\n  menuItems {\n    nodes {\n      ...MenuItem\n      childItems {\n        nodes {\n          ...MenuItem\n        }\n      }\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query AllContentTypes($after: String, $before: String, $first: Int = 1, $last: Int) {\n  contentTypes(first: 50) {\n    nodes {\n      ...ContentTypeFields\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query AllPages {\n  pages {\n    nodes {\n      slug\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query ContentNodeBySlug($slug: String!) {\n  contentNodes(where: {name: $slug}) {\n    nodes {\n      ...ContentNodeFields\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}\n    ',
): (typeof documents)['\n    query ContentNodePreviewById($id: ID!) {\n  contentNode(asPreview: true, id: $id, idType: DATABASE_ID) {\n    ...ContentNodeFields\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n',
): (typeof documents)['\n    query ContentNodesBySearchTerm($after: String, $before: String, $first: Int, $last: Int, $search: String!) {\n  contentNodes(\n    after: $after\n    before: $before\n    first: $first\n    last: $last\n    where: {search: $search}\n  ) {\n    nodes {\n      ...ContentNodeFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}\n    ',
): (typeof documents)['\n    query ContentTypeByName($after: String, $before: String, $first: Int, $last: Int, $name: ID!) {\n  contentType(id: $name, idType: NAME) {\n    ...ContentTypeFields\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}\n    ',
): (typeof documents)['\n    query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n',
): (typeof documents)['\n    query AllMediaItems($after: String, $first: Int = 10) {\n  mediaItems(after: $after, first: $first) {\n    nodes {\n      ...MediaItemFields\n    }\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n    \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}\n    \n',
): (typeof documents)['\n    query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}\n    \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}\n    ',
): (typeof documents)['\n    query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}\n    ']
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
  source: 'query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}',
): (typeof documents)['query FrontPage {\n  post(id: "/", idType: URI) {\n    id\n    databaseId\n    title\n    uri\n  }\n}']
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
  source: 'query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}',
): (typeof documents)['query SinglePage($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    title(format: RENDERED)\n    content(format: RENDERED)\n    databaseId\n    uri\n    featuredImage {\n      ...FeaturedImageFields\n    }\n    seo {\n      fullHead\n      title\n      metaDesc\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}',
): (typeof documents)['query SiteMenus {\n  headerMenu: menuItems(where: {location: PRIMARY_MENU}) {\n    edges {\n      node {\n        ...MenuItem\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}',
): (typeof documents)['query Sitewide {\n  generalSettings {\n    ...Settings\n  }\n  headerMenu: menu(id: "Header", idType: NAME) {\n    ...MenuItems\n  }\n  footerMenu: menu(id: "Footer", idType: NAME) {\n    ...MenuItems\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}',
): (typeof documents)['query TaxonomyArchive($category: String!) {\n  posts(where: {categoryName: $category}) {\n    nodes {\n      title(format: RENDERED)\n      excerpt(format: RENDERED)\n      uri\n      featuredImage {\n        ...FeaturedImageFields\n      }\n      categories {\n        edges {\n          node {\n            name\n            uri\n          }\n        }\n      }\n      seo {\n        fullHead\n        title\n        metaDesc\n      }\n    }\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
