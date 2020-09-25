import extractorInterface from '../../types/extractorInterface'
import { borderPropertyInterface, propertyType, strokeAlignType, strokeCapType } from '../../types/propertyObject'
import { customTokenNodes } from '../../types/tokenNodeTypes'
import { convertPaintToRgba } from '../utilities/convertColor'
import roundWithDecimals from '../utilities/roundWithDecimals'

const strokeJoins = {
  'MITER': 'miter',
  'BEVEL': 'bevel',
  'ROUND': 'round'
}

const strokeAligns = {
  'CENTER': 'center',
  'INSIDE': 'inside',
  'OUTSIDE': 'outside'
}

const extractBorders: extractorInterface = (tokenNodes: customTokenNodes[]): borderPropertyInterface[] => {
  const nodeName = 'borders'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    values: {
      strokeAlign: {
        value: strokeAligns[node.strokeAlign] as strokeAlignType,
        type: 'string' as propertyType
      },
      dashPattern: {
        value: node.dashPattern.toString(),
        type: 'string' as propertyType
      },
      strokeCap: {
        value: ((typeof node.strokeCap === 'string') ? node.strokeCap.toLowerCase() : 'mixed') as strokeCapType,
        type: 'string' as propertyType
      },
      strokeJoin: {
        value: strokeJoins[node.strokeJoin],
        type: 'string' as propertyType
      },
      strokeMiterAngle: {
        value: roundWithDecimals(node.strokeMiterLimit),
        unit: 'degree',
        type: 'number' as propertyType
      },
      // strokeStyleId: {
      //   value: node.strokeStyleId
      // },
      strokeWeight: {
        value: node.strokeWeight,
        unit: 'pixel',
        type: 'number' as propertyType
      },
      stroke: {
        value: convertPaintToRgba((node.strokes[0])),
        type: 'color' as propertyType
      } 
    }
  }))
}

export default extractBorders