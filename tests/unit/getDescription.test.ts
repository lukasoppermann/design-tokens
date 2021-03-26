import getDescription from '../../src/transformer/utilities/getDescription'

describe('Testing getDescription', () => {
  test('Valid descriptions', () => {
    const results = [
      getDescription('1'),
      getDescription('t'),
      getDescription(' '),
      getDescription('a string with 😎')
    ]

    const expected = [
      { comment: '1' },
      { comment: 't' },
      { comment: ' ' },
      { comment: 'a string with 😎' }
    ]
    // assertion
    expect(results).toStrictEqual(expected)
  })

  test('Inalid descriptions', () => {
    const results = [
      getDescription(''),
      getDescription(undefined),
      getDescription(null),
      // @ts-ignore
      getDescription(12)
    ]

    const expected = [
      {},
      {},
      {},
      {}
    ]
    // assertion
    expect(results).toStrictEqual(expected)
  })
})
