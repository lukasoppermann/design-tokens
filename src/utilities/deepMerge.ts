/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
const deepMerge = (target, source) => {
  // function to test if a variable is an object
  const isObject = (obj) => obj && typeof obj === 'object'
  // make sure both the target and the source are objects
  // otherwise return source
  if (!isObject(target) || !isObject(source)) {
    return source
  }
  // iterate over source
  Object.keys(source).forEach(key => {
    // get values from both target and source for the given key
    const targetValue = target[key]
    const sourceValue = source[key]
    // merge both values
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })
  // return merge object
  return target
}

export default deepMerge
