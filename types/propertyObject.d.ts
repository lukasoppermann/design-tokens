import { extractedGridValues } from './extractedData'
import { StandardTokenExtensionsInterface } from './standardToken'
import { tokenCategoryType } from './tokenCategory'
import { tokenExportKeyType } from './tokenExportKey'
import { ColorRgba, GradientType, GridAlignment, GridPattern, NumericUnitTypes, StrokeAlign, StrokeJoin, StrokeCap, TextCase, TextDecoration, UnitTypePixel, EffectType, PropertyType, UnitTypeSeconds } from './valueTypes'

export type propertyObject = {
  name: string,
  id?: string,
  description?: string,
  category: tokenCategoryType,
  exportKey: tokenExportKeyType,
  values: {
    [key: string]: any
  } | extractedGridValues
}

export type internalTokenInterface = propertyObject & {
  extensions: StandardTokenExtensionsInterface
}
export type tokenCategoryTypes = 'font' | 'border' | 'size' | 'grid' | 'effect' | 'radius' | 'radius'| 'breakpoint'

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
      value: string,
      type: PropertyType
    },
    fontWeight: {
      value: number,
      type: PropertyType
    },
    fontStyle: {
      value: string,
      type: PropertyType
    },
    fontStretch: {
      value: string,
      type: PropertyType
    },
    _fontStyleOld: {
      value: string,
      type: PropertyType
    },
    letterSpacing: numericPropertyType,
    lineHeight: {
      value: number | 'normal'
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
  rotation: {
    value: number,
    type: PropertyType
    unit: 'degree'
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

export type breakpointPropertyInterface = propertyObject & {
  values: {
    width: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    }
  }
}

export type sizePropertyInterface = propertyObject & {
  values: {
    width: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    },
    height: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    }
  }
}

export type spacingPropertyInterface = propertyObject & {
  values: {
    top: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    },
    right: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    },
    bottom: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    },
    left: {
      value: number,
      unit: 'pixel',
      type: PropertyType
    }
  }
}
export type easingFunctionCubicBezierPropertyInterface = {
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

export type easingFunctionSpringPropertyInterface = {
  mass: {
    value: number,
    type: PropertyType
  },
  stiffness: {
    value: number,
    type: PropertyType
  },
  damping: {
    value: number,
    type: PropertyType
  }
  // somehow does not get exported from figma
  //,
  // initialVelocity: {
  //   value: number,
  //   type: PropertyType
  // }
}

export type easingCurveType = 'cubicBezier' | 'spring'

export type easingPropertyInterface = {
  easingType: {
    value: string,
    type: PropertyType
  },
  easingCurveType: {
    value: easingCurveType,
    type: PropertyType
  },
  easingFunction: easingFunctionCubicBezierPropertyInterface | easingFunctionSpringPropertyInterface
}

export type motionPropertyInterface = propertyObject & {
  values: {
    transitionType: {
      value: string,
      type: PropertyType
    },
    duration: {
      value: number,
      unit: UnitTypeSeconds,
      type: PropertyType
    },
    easingType: {
      value: string,
      type: PropertyType
    },
    easingCurveType: {
      value: string,
      type: PropertyType
    },
    easingFunction: easingFunctionCubicBezierPropertyInterface | easingFunctionSpringPropertyInterface,
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
      value: number[]
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
    effectType: {
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

export type opacityPropertyInterface = propertyObject & {
  values: {
    opacity: {
      value: number,
      type: PropertyType
    }
  }
}
