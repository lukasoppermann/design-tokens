export type propertyObject = {
  name: string,
  description?: string | null,
  values: {
    [key: string]: any
  }
}

export type convertedPropertyObject = {
  name: string,
  [key: string]: any
}

export type textDecorationType = "none" | "underline" | "line-through"
export type letterSpacingUnitType = "pixels" | "percent"
export type lineHeightUnitType = "pixels" | "percent" | "auto"
export type textCaseType = "none" | "uppercase" | "lowercase" | "capitalize"

export type fontPropertyInterface = propertyObject & {
  values: {
    fontSize: {
      value: number,
      unit: "pixels"
    },
    textDecoration: {
      value: textDecorationType
    },
    fontFamily: {
      value: string
    },
    fontStyle: {
      value: string
    },
    letterSpacing: {
      value: number
      unit: letterSpacingUnitType
    },
    lineHeight: {
      value: number | "normal"
      unit: "pixels" | "percent" | "auto"
    },
    paragraphIndent: {
      value: number,
      unit: "pixels"
    },
    paragraphSpacing: {
      value: number,
      unit: "pixels"
    },
    textCase: {
      value: textCaseType
    }
  }
}

export type sizePropertyInterface = propertyObject & {
  values: {
    width: {
      value: number,
      unit: "pixels"
    },
    height: {
      value: number,
      unit: "pixels"
    }
  }
}

export type strokeAlignType = "center" | "inside" | "outside"
export type strokeCapType = "none" | "round" | "square" | "arrow_lines" | "arrow_equilateral" | "mixed"

export type borderPropertyInterface = propertyObject & {
  values: {
    strokeAlign: {
      value: strokeAlignType
    },
    strokeCap: {
      value: strokeCapType
    },
    strokeJoin: {
      value: "miter" | "bevel" | "round"
    },
    strokeMiterLimit: {
      value: number
    },
    strokeStyleId: {
      value: string
    },
    strokeWeight: {
      value: number,
      unit: "pixels"
    },
    strokes: any
  }
}

export type radiusPropertyInterface = propertyObject & {
  values: {
    radius: {
      value: number | 'mixed',
      unit: string
    },
    radiusType: {
      value: 'single' | 'mixed'
    },
    radii: {
      topLeft: {
        value: number
        unit: string
      },
      topRight: {
        value: number
        unit: string
      },
      bottomRight: {
        value: number
        unit: string
      },
      bottomLeft: {
        value: number
        unit: string
      }
    },
    smoothing: {
      value: number
      comment: string
    }
  }
}

export type gridPatternType = 'rows' | 'columns' | 'grid'
export type gridAlignmentType = 'stretch' | 'center' | 'min' | 'max'

export type gridPropertyInterface = propertyObject & {
  values: {
    pattern: {
      value: gridPatternType
    },
    sectionSize?: {
      value: number,
      unit: string
    },
    gutterSize?: {
      value: number,
      unit: string
    },
    alignment?: {
      value: gridAlignmentType
    },
    count?: {
      value: number
    },
    offset?: {
      value: number,
      unit: string
    }
  }[]
}