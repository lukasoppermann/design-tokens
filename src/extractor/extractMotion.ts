import extractorInterface from '@typings/extractorInterface'
import { motionPropertyInterface, easingFunctionPropertyInterface } from '@typings/propertyObject'
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
  },
  LINEAR: {
    type: 'linear',
    easingFunctionCubicBezier: {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1
    }
  },
  EASE_IN: {
    type: 'ease-in',
    easingFunctionCubicBezier: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 1,
      y2: 1
    }
  },
  EASE_OUT: {
    type: 'ease-out',
    easingFunctionCubicBezier: {
      x1: 0,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1
    }
  },
  EASE_IN_AND_OUT: {
    type: 'ease-in-out',
    easingFunctionCubicBezier: {
      x1: 0.41999998688697815,
      y1: 0,
      x2: 0.5799999833106995,
      y2: 1
    }
  },
  EASE_IN_BACK: {
    type: 'ease-in-back',
    easingFunctionCubicBezier: {
      x1: 0.30000001192092896,
      y1: -0.05000000074505806,
      x2: 0.699999988079071,
      y2: -0.5
    }
  },
  EASE_OUT_BACK: {
    type: 'ease-out-back',
    easingFunctionCubicBezier: {
      x1: 0.44999998807907104,
      y1: 1.4500000476837158,
      x2: 0.800000011920929,
      y2: 1
    }
  },
  EASE_IN_AND_OUT_BACK: {
    type: 'ease-in-out-back',
    easingFunctionCubicBezier: {
      x1: 0.699999988079071,
      y1: -0.4000000059604645,
      x2: 0.4000000059604645,
      y2: 1.399999976158142
    }
  }
}

const easing = (easing: Easing): {
  easing: {
    value: string,
    type: PropertyType
  },
  easingFunction: easingFunctionPropertyInterface
} => {
  // abort if invalif easing type
  if (!('type' in easing) || easings[easing.type] === undefined) {
    return undefined
  }
  // return custom easing
  // @ts-ignore
  if (easing.type === 'CUSTOM_CUBIC_BEZIER') {
    easings.CUSTOM_CUBIC_BEZIER = {
      type: 'cubic-bezier',
      easingFunctionCubicBezier: {
        x1: easing.easingFunctionCubicBezier.x1,
        y1: easing.easingFunctionCubicBezier.y1,
        x2: easing.easingFunctionCubicBezier.x2,
        y2: easing.easingFunctionCubicBezier.y2
      }
    }
  }

  return {
    easing: {
      // @ts-ignore
      value: easings[easing.type].type,
      type: 'string' as PropertyType
    },
    easingFunction: {
      x1: {
        // @ts-ignore
        value: easings[easing.type].easingFunctionCubicBezier.x1,
        type: 'number' as PropertyType
      },
      x2: {
        // @ts-ignore
        value: easings[easing.type].easingFunctionCubicBezier.x2,
        type: 'number' as PropertyType
      },
      y1: {
        // @ts-ignore
        value: easings[easing.type].easingFunctionCubicBezier.y1,
        type: 'number' as PropertyType
      },
      y2: {
        // @ts-ignore
        value: easings[easing.type].easingFunctionCubicBezier.y2,
        type: 'number' as PropertyType
      }
    }
  }
}

const extractMotion: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): motionPropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray))
    // filter to only include items which have a transition property
    .filter(node => {
      if (node.reactions.length > 0 && node.reactions[0].action?.type === 'NODE' && node.reactions[0].action.transition !== null) {
        return true
      }
      return false
    })
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
