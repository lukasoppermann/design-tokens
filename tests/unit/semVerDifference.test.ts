import semVerDifference from '../../src/utilities/semVerDifference'

describe("Testing semVerDifference", () => {
  test("Wrong order of version number", () => {
    expect(semVerDifference('0.4.0', '0.5.0')).toStrictEqual(undefined)
  })
  test("Same version number", () => {
    expect(semVerDifference('0.5.0', '0.5.0')).toStrictEqual(undefined)
  })
  test("No prev version defined", () => {
    expect(semVerDifference('1.0.1')).toStrictEqual('patch')
  })
  test("major version increase", () => {
    expect(semVerDifference('1.0.0', '0.5.0')).toStrictEqual('major')
  })
  test("minor version increase", () => {
    expect(semVerDifference('0.6.1', '0.5.0')).toStrictEqual('minor')
  })
  test("patch version increase", () => {
    expect(semVerDifference('0.5.1', '0.5.0')).toStrictEqual('patch')
  })
})
