export const filterByPrefix = (prefixArray: string[]) => node => {
  return prefixArray.includes(node.name.substr(0, node.name.indexOf('/')).replace(/\s+/g, ''))
}
