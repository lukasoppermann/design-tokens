import extractorInterface from '../../types/extractorInterface'
import { motionPropertyInterface, easingFunctionPropertyInterface } from '../../types/propertyObject'
import { customTokenNode, nodeWithNodeTransition } from '../../types/tokenNodeTypes'
import { UnitTypeMilliseconds, PropertyType } from '../../types/valueTypes'

const direction = (transition): {} | null => {
  if (Object.prototype.hasOwnProperty.call(transition, 'direction')) {
    return {
      direction: {
        value: transition.direction.toLowerCase(),
        type: 'string' as PropertyType
      }
    }
  }
}

const easings = {
  LINEAR: {
    type: 'linear'
  },
  EASE_IN: {
    type: 'ease-in'
  },
  EASE_OUT: {
    type: 'ease-out'
  },
  EASE_IN_AND_OUT: {
    type: 'ease-in-out'
  },
  EASE_IN_BACK: {
    type: 'ease-in-back'
  },
  EASE_OUT_BACK: {
    type: 'ease-out-back'
  },
  EASE_IN_AND_OUT_BACK: {
    type: 'ease-in-out-back'
  }
}

const easing = (easing): {
  easing: {
    value: string,
    type: PropertyType
  },
  easingFunction?: easingFunctionPropertyInterface
} => {
  // return custom easing
  if (Object.prototype.hasOwnProperty.call(easing, 'easingFunctionCubicBezier')) {
    return {
      easing: {
        value: 'cubic-bezier',
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
      value: easings[easing.type].type,
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
      if (node.reactions.length > 0 && node.reactions[0].action.type === 'NODE' && node.reactions[0].action.transition !== null) {
        return true
      }
      return false
    })
    // retrieve values
    .map((node: nodeWithNodeTransition) => ({
      name: node.name,
      // @ts-ignore
      description: node.description || null,
      category: 'motion',
      values: {
        type: {
          value: node.reactions[0].action.transition.type.toLocaleLowerCase(),
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
