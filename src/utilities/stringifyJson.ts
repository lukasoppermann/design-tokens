export const stringifyJson = (object, compression = true): string => {
  if (compression === true) {
    return JSON.stringify(object)
  }
  // return uncompressed json
  return JSON.stringify(object, null, 2)
}
