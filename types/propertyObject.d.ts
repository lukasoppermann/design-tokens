import { ColorRgba, GradientType, GridAlignment, GridPattern, NumericUnitTypes, StrokeAlign, StrokeJoin, StrokeCap, TextCase, TextDecoration, UnitTypePixel } from './valueTypes'

export type propertyObject = {
  name: string,
  description?: string,
  category?: string,
  values?: {
    [key: string]: any
  }
}

export type propertyType = "number" | "color" | "string"

export type numericPropertyType = {
  value: number,
  unit?: NumericUnitTypes,
  type: propertyType
}

export type lineHeightUnitType = "pixel" | "percent" | "auto"

export type fontPropertyInterface = propertyObject & {
  values: {
    fontSize: numericPropertyType,
    textDecoration: {
      value: TextDecoration
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
      value: TextCase
    }
  }
}

export type fillValuesType = {
  fill: {
    value: ColorRgba,
    type: propertyType
  }
}

export type gradientStopType = {
  color: {
    value: ColorRgba,
    type: propertyType
  },
  position: {
    value: number,
    type: propertyType
  }
}

export type gradientValuesType = {
  gradientType: {
    value: GradientType,
    type: propertyType
  },
  stops: gradientStopType[],
  opacity: {
    value: number,
    type: propertyType
  }
}

export type colorPropertyInterface = propertyObject & {
  values: fillValuesType | gradientValuesType
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

export type borderPropertyInterface = propertyObject & {
  values: {
    strokeAlign: {
      value: StrokeAlign
    },
    strokeCap: {
      value: StrokeCap
    },
    strokeJoin: {
      value: StrokeJoin
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
      unit: UnitTypePixel
    },
    stroke: {
      value: ColorRgba,
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

export type gridPropertyInterface = propertyObject & {
  values: {
    pattern: {
      value: GridPattern
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
      value: GridAlignment
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
      value: ColorRgba,
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