import { propertyObject } from '@typings/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { groupByKeyAndName } from '@utils/groupByName'

const tokenTransformer = {
  originalFormat: originalFormatTransformer
}

export const prepareExport = (tokens: string, settings: Settings) => {
  const format = 'originalFormat'
  // parse json string
  const tokenArray: propertyObject[] = JSON.parse(tokens)
  // filter by user setting for export keys
  const tokensFiltered: propertyObject[] = tokenArray.filter(({ exportKey }) => settings.exports[exportKey])
  // converted values
  const tokensConverted = tokensFiltered.map(token => tokenTransformer[format](token))
  // group items by their names
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, settings)
  // return tokens
  return tokensGroupedByName
}
