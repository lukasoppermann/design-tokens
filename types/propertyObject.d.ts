export type propertyObject = {
  name: string,
  description?: string,
  category?: string,
  values?: {
    [key: string]: any
  }
}

export type propertyType = "number" | "color" | "string"
export type numericUnits = "degree" | "pixel" | "percent"

export type numericPropertyType = {
  value: number,
  unit?: numericUnits,
  type: propertyType
}

export type colorRgbaType = {
  r: number,
  g: number,
  b: number,
  a: number
}
export type textDecorationType = "none" | "underline" | "line-through"
export type lineHeightUnitType = "pixel" | "percent" | "auto"
export type textCaseType = "none" | "uppercase" | "lowercase" | "capitalize"

export type fontPropertyInterface = propertyObject & {
  values: {
    fontSize: numericPropertyType,
    textDecoration: {
      value: textDecorationType
    },
    fontFamily: {
      value: string
    },
    fontStyle: {
      value: string
    },
    letterSpacing: numericPropertyType,
    lineHeight: {
      value: number | "normal"
      unit: "pixel" | "percent" | "auto"
    },
    paragraphIndent: numericPropertyType,
    paragraphSpacing: numericPropertyType,
    textCase: {
      value: textCaseType
    }
  }
}

export type fillValuesType = {
  fill: {
    value: colorRgbaType,
    type: propertyType
  }
}

export type gradientTypeType = "linear" | "radial" | "angular" | "diamond"
export type gradientStopType = {
  color: {
    value: colorRgbaType,
    type: propertyType
  },
  position: {
    value: number,
    type: propertyType
  }
}

export type gradientValuesType = {
  gradientType: {
    value: gradientTypeType,
    type: propertyType
  },
  stops: gradientStopType[],
  opacity: {
    value: number,
    type: propertyType
  }
}

export type colorPropertyInterface = propertyObject & {
  values: {
    fill: {
      value: colorRgbaType,
      type: propertyType
    }
  }
}

export type sizePropertyInterface = propertyObject & {
  values: {
    width: {
      value: number,
      unit: "pixel",
      type: propertyType
    },
    height: {
      value: number,
      unit: "pixel",
      type: propertyType
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
    strokeMiterAngle: {
      value: number
    },
    dashPattern: {
      value: string
    }
    // strokeStyleId: {
    //   value: string
    // },
    strokeWeight: {
      value: number,
      unit: "pixel"
    },
    stroke: {
      value: colorRgbaType,
      type: propertyType
    }
  }
}

export type radiusPropertyInterface = propertyObject & {
  values: {
    radius: {
      value: number | 'mixed',
      unit: string
    },
    radiusType: {
      value: 'single' | 'mixed',
      type: propertyType
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
export type effectType = 'dropShadow' | 'innerShadow' | 'layerBlur' | 'backgroundBlur'
export type effectPropertyInterface = propertyObject & {
  values: {
    type: {
      value: effectType
    },
    radius: {
      value: number,
      unit: string
    },
    color?: {
      value: colorRgbaType,
      type: propertyType
    },
    offset?: {
      x: {
        value: number,
        unit: string
      },
      y: {
        value: number,
        unit: string
      }
    },
    spread?: {
      value: number,
      unit: string
    }
  }[]
}