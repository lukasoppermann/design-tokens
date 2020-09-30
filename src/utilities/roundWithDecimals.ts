/**
 * If the provided value is a number
 * it is rounded to 3 decimal positions
 * otherwise it is returned as is
 * @param value number
 * @param decimalPlaces int
 */
const roundWithDecimals = (value: number, decimalPlaces: number = 2) => {
  // check for correct inputs
  if (typeof value === 'number' && typeof decimalPlaces === 'number') {
    // set decimal places
    const factorOfTen = Math.pow(10, decimalPlaces)
    // round result and return
    return Math.round(value * factorOfTen) / factorOfTen
  }
  // return original value of wrong arguments provided
  return value
}


const round = (number, decimalPlaces) => {
  const factorOfTen = Math.pow(10, decimalPlaces)
  return Math.round(number * factorOfTen) / factorOfTen
}

export default roundWithDecimals