import convertTokenName from '../../src/utilities/convertTokenName'

describe("convertTokenName", () => {
  test('Spaces & slashes "button / primary"', () => {
    expect(convertTokenName("")).toStrictEqual("")
  })

  test('Slashes without spaces "button/primary"', () => {

  })


  test('Spaces within name part "button / primary button"', () => {

  })

  test('Dashes within name part "button / primary-button"', () => {

  })

  test('Underscore within name part (snake_case) "button / primary_button"', () => {

  })

  test('CamelCase within name part "button / PrimaryButton"', () => {

  })

  test('Uppercase "Button / Primary"', () => {

  })

  test('Dot in name part "Button / Primary.Button"', () => {

  })

  test('Plus in name part "Button / Primary+Button"', () => {

  })

  test('Ampersand in name part "Button / Primary&Button"', () => {

  })

  test('Colon in name part "Button / Primary:Button"', () => {

  })
})
