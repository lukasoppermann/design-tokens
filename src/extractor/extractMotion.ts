import extractorInterface from '../../types/extractorInterface'
import { sizePropertyInterface } from '../../types/propertyObject'
import { customTokenNode } from '../../types/tokenNodeTypes'
import { UnitTypePixel, UnitTypeMilliseconds, PropertyType } from '../../types/valueTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractMotion: extractorInterface = (tokenNodes: customTokenNode[]) => {
  const nodeName = 'motion'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
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
      easing: {
        value: node.reactions[0].action.transition.easing.type,
        type: 'string' as PropertyType
      }
      // direction: {
      //   value: node.reactions[0].action.transition.direction ,
      //   type: 'string' as PropertyType
      // }
    }
  }))
}

export default extractMotion
