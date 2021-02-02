export const textStyles = [
  {
    name: 'fonts/basic',
    description: 'a font style',
    type: 'TEXT',
    fontSize: 16,
    textDecoration: 'NONE',
    fontName: {
      family: 'Helvetica',
      style: 'Light Condensed'
    },
    letterSpacing: {
      value: 10,
      unit: 'PIXEL'
    },
    lineHeight: {
      value: 5,
      unit: 'PIXEL'
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: 'UPPER'
  },
  {
    name: 'fonts/no description',
    type: 'TEXT',
    fontSize: 12,
    textDecoration: 'UNDERLINE',
    fontName: {
      family: 'Helvetica',
      style: 'Extra Bold Condensed Italic'
    },
    letterSpacing: {
      value: 120,
      unit: 'PERCENT'
    },
    lineHeight: {
      unit: 'AUTO'
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: 'ORIGINAL'
  }
]

export const textStyleObjects = [
  {
    name: 'fonts/basic',
    description: 'a font style',
    fontSize: 16,
    textDecoration: 'NONE',
    fontName: {
      family: 'Helvetica',
      style: 'Light Expanded'
    },
    letterSpacing: {
      value: 10,
      unit: 'PIXEL'
    },
    lineHeight: {
      value: 5,
      unit: 'PIXEL'
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: 'UPPER'
  },
  {
    name: 'fonts/no description',
    description: undefined,
    fontSize: 12,
    textDecoration: 'UNDERLINE',
    fontName: {
      family: 'Helvetica',
      style: 'Extra Bold Condensed Italic'
    },
    letterSpacing: {
      value: 120,
      unit: 'PERCENT'
    },
    lineHeight: {
      unit: 'AUTO'
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: 'ORIGINAL'
  }
]

export const extractFontsOutput = [
  {
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
        value: 'none',
        type: 'string'
      },
      fontFamily: {
        value: 'Helvetica',
        type: 'string'
      },
      fontWeight: {
        value: 300,
        type: 'number'
      },
      fontStretch: {
        value: 'expanded',
        type: 'string'
      },
      fontStyle: {
        value: 'normal',
        type: 'string'
      },
      _fontStyleOld: {
        value: 'Light Expanded',
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
        value: 'uppercase',
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
        value: 'underline',
        type: 'string'
      },
      fontFamily: {
        value: 'Helvetica',
        type: 'string'
      },
      fontWeight: {
        value: 800,
        type: 'number'
      },
      fontStretch: {
        value: 'condensed',
        type: 'string'
      },
      fontStyle: {
        value: 'italic',
        type: 'string'
      },
      _fontStyleOld: {
        value: 'Extra Bold Condensed Italic',
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
        value: 'none',
        type: 'string'
      }
    }
  }
]
