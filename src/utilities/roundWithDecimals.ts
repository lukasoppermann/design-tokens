/**
 * If the provided value is a number
 * it is rounded to 3 decimal positions
 * otherwise it is returned as is
 * @param value number
 * @param decimalPlaces int
 */
const roundWithDecimals = (value?: number, decimalPlaces: number = 2) => {
  // exit if value is undefined
  if (value === undefined) {
    return
  }
  // check for correct inputs
  if (typeof value !== 'number' || typeof decimalPlaces !== 'number') {
    throw new Error(`Invalid parameters, both value "${value}" (${typeof value}) and decimalPlaces "${decimalPlaces}" (${typeof decimalPlaces}) must be of type number`)
  }
  // set decimal places
  const factorOfTen = Math.pow(10, decimalPlaces)
  // round result and return
  return Math.round(value * factorOfTen) / factorOfTen
}

export default roundWithDecimals