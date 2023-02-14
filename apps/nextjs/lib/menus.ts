import { MenuItem } from '@/graphql/generated'

/**
 * Convert a flat list to a tree.
 *
 * Alternatively, try {@link growMenuTree}
 *
 * @see https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
export function flatListToHierarchical(
  data = [],
  { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {},
) {
  const tree = []
  const childrenOf = {}

  // Loop through each item in the list.
  data.forEach((item) => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })

  return tree
}

/**
 * Feeling adventures? Try this one instead of {@link flatListToHierarchical}
 *
 * TODO: write tests
 * @see {@link <https://github.com/chapter-three/next-drupal/blob/511a94dea1f8bb7bfa78f4595130a31ab9938739/packages/next-drupal/src/get-menu.ts>}
 */
export const growMenuTree = (
  menuItems: MenuItem[],
  parent: MenuItem['id'] = '',
): MenuItem[] =>
  menuItems
    .filter((link) => link.parentId === parent)
    .map((link) => ({
      ...link,
      ...growMenuTree(menuItems, link.id),
    }))
