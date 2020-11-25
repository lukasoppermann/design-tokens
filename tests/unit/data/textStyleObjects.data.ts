export const textStyles = [
  {
    name: 'fonts/basic',
    description: 'a font style',
    type: "TEXT",
    fontSize: 16,
    textDecoration: "NONE",
    fontName: {
      family: "Helvetica",
      style: "slanted"
    },
    letterSpacing: {
      value: 10,
      unit: "PIXEL"
    },
    lineHeight: {
      value: 5,
      unit: "PIXEL"
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: "UPPER"
  },
  {
    name: 'fonts/no description',
    type: "TEXT",
    fontSize: 12,
    textDecoration: "UNDERLINE",
    fontName: {
      family: "Helvetica",
      style: "slanted"
    },
    letterSpacing: {
      value: 120,
      unit: "PERCENT"
    },
    lineHeight: {
      unit: "AUTO"
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: "ORIGINAL"
  }
]

export const textStyleObjects = [
  {
    name: 'fonts/basic',
    description: 'a font style',
    fontSize: 16,
    textDecoration: "NONE",
    fontName: {
      family: "Helvetica",
      style: "slanted"
    },
    letterSpacing: {
      value: 10,
      unit: "PIXEL"
    },
    lineHeight: {
      value: 5,
      unit: "PIXEL"
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: "UPPER"
  },
  {
    name: 'fonts/no description',
    description: undefined,
    fontSize: 12,
    textDecoration: "UNDERLINE",
    fontName: {
      family: "Helvetica",
      style: "slanted"
    },
    letterSpacing: {
      value: 120,
      unit: "PERCENT"
    },
    lineHeight: {
      unit: "AUTO"
    },
    paragraphIndent: 3,
    paragraphSpacing: 2,
    textCase: "ORIGINAL"
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
]