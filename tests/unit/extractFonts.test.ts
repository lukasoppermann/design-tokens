import extractFonts from '../../src/extractor/extractFonts'
import { textStyleObjects } from './data/textStyleObjects.data'

describe('extracting fonts', () => {
  test('extract only valid fonts', () => {
    expect(extractFonts(textStyleObjects)).toStrictEqual([{
      category: 'font',
      description: 'a font style',
      name: 'fonts/basic',
      values: {
        fontSize: {
          value: 16,
          unit: 'pixel',
          type: 'number'
        },
        textDecoration: {
          value: "none",
          type: 'string'
        },
        fontFamily: {
          value: "Helvetica",
          type: 'string'
        },
        fontStyle: {
          value: 'slanted',
          type: 'string'
        },
        letterSpacing: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        },
        lineHeight: {
          value: 5,
          unit: 'pixel',
          type: 'number'
        },
        paragraphIndent: {
          value: 3,
          unit: 'pixel',
          type: 'number'
        },
        paragraphSpacing: {
          value: 2,
          unit: 'pixel',
          type: 'number'
        },
        textCase: {
          value: "uppercase",
          type: 'string'
        }
      }
    },
    {
      category: 'font',
      description: undefined,
      name: 'fonts/no description',
      values: {
        fontSize: {
          value: 12,
          unit: 'pixel',
          type: 'number'
        },
        textDecoration: {
          value: "underline",
          type: 'string'
        },
        fontFamily: {
          value: "Helvetica",
          type: 'string'
        },
        fontStyle: {
          value: 'slanted',
          type: 'string'
        },
        letterSpacing: {
          value: 120,
          unit: 'percent',
          type: 'number'
        },
        lineHeight: {
          value: 'normal',
          unit: 'auto',
          type: 'string'
        },
        paragraphIndent: {
          value: 3,
          unit: 'pixel',
          type: 'number'
        },
        paragraphSpacing: {
          value: 2,
          unit: 'pixel',
          type: 'number'
        },
        textCase: {
          value: "none",
          type: 'string'
        }
      }
    }
  ])
  })
})
