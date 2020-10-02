import convertTokenName from '../../src/utilities/convertTokenName'

describe("convertTokenName", () => {
  test.each([
    // input, expected
    ["button / primary", "button/primary"],
    // ["button/Primary", "button/primary"],
    ["button / primary button", "button/primary-button"],
    ["button / primary-button", "button/primary-button"],
    ["button / primary_button", "button/primary_button"],
    ["button / PrimaryButton", "button/primaryButton"],
    ["Button / Primary", "button/primary"],
    ["Button / Primary.Button", "button/primary_Button"],
    ["Button / Primary+button", "button/primary_button"],
    ["Button / Primary&Button", "button/primary_Button"],
    ["Button / Primary:button", "button/primary_button"],
    // ["Button / Änderung", "button/anderung"],
    ["Button / ♥", "button/"],
  ])('Converting: "%s"', (input, expected) => {
    expect(convertTokenName(input)).toStrictEqual(expected)
  })
})
