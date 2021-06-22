import { propertyObject } from '../../types/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as styleDictionaryTransformer } from '../tokenTransformer/styleDictionaryTransformer'
import { groupByKeyAndName } from './groupByName'

const tokenTransformer = {
  styleDictionary: styleDictionaryTransformer
}

export const prepareExport = (tokens: string, settings: Settings) => {
  const format = 'styleDictionary'
  // parse json string
  const tokenArray: propertyObject[] = JSON.parse(tokens)
  // filter by user setting for export keys
  const tokensFiltered: propertyObject[] = tokenArray.filter(({ exportKey }) => settings.exports[exportKey])
  // converted values
  const tokensConverted = tokensFiltered.map(token => tokenTransformer[format](token))
  // group items by their names
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, settings.keyInName, settings.nameConversion)
  // return tokens
  return tokensGroupedByName
}
