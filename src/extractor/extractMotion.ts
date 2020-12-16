import extractorInterface from '../../types/extractorInterface'
import { motionPropertyInterface } from '../../types/propertyObject'
import { customTokenNode } from '../../types/tokenNodeTypes'
import { UnitTypeMilliseconds, PropertyType } from '../../types/valueTypes'

const direction = (transition): {} | null => {
  if (Object.prototype.hasOwnProperty.call(direction, transition)) {
    return {
      direction: {
        value: transition.direction,
        type: 'string' as PropertyType
      }
    }
  }
}

const easing = (easing): {
  easing: {
    value: string,
    type: PropertyType
  },
  easingFunction?: {
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
} => {
  // return custom easing
  if (easing.type === 'CUSTOM_CUBIC_BEZIER') {
    return {
      easing: {
        value: 'cubic_bezier',
        type: 'string' as PropertyType
      },
      easingFunction: {
        x1: {
          value: easing.easingFunctionCubicBezier.x1,
          type: 'number' as PropertyType
        },
        x2: {
          value: easing.easingFunctionCubicBezier.x2,
          type: 'number' as PropertyType
        },
        y1: {
          value: easing.easingFunctionCubicBezier.y1,
          type: 'number' as PropertyType
        },
        y2: {
          value: easing.easingFunctionCubicBezier.y2,
          type: 'number' as PropertyType
        }
      }
    }
  }
  // return predefine easing
  return {
    easing: {
      value: easing.type,
      type: 'string' as PropertyType
    }
  }
}

const extractMotion: extractorInterface = (tokenNodes: customTokenNode[]): motionPropertyInterface[] => {
  const nodeName = 'motion'
  // return as object
  return tokenNodes
    // only get motion nodes
    .filter(node => node.name.substr(0, nodeName.length) === nodeName)
    // filter to only include items which have a transition property
    .filter(node => {
      if (node.reactions.length > 0 && node.reactions[0].action.transition !== null) {
        return true
      }
      return false
    })
    // retrieve values
    .map(node => ({
      name: node.name,
      // @ts-ignore
      description: node.description || null,
      category: 'motion',
      values: {
        type: {
          value: node.reactions[0].action.transition.type,
          type: 'string' as PropertyType
        },
        duration: {
          value: Math.trunc(node.reactions[0].action.transition.duration * 1000),
          unit: 'ms' as UnitTypeMilliseconds,
          type: 'number' as PropertyType
        },
        ...easing(node.reactions[0].action.transition.easing),
        // add direction if applicable
        ...direction(node.reactions[0].action.transition)
      }
    }))
}

export default extractMotion
