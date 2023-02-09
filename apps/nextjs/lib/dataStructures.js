/**
 * Convert a flat list to a tree.
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
