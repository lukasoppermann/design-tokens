import { ColorRgba, GradientType, GridAlignment, GridPattern, NumericUnitTypes, StrokeAlign, StrokeJoin, StrokeCap, TextCase, TextDecoration, UnitTypePixel, EffectType, PropertyType, UnitTypeSeconds } from './valueTypes'

export type propertyObject = {
  name: string,
  description?: string,
  category?: string,
  values?: {
    [key: string]: any
  }
}

export type numericPropertyType = {
  value: number,
  unit?: NumericUnitTypes,
  type: PropertyType
}

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
      unit: string // "pixel" | "percent" | "auto"
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
    type: PropertyType
  }
}

export type gradientStopType = {
  color: {
    value: ColorRgba,
    type: PropertyType
  },
  position: {
    value: number,
    type: PropertyType
  }
}

export type gradientValuesType = {
  gradientType: {
    value: GradientType,
    type: PropertyType
  },
  stops: gradientStopType[],
  opacity: {
    value: number,
    type: PropertyType
  }
}

export type colorPropertyInterface = propertyObject & {
  values: (fillValuesType | gradientValuesType)[]
}

export type sizePropertyInterface = propertyObject & {
  values: {
    width: {
      value: number,
      unit: "pixel",
      type: PropertyType
    },
    height: {
      value: number,
      unit: "pixel",
      type: PropertyType
    }
  }
}

export type easingFunctionPropertyInterface = {
  x1: {
    value: number,
    type: PropertyType
  },
  x2: {
    value: number,
    type: PropertyType
  },
  y1: {
    value: number,
    type: PropertyType
  },
  y2: {
    value: number,
    type: PropertyType
  }
}

export type motionPropertyInterface = propertyObject & {
  values: {
    type: {
      value: string,
      type: PropertyType
    },
    duration: {
      value: number,
      unit: UnitTypeSeconds,
      type: PropertyType
    },
    easing: {
      value: string,
      type: PropertyType
    },
    easingFunction: easingFunctionPropertyInterface,
    direction?: {
      value: string,
      type: PropertyType
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
    strokeMiterLimit: {
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
      type: PropertyType
    }
  }
}

export type radiusPropertyInterface = propertyObject & {
  values: {
    radius?: {
      value: number,
      unit: UnitTypePixel,
      type: PropertyType
    },
    radiusType: {
      value: 'single' | 'mixed',
      type: PropertyType
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

export type effectPropertyInterface = propertyObject & {
  values: {
    type: {
      value: EffectType
    },
    radius: {
      value: number,
      unit: string
    },
    color?: {
      value: ColorRgba,
      type: PropertyType
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