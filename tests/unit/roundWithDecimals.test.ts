import roundWithDecimals from '../../src/utilities/roundWithDecimals'

describe('roundWithDecimals', () => {
  test('1.234 to 1 (0 decimal places)', () => {
    expect(roundWithDecimals(1.234, 0)).toStrictEqual(1)
  })

  test('1.734 to 2 (0 decimal places)', () => {
    expect(roundWithDecimals(1.734, 0)).toStrictEqual(2)
  })

  test('1.234 to 1.234 (4 decimal places)', () => {
    expect(roundWithDecimals(1.234, 4)).toStrictEqual(1.234)
  })

  test('1.234 to 1.23 (2 decimal places)', () => {
    expect(roundWithDecimals(1.234, 2)).toStrictEqual(1.23)
  })

  test('1.234 to 1.23 (undefined = 2 decimal places)', () => {
    expect(roundWithDecimals(1.234, undefined)).toStrictEqual(1.23)
  })

  test('undefined as 1st arg', () => {
    // @ts-ignore
    expect(roundWithDecimals(undefined, undefined)).toStrictEqual()
  })


  test('null for 2ng arg decimal placess', () => {
    const catchError = () => roundWithDecimals(1.234, null)
    expect(catchError).toThrowError(`Invalid parameters, both value "${1.234}" (${typeof 1.234}) and decimalPlaces "${null}" (${typeof null}) must be of type number`)
  })

  test('string as 1st arg', () => {
    // @ts-ignore
    const catchError = () => roundWithDecimals('string', 2)
    expect(catchError).toThrowError(`Invalid parameters, both value "string" (${typeof 'string'}) and decimalPlaces "${2}" (${typeof 2}) must be of type number`)
  })

  test('null as 1st arg', () => {
    // @ts-ignore
    const catchError = () => roundWithDecimals(null, 2)
    expect(catchError).toThrowError(`Invalid parameters, both value "null" (${typeof null}) and decimalPlaces "${2}" (${typeof 2}) must be of type number`)
  })

  test('string for 2ng arg decimal places', () => {
    // @ts-ignore
    const catchError = () => roundWithDecimals(1.234, 'string')
    expect(catchError).toThrowError(`Invalid parameters, both value "1.234" (${typeof 1.234}) and decimalPlaces "string" (${typeof 'string'}) must be of type number`)
  })


})
