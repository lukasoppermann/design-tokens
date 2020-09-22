const convertSizeUnits = (valueObject: {
  unit: string,
  value: number
} | number ): string | number  => {
  // check if valueObject is a number
  if (typeof valueObject === 'number') {
    return <number>Math.round((valueObject + Number.EPSILON) * 100) / 100
  }
  // otherwise if unit is defined
  if (typeof valueObject === 'object' && valueObject.unit !== undefined) {
    if ( valueObject.unit === "PERCENT" ) {
      return (Math.round((valueObject.value + Number.EPSILON) * 100) / 100) + '%'
    }
    return Math.round((valueObject.value + Number.EPSILON) * 100) / 100
  }
}

export default convertSizeUnits