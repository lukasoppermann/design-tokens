export const filterByPrefix = (prefixArray: string[]) => node => {
  // abort if wrong argument
  if (!Array.isArray(prefixArray)) return
  // extract prefix from node name
  const nodePrefix = node.name.substr(0, node.name.indexOf('/')).replace(/\s+/g, '')
  // abort if no prefix
  if (nodePrefix.length === 0) return
  // return array
  return prefixArray.includes(nodePrefix)
}
