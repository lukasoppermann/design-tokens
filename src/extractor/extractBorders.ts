import extractorInterface from '../../types/extractorInterface'
import { borderPropertyInterface, strokeAlignType, strokeCapType } from '../../types/propertyObject'
import { customTokenNodes } from '../../types/tokenNodeTypes'
import convertPaint from '../utilities/convertPaintToRgba'

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
        value: strokeAligns[node.strokeAlign] as strokeAlignType
      },
      strokeCap: {
        value: ((typeof node.strokeCap === 'string') ? node.strokeCap.toLowerCase : 'mixed') as strokeCapType
      },
      strokeJoin: {
        value: strokeJoins[node.strokeJoin]
      },
      strokeMiterLimit: {
        value: node.strokeMiterLimit
      },
      // strokeStyleId: {
      //   value: node.strokeStyleId
      // },
      strokeWeight: {
        value: node.strokeWeight,
        unit: 'pixels'
      },
      stroke: {
        value: convertPaint((node.strokes[0]))
      } 
    }
  }))
}

export default extractBorders