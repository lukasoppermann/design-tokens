import extractorInterface from '@typings/extractorInterface'
import { motionPropertyInterface, easingPropertyInterface, easingCurveType } from '@typings/propertyObject'
import { customTokenNode, nodeWithNodeTransition } from '@typings/tokenNodeTypes'
import { UnitTypeSeconds, PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import { filterByPrefix } from './extractUtilities'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'

const direction = (transition: Transition): {} | null => {
  if (Object.prototype.hasOwnProperty.call(transition, 'direction')) {
    return {
      direction: {
        value: (<DirectionalTransition>transition).direction.toLowerCase(),
        type: 'string' as PropertyType
      }
    }
  }
}

const easings = {
  CUSTOM_CUBIC_BEZIER: {
    type: 'custom-cubicBezier',
    curveType: 'cubicBezier',
    easing: undefined
  },
  CUSTOM_SPRING: {
    type: 'custom-spring',
    curveType: 'spring',
    easing: undefined
  },
  LINEAR: {
    type: 'linear',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1
    }
  },
  EASE_IN: {
    type: 'ease-in',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 1,
      y2: 1
    }
  },
  EASE_OUT: {
    type: 'ease-out',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1
    }
  },
  EASE_IN_AND_OUT: {
    type: 'ease-in-out',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1
    }
  },
  EASE_IN_BACK: {
    type: 'ease-in-back',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0.30000001192092896,
      y1: -0.05000000074505806,
      x2: 0.699999988079071,
      y2: -0.5
    }
  },
  EASE_OUT_BACK: {
    type: 'ease-out-back',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0.44999998807907104,
      y1: 1.4500000476837158,
      x2: 0.800000011920929,
      y2: 1
    }
  },
  EASE_IN_AND_OUT_BACK: {
    type: 'ease-in-out-back',
    curveType: 'cubicBezier' as easingCurveType,
    easing: {
      x1: 0.699999988079071,
      y1: -0.4000000059604645,
      x2: 0.4000000059604645,
      y2: 1.399999976158142
    }
  },
  BOUNCY: {
    type: 'bouncy',
    curveType: 'spring' as easingCurveType,
    easing: {
      mass: 1,
      stiffness: 600,
      damping: 15
    }
  },
  GENTLE: {
    type: 'gentle',
    curveType: 'spring',
    easing: {
      mass: 1,
      stiffness: 100,
      damping: 15
    }
  },
  QUICK: {
    type: 'quick',
    curveType: 'spring',
    easing: {
      mass: 1,
      stiffness: 300,
      damping: 20
    }
  },
  SLOW: {
    type: 'slow',
    curveType: 'spring',
    easing: {
      mass: 1,
      stiffness: 80,
      damping: 20
    }
  }
}

const formatEasingFunction = easingObject => {
  // spring curve
  if (easingObject.curveType === 'spring') {
    return {
      mass: {
        value: easingObject.easing.mass,
        type: 'number' as PropertyType
      },
      stiffness: {
        value: easingObject.easing.stiffness,
        type: 'number' as PropertyType
      },
      damping: {
        value: easingObject.easing.damping,
        type: 'number' as PropertyType
      }
    }
  }
  // spring bezier
  if (easingObject.curveType === 'cubicBezier') {
    return {
      x1: {
        // @ts-ignore
        value: easingObject.easing.x1,
        type: 'number' as PropertyType
      },
      x2: {
        // @ts-ignore
        value: easingObject.easing.x2,
        type: 'number' as PropertyType
      },
      y1: {
        // @ts-ignore
        value: easingObject.easing.y1,
        type: 'number' as PropertyType
      },
      y2: {
        // @ts-ignore
        value: easingObject.easing.y2,
        type: 'number' as PropertyType
      }
    }
  }
}

const easing = (easing: Easing): easingPropertyInterface => {
  // abort if invalid easing type
  if (!('type' in easing) || easings[easing.type] === undefined) {
    return undefined
  }
  // return custom easing
  if (easing.type === 'CUSTOM_CUBIC_BEZIER') {
    // @ts-ignore
    easings.CUSTOM_CUBIC_BEZIER.easing = {
      x1: easing.easingFunctionCubicBezier.x1,
      y1: easing.easingFunctionCubicBezier.y1,
      x2: easing.easingFunctionCubicBezier.x2,
      y2: easing.easingFunctionCubicBezier.y2
    }
  }
  // TODO: remove when figma typings are updated
  // @ts-ignore
  if (easing.type === 'CUSTOM_SPRING') {
    // @ts-ignore
    easings.CUSTOM_SPRING.easing = {
      // @ts-ignore
      mass: easing.easingFunctionSpring.mass,
      // @ts-ignore
      stiffness: easing.easingFunctionSpring.stiffness,
      // @ts-ignore
      damping: easing.easingFunctionSpring.damping
    }
  }
  return {
    easingType: {
      value: easings[easing.type].type,
      type: 'string' as PropertyType
    },
    easingCurveType: {
      value: easings[easing.type].curveType as easingCurveType,
      type: 'string' as PropertyType
    },
    easingFunction: formatEasingFunction(easings[easing.type])
  }
}
const filterValidMotionTokens = (node: customTokenNode) => {
  const validEasingTypes = Object.keys(easings)
  // @ts-ignore
  if (node.reactions.length > 0 && node.reactions[0].action?.type === 'NODE' && node.reactions[0].action.transition !== null && validEasingTypes.includes(node.reactions[0].action.transition.easing.type)) {
    return true
  }
  return false
}

const extractMotion: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): motionPropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray))
    // filter to only include items which have a transition property
    .filter(filterValidMotionTokens)
    // retrieve values
    .map((node: nodeWithNodeTransition) => ({
      name: node.name,
      category: 'motion' as tokenCategoryType,
      exportKey: tokenTypes.motion.key as tokenExportKeyType,
      description: node.description || null,
      values: {
        transitionType: {
          value: node.reactions[0].action.transition.type.toLocaleLowerCase(),
          type: 'string' as PropertyType
        },
        duration: {
          value: Math.round((node.reactions[0].action.transition.duration + Number.EPSILON) * 1000) / 1000,
          unit: 's' as UnitTypeSeconds,
          type: 'number' as PropertyType
        },
        ...easing(node.reactions[0].action.transition.easing),
        // add direction if applicable
        ...direction(node.reactions[0].action.transition)
      },
      extensions: {
        [config.key.extensionPluginData]: {
          exportKey: tokenTypes.motion.key as tokenExportKeyType
        }
      }
    }))
}

export default extractMotion

export const __testing = {
  easing: easing
}
