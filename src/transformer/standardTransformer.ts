import { rgbaObjectToHex8 } from '../utilities/convertColor'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenInterface, StandardTokenTypes, StandardTokenValuesInterface } from '@typings/standardToken'
import { UnitTypeDegree, UnitTypePercent, UnitTypePixel } from '@typings/valueTypes'

const getType = (type: string, unit?: string): StandardTokenTypes => {
  if (type === 'number' && unit && unit === 'pixel') {
    return 'dimension'
  }
  if (type === 'number') {
    return 'number'
  }
  return 'string'
}

const widthToDimensionTransformer = ({ category, exportKey, values }): StandardTokenValuesInterface => ({
  value: values.width.value,
  type: 'dimension' as StandardTokenTypes,
  data: {
    exportKey: exportKey,
    category: category,
    unit: 'pixel' as UnitTypePixel
  }
})

const radiusValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => {
  const radiusValues = {}
  if (values.radiusType.value === 'mixed') {
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(corner => {
      radiusValues[`radius${corner[0].toUpperCase() + corner.substring(1)}`] = {
        value: values.radii[corner].value,
        type: 'dimension' as StandardTokenTypes,
        data: {
          exportKey: exportKey,
          category: category,
          unit: 'pixel' as UnitTypePixel
        }
      }
    })
  }
  else {
    // @ts-ignore
    radiusValues.radius = {
      value: values.radius.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    }
  }
  // @ts-ignore
  radiusValues.smoothing = {
    value: values.smoothing.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  }
  // return values
  return radiusValues
}

const gridValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => {
  return Object.fromEntries(
    Object.entries(values[0]).map(([name, item]) => {
      return [name, {
        // @ts-ignore
        value: item.value,
        // @ts-ignore
        type: getType(item.type, item?.unit),
        data: {
          exportKey: exportKey,
          category: category,
          // @ts-ignore
          ...(item.unit === 'pixel' ? { unit: 'pixel' as UnitTypePixel } : {})
        }
      }]
    }
    )
  )
}

const defaultValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => ({
  ...Object.fromEntries(
    Object.entries(values).map(
      ([name, item]: [name: string, item: any]) => {
        return [[name], {
          value: item.value,
          type: getType(item.type, item?.unit),
          data: {
            exportKey: exportKey,
            category: category,
            // @ts-ignore
            ...(item.unit === 'pixel' ? { unit: 'pixel' as UnitTypePixel } : {})
          }
        }]
      }
    )
  )
})

const fontValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => ({
  fontSize: {
    value: values.fontSize.value,
    type: 'dimension' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'pixel' as UnitTypePixel
    }
  },
  textDecoration: {
    value: values.textDecoration.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  fontFamily: {
    value: values.fontFamily.value,
    type: 'font' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  fontWeight: {
    value: values.fontWeight.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  fontStyle: {
    value: values.fontStyle.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  fontStretch: {
    value: values.fontStretch.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  letterSpacing: {
    value: values.letterSpacing.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'percent' as UnitTypePercent
    }
  },
  lineHeight: {
    value: values.lineHeight.value,
    type: values.lineHeight.type as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      ...(values.lineHeight.unit !== 'auto' ? { unit: values.lineHeight.unit } : {})
    }
  },
  paragraphIndent: {
    value: values.paragraphIndent.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'pixel' as UnitTypePixel
    }
  },
  paragraphSpacing: {
    value: values.paragraphSpacing.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'pixel' as UnitTypePixel
    }
  },
  textCase: {
    value: values.textCase.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  }
})

const colorValueTransformer = ({ category, exportKey, values }): StandardTokenValuesInterface => ({
  value: rgbaObjectToHex8(values[0].fill.value),
  type: 'color' as StandardTokenTypes,
  data: {
    exportKey: exportKey,
    category: category
  }
})

const borderValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => ({
  strokeAlign: {
    value: values.strokeAlign.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  dashPattern: {
    value: values.dashPattern.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  strokeCap: {
    value: values.strokeCap.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  strokeJoin: {
    value: values.strokeJoin.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  strokeMiterLimit: {
    value: values.strokeMiterLimit.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'degree' as UnitTypeDegree
    }
  },
  strokeWeight: {
    value: values.strokeWeight.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 'pixel' as UnitTypePixel
    }
  },
  stroke: {
    value: rgbaObjectToHex8(values.stroke.value),
    type: 'color' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  }
})

const effectValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => ({
  effects: values.map(effect => ({
    effectType: {
      value: effect.effectType.value,
      type: 'string' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    },
    radius: {
      value: effect.radius.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    },
    color: {
      value: rgbaObjectToHex8(effect.color.value),
      type: 'color' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    },
    offsetX: {
      value: effect.offset.x.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    },
    offsetY: {
      value: effect.offset.y.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    },
    spread: {
      value: effect.spread.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    }
  }))
})

const motionValueTransformer = ({ category, exportKey, values }): {[key: string]: (StandardTokenValuesInterface | {[key: string]: StandardTokenValuesInterface}) } => ({
  transitionType: {
    value: values.transitionType.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  duration: {
    value: values.duration.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category,
      unit: 's'
    }
  },
  direction: {
    value: values.direction.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  easing: {
    value: values.easing.value,
    type: 'string' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  },
  easingFunction: {
    x1: {
      value: values.easingFunction.x1.value,
      type: 'number' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    },
    x2: {
      value: values.easingFunction.x2.value,
      type: 'number' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    },
    y1: {
      value: values.easingFunction.y1.value,
      type: 'number' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    },
    y2: {
      value: values.easingFunction.y2.value,
      type: 'number' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category
      }
    }
  }
})

const valueTransformer = {
  size: widthToDimensionTransformer,
  color: colorValueTransformer,
  // gradient: defaultValueTransformer,
  font: fontValueTransformer,
  effect: effectValueTransformer,
  grid: gridValueTransformer,
  border: borderValueTransformer,
  breakpoint: widthToDimensionTransformer,
  radius: radiusValueTransformer,
  spacing: defaultValueTransformer,
  motion: motionValueTransformer
}

const transformTokens = (token: internalTokenInterface): StandardTokenValuesInterface => valueTransformer[token.category](token)

const transformer = (token: internalTokenInterface): StandardTokenInterface => {
  return {
    [token.name]: {
      description: token.description,
      ...transformTokens(token)
    }
  }
}

export { transformer }
