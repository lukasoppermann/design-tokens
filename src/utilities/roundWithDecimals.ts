/**
 * If the provided value is a number
 * it is rounded to 3 decimal positions
 * otherwise it is returned as is
 * @param value any
 */
const roundWithDecimals = value => {
  if (typeof value === 'number') {
    return Math.round(value * 1000) / 1000
  }
  return value
}

export default roundWithDecimals